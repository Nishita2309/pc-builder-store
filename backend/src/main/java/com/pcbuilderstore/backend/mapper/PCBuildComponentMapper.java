package com.pcbuilderstore.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pcbuilderstore.backend.dto.response.PCBuildComponentResponse;
import com.pcbuilderstore.backend.entity.PCBuildComponent;

@Mapper(componentModel = "spring")
public interface PCBuildComponentMapper {

    @Mapping(target = "componentId", source = "component.id")
    @Mapping(target = "componentName", source = "component.name")
    @Mapping(target = "category", source = "component.category.name")
    @Mapping(target = "brand", source = "component.brand.name")
    @Mapping(target = "price", source = "component.price")
    @Mapping(target = "imageUrl", source = "component.imageUrl")
    PCBuildComponentResponse toResponse(PCBuildComponent entity);

}