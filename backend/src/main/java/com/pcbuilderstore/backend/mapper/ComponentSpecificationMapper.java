package com.pcbuilderstore.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pcbuilderstore.backend.dto.response.ComponentSpecificationResponse;
import com.pcbuilderstore.backend.entity.ComponentSpecification;

@Mapper(componentModel = "spring")
public interface ComponentSpecificationMapper {

    @Mapping(target = "key", source = "specificationKey")
    @Mapping(target = "value", source = "value")
    ComponentSpecificationResponse toResponse(ComponentSpecification specification);

}