package com.pcbuilderstore.backend.dto.request;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComponentSearchRequest {

    private String keyword;

    private Long brandId;

    private Long categoryId;

    private BigDecimal minPrice;

    private BigDecimal maxPrice;

}