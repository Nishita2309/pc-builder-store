package com.pcbuilderstore.backend.service;

import java.util.List;

import com.pcbuilderstore.backend.dto.request.CreatePCBuildRequest;
import com.pcbuilderstore.backend.dto.request.UpdatePCBuildRequest;
import com.pcbuilderstore.backend.dto.response.PCBuildResponse;

public interface PCBuildService {

    PCBuildResponse createBuild(CreatePCBuildRequest request);

    PCBuildResponse getBuildById(Long id);

    List<PCBuildResponse> getMyBuilds();

    PCBuildResponse updateBuild(Long id, UpdatePCBuildRequest request);

    void deleteBuild(Long id);

}