package com.pcbuilderstore.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pcbuilderstore.backend.dto.request.CreatePCBuildRequest;
import com.pcbuilderstore.backend.dto.response.PCBuildResponse;
import com.pcbuilderstore.backend.entity.PCBuild;

@Mapper(
        componentModel = "spring",
        uses = {
                PCBuildComponentMapper.class
        }
)
public interface PCBuildMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "buildComponents", ignore = true)
    PCBuild toEntity(CreatePCBuildRequest request);

    @Mapping(target = "components", source = "buildComponents")
    @Mapping(target = "totalPrice", ignore = true)
    @Mapping(target = "estimatedPower", ignore = true)
    @Mapping(target = "compatible", ignore = true)
    PCBuildResponse toResponse(PCBuild entity);

}