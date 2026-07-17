package com.pcbuilderstore.backend.dto.response;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ComponentSummaryResponse {

    private Long id;

    private String name;

    private String brand;

    private String category;

    private BigDecimal price;

    private Integer stockQuantity;

    private String imageUrl;

    private String description;

    private List<ComponentSpecificationResponse> specifications;

}