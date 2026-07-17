package com.pcbuilderstore.backend.service;

import java.util.List;

import com.pcbuilderstore.backend.dto.request.AddComponentRequest;
import com.pcbuilderstore.backend.dto.request.UpdateBuildComponentRequest;
import com.pcbuilderstore.backend.dto.response.PCBuildComponentResponse;

public interface BuildComponentService {

    PCBuildComponentResponse addComponent(
            Long buildId,
            AddComponentRequest request);

    List<PCBuildComponentResponse> getBuildComponents(
            Long buildId);

    PCBuildComponentResponse updateComponent(
            Long buildId,
            Long buildComponentId,
            UpdateBuildComponentRequest request);

    void removeComponent(
            Long buildId,
            Long buildComponentId);

}