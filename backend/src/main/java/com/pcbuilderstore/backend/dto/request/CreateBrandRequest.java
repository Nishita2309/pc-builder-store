package com.pcbuilderstore.backend.dto.request;

import com.pcbuilderstore.backend.util.AppConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateBrandRequest {

    @NotBlank(message = "Brand name is required")
    @Size(max = AppConstants.NAME_LENGTH)
    private String name;

    @Size(max = AppConstants.DESCRIPTION_LENGTH)
    private String description;
}