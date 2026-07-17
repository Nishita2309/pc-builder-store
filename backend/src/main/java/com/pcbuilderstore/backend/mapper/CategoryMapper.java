package com.pcbuilderstore.backend.mapper;

import org.mapstruct.Mapper;

import com.pcbuilderstore.backend.dto.response.CategoryResponse;
import com.pcbuilderstore.backend.entity.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponse toResponse(Category entity);
}
