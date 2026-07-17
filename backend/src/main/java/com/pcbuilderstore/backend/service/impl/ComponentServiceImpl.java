package com.pcbuilderstore.backend.service.impl;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcbuilderstore.backend.dto.request.CreateComponentRequest;
import com.pcbuilderstore.backend.dto.request.ComponentSearchRequest;
import com.pcbuilderstore.backend.dto.request.UpdateComponentRequest;
import com.pcbuilderstore.backend.dto.request.ComponentSpecificationRequest;
import com.pcbuilderstore.backend.dto.response.ComponentResponse;
import com.pcbuilderstore.backend.dto.response.ComponentSummaryResponse;
import com.pcbuilderstore.backend.entity.Brand;
import com.pcbuilderstore.backend.entity.Category;
import com.pcbuilderstore.backend.entity.Component;
import com.pcbuilderstore.backend.entity.ComponentSpecification;
import com.pcbuilderstore.backend.entity.Inventory;
import com.pcbuilderstore.backend.enums.ComponentType;
import com.pcbuilderstore.backend.enums.SpecificationKey;
import com.pcbuilderstore.backend.exception.ResourceNotFoundException;
import com.pcbuilderstore.backend.mapper.ComponentMapper;
import com.pcbuilderstore.backend.repository.BrandRepository;
import com.pcbuilderstore.backend.repository.CategoryRepository;
import com.pcbuilderstore.backend.repository.ComponentRepository;
import com.pcbuilderstore.backend.repository.ComponentSpecificationRepository;
import com.pcbuilderstore.backend.repository.InventoryRepository;
import com.pcbuilderstore.backend.service.ComponentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ComponentServiceImpl implements ComponentService {

    private final ComponentRepository componentRepository;
    private final ComponentMapper componentMapper;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ComponentSpecificationRepository componentSpecificationRepository;
    private final InventoryRepository inventoryRepository;

    @Override
    public ComponentResponse createComponent(CreateComponentRequest request) {
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + request.getBrandId()));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        Component component = componentMapper.toEntity(request);
        component.setBrand(brand);
        component.setCategory(category);

        // Generate SKU
        String sku = "SKU-" + category.getName().substring(0, Math.min(3, category.getName().length())).toUpperCase()
                + "-" + brand.getName().substring(0, Math.min(3, brand.getName().length())).toUpperCase()
                + "-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        component.setSku(sku);

        // Set model
        component.setModel(request.getName());

        // Set warranty months
        component.setWarrantyMonths(36);

        // Set componentType
        ComponentType componentType;
        try {
            componentType = ComponentType.valueOf(category.getName().toUpperCase().replace(" ", "_"));
        } catch (Exception e) {
            componentType = ComponentType.CPU;
        }
        component.setComponentType(componentType);

        component.setActive(true);

        Component savedComponent = componentRepository.save(component);

        // Save specifications
        createSpecificationsForComponent(savedComponent, request.getSpecifications());

        // Save inventory
        Inventory inventory = Inventory.builder()
                .component(savedComponent)
                .availableQuantity(request.getStockQuantity() != null ? request.getStockQuantity() : 0)
                .reservedQuantity(0)
                .minimumStock(0)
                .maximumStock(1000)
                .build();
        inventoryRepository.save(inventory);

        // Associate inventory back to savedComponent for return mapping
        savedComponent.setInventory(inventory);

        return componentMapper.toResponse(savedComponent);
    }

    @Override
    @Transactional(readOnly = true)
    public ComponentResponse getComponentById(Long id) {
        Component component = componentRepository.findDetailedById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Component not found with id: " + id));
        return componentMapper.toResponse(component);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ComponentSummaryResponse> getAllComponents(
            ComponentSearchRequest request,
            Pageable pageable) {

        Specification<Component> spec = com.pcbuilderstore.backend.specification.ComponentSpecification.isActive();

        if (request != null) {
            if (request.getKeyword() != null && !request.getKeyword().isBlank()) {
                spec = spec.and(com.pcbuilderstore.backend.specification.ComponentSpecification.hasKeyword(request.getKeyword()));
            }
            if (request.getBrandId() != null) {
                spec = spec.and(com.pcbuilderstore.backend.specification.ComponentSpecification.hasBrand(request.getBrandId()));
            }
            if (request.getCategoryId() != null) {
                spec = spec.and(com.pcbuilderstore.backend.specification.ComponentSpecification.hasCategory(request.getCategoryId()));
            }
            if (request.getMinPrice() != null) {
                spec = spec.and(com.pcbuilderstore.backend.specification.ComponentSpecification.hasMinPrice(request.getMinPrice()));
            }
            if (request.getMaxPrice() != null) {
                spec = spec.and(com.pcbuilderstore.backend.specification.ComponentSpecification.hasMaxPrice(request.getMaxPrice()));
            }
        }

        return componentRepository.findAll(spec, pageable)
                .map(componentMapper::toSummaryResponse);
    }

    @Override
    public ComponentResponse updateComponent(Long id, UpdateComponentRequest request) {
        Component component = componentRepository.findDetailedById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Component not found with id: " + id));

        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + request.getBrandId()));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        component.setName(request.getName());
        component.setDescription(request.getDescription());
        component.setPrice(request.getPrice());
        component.setImageUrl(request.getImageUrl());
        component.setBrand(brand);
        component.setCategory(category);

        // Update component type
        ComponentType componentType;
        try {
            componentType = ComponentType.valueOf(category.getName().toUpperCase().replace(" ", "_"));
        } catch (Exception e) {
            componentType = ComponentType.CPU;
        }
        component.setComponentType(componentType);

        // Update inventory
        Inventory inventory = inventoryRepository.findByComponentId(id)
                .orElseGet(() -> {
                    Inventory inv = new Inventory();
                    inv.setComponent(component);
                    inv.setReservedQuantity(0);
                    inv.setMinimumStock(0);
                    inv.setMaximumStock(1000);
                    return inv;
                });
        inventory.setAvailableQuantity(request.getStockQuantity() != null ? request.getStockQuantity() : 0);
        inventoryRepository.save(inventory);
        component.setInventory(inventory);

        // Update specifications: clear old and save new
        List<ComponentSpecification> oldSpecs = componentSpecificationRepository.findByComponentId(id);
        componentSpecificationRepository.deleteAll(oldSpecs);

        component.getSpecifications().clear();
        createSpecificationsForComponent(component, request.getSpecifications());

        Component savedComponent = componentRepository.save(component);
        return componentMapper.toResponse(savedComponent);
    }

    private void createSpecificationsForComponent(
            Component component,
            List<ComponentSpecificationRequest> dtos) {

        if (dtos == null || dtos.isEmpty()) {
            return;
        }

        List<ComponentSpecification> specifications = new ArrayList<>();

        for (ComponentSpecificationRequest dto : dtos) {
            ComponentSpecification specification = new ComponentSpecification();
            specification.setComponent(component);

            try {
                specification.setSpecificationKey(
                        SpecificationKey.valueOf(dto.getKey().toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Skip if key doesn't match SpecificationKey enum
                continue;
            }

            specification.setValue(dto.getValue());
            specifications.add(specification);
        }

        componentSpecificationRepository.saveAll(specifications);
        component.setSpecifications(specifications);
    }
}