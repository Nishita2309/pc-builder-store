package com.pcbuilderstore.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcbuilderstore.backend.dto.request.CreateBrandRequest;
import com.pcbuilderstore.backend.dto.request.UpdateBrandRequest;
import com.pcbuilderstore.backend.dto.response.BrandResponse;
import com.pcbuilderstore.backend.entity.Brand;
import com.pcbuilderstore.backend.exception.DuplicateResourceException;
import com.pcbuilderstore.backend.exception.ResourceNotFoundException;
import com.pcbuilderstore.backend.mapper.BrandMapper;
import com.pcbuilderstore.backend.repository.BrandRepository;
import com.pcbuilderstore.backend.service.BrandService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;

    @Override
    public BrandResponse createBrand(CreateBrandRequest request) {

        if (brandRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException(
                    "Brand already exists: " + request.getName());
        }

        Brand brand = brandMapper.toEntity(request);

        Brand savedBrand = brandRepository.save(brand);

        return brandMapper.toResponse(savedBrand);
    }

    @Override
    @Transactional(readOnly = true)
    public BrandResponse getBrandById(Long id) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Brand not found with id: " + id));

        return brandMapper.toResponse(brand);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BrandResponse> getAllBrands() {

        return brandRepository.findAll()
                .stream()
                .map(brandMapper::toResponse)
                .toList();
    }

    @Override
    public BrandResponse updateBrand(Long id,
                                     UpdateBrandRequest request) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Brand not found with id: " + id));

        if (!brand.getName().equalsIgnoreCase(request.getName())
                && brandRepository.existsByName(request.getName())) {

            throw new DuplicateResourceException(
                    "Brand already exists: " + request.getName());
        }

        brand.setName(request.getName());
        brand.setDescription(request.getDescription());

        Brand updatedBrand = brandRepository.save(brand);

        return brandMapper.toResponse(updatedBrand);
    }

    @Override
    public void deleteBrand(Long id) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Brand not found with id: " + id));

        brandRepository.delete(brand);
    }
}