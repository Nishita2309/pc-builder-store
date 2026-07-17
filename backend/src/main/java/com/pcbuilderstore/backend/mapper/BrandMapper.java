package com.pcbuilderstore.backend.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pcbuilderstore.backend.dto.request.CreateBrandRequest;
import com.pcbuilderstore.backend.dto.response.BrandResponse;
import com.pcbuilderstore.backend.entity.Brand;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    @BeanMapping(builder = @Builder(disableBuilder = true))
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    Brand toEntity(CreateBrandRequest request);

    BrandResponse toResponse(Brand entity);
}