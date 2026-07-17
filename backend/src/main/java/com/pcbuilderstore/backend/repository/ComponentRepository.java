package com.pcbuilderstore.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcbuilderstore.backend.entity.Component;
import com.pcbuilderstore.backend.enums.ComponentType;


import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ComponentRepository extends JpaRepository<Component, Long>, JpaSpecificationExecutor<Component> {

    List<Component> findByComponentType(ComponentType componentType);

    List<Component> findByBrandId(Long brandId);

    List<Component> findByCategoryId(Long categoryId);

    boolean existsBySku(String sku);
    
    @EntityGraph(attributePaths = {
            "brand",
            "category",
            "specifications"
    })
    Optional<Component> findDetailedById(Long id);
}