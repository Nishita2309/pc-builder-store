package com.pcbuilderstore.backend.dto.response;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PCBuildComponentResponse {

    private Long id;

    private Long componentId;

    private String componentName;

    private String category;

    private String brand;

    private Integer quantity;

    private BigDecimal price;

    private String imageUrl;

}