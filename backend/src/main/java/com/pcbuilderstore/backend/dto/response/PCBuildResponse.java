package com.pcbuilderstore.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PCBuildResponse {

    private Long id;

    private String name;

    private String description;

    private BigDecimal totalPrice;

    private Integer estimatedPower;

    private Boolean compatible;

    private List<PCBuildComponentResponse> components;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}