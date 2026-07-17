package com.pcbuilderstore.backend.dto.request;

import com.pcbuilderstore.backend.util.AppConstants;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePCBuildRequest {

    @NotBlank(message = "Build name is required")
    @Size(max = AppConstants.NAME_LENGTH)
    private String name;

    @Size(max = AppConstants.DESCRIPTION_LENGTH)
    private String description;

}