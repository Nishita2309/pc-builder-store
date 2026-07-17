package com.pcbuilderstore.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcbuilderstore.backend.entity.ComponentSpecification;

public interface ComponentSpecificationRepository
        extends JpaRepository<ComponentSpecification, Long> {

    List<ComponentSpecification> findByComponentId(Long componentId);

}