package com.pcbuilderstore.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.pcbuilderstore.backend.dto.request.CreateComponentRequest;
import com.pcbuilderstore.backend.dto.request.ComponentSearchRequest;
import com.pcbuilderstore.backend.dto.request.UpdateComponentRequest;
import com.pcbuilderstore.backend.dto.response.ComponentResponse;
import com.pcbuilderstore.backend.dto.response.ComponentSummaryResponse;

public interface ComponentService {

    ComponentResponse createComponent(CreateComponentRequest request);

    ComponentResponse getComponentById(Long id);

    Page<ComponentSummaryResponse> getAllComponents(
            ComponentSearchRequest request,
            Pageable pageable);

    ComponentResponse updateComponent(
            Long id,
            UpdateComponentRequest request);
}