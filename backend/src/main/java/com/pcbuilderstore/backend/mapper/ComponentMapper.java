package com.pcbuilderstore.backend.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pcbuilderstore.backend.dto.request.CreateComponentRequest;
import com.pcbuilderstore.backend.dto.response.ComponentResponse;
import com.pcbuilderstore.backend.dto.response.ComponentSummaryResponse;
import com.pcbuilderstore.backend.entity.Component;

@Mapper(
        componentModel = "spring",
        uses = {
                BrandMapper.class,
                CategoryMapper.class,
                ComponentSpecificationMapper.class
        }
)
public interface ComponentMapper {

    @BeanMapping(builder = @Builder(disableBuilder = true))
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "brand", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "specifications", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "model", ignore = true)
    @Mapping(target = "warrantyMonths", ignore = true)
    @Mapping(target = "componentType", ignore = true)
    @Mapping(target = "sku", ignore = true)
    @Mapping(target = "inventory", ignore = true)
    Component toEntity(CreateComponentRequest request);

    @Mapping(target = "stockQuantity", source = "inventory.availableQuantity")
    ComponentResponse toResponse(Component component);

    @Mapping(target = "stockQuantity", source = "inventory.availableQuantity")
    @Mapping(target = "brand", source = "brand.name")
    @Mapping(target = "category", source = "category.name")
    ComponentSummaryResponse toSummaryResponse(Component component);
}