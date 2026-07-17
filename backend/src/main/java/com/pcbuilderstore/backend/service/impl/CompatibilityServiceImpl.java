package com.pcbuilderstore.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcbuilderstore.backend.dto.response.CompatibilityResponse;
import com.pcbuilderstore.backend.entity.PCBuild;
import com.pcbuilderstore.backend.entity.PCBuildComponent;
import com.pcbuilderstore.backend.exception.ResourceNotFoundException;
import com.pcbuilderstore.backend.repository.PCBuildRepository;
import com.pcbuilderstore.backend.service.CompatibilityService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompatibilityServiceImpl implements CompatibilityService {

    private final PCBuildRepository pcBuildRepository;

    @Override
    public CompatibilityResponse checkCompatibility(Long buildId) {

        PCBuild build = pcBuildRepository.findById(buildId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Build not found with id: " + buildId));

        CompatibilityResponse response = new CompatibilityResponse();

        List<PCBuildComponent> components = build.getBuildComponents();

        if (components.isEmpty()) {

            response.setCompatible(false);
            response.getWarnings().add("Build does not contain any components.");

            return response;
        }

        response.setCompatible(true);

        return response;
    }
}