package com.pcbuilderstore.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ComponentSpecificationResponse {

    private String key;

    private String value;

}