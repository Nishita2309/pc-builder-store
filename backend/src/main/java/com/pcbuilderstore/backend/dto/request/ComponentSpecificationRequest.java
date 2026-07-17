package com.pcbuilderstore.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComponentSpecificationRequest {

    @NotNull(message = "Specification key is required")
    private String key;

    @NotBlank(message = "Specification value is required")
    private String value;

}