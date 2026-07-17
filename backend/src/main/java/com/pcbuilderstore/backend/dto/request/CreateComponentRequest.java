package com.pcbuilderstore.backend.dto.request;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateComponentRequest {

    @NotBlank(message = "Component name is required")
    @Size(max = 150)
    private String name;

    @Size(max = 1000)
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotNull(message = "Stock quantity is required")
    @Min(0)
    private Integer stockQuantity;

    @NotNull(message = "Brand is required")
    private Long brandId;

    @NotNull(message = "Category is required")
    private Long categoryId;

    private String imageUrl;

    private List<ComponentSpecificationRequest> specifications;

}