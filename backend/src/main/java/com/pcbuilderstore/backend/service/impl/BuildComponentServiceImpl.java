package com.pcbuilderstore.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcbuilderstore.backend.dto.request.AddComponentRequest;
import com.pcbuilderstore.backend.dto.request.UpdateBuildComponentRequest;
import com.pcbuilderstore.backend.dto.response.PCBuildComponentResponse;
import com.pcbuilderstore.backend.entity.Component;
import com.pcbuilderstore.backend.entity.PCBuild;
import com.pcbuilderstore.backend.entity.PCBuildComponent;
import com.pcbuilderstore.backend.exception.ResourceNotFoundException;
import com.pcbuilderstore.backend.mapper.PCBuildComponentMapper;
import com.pcbuilderstore.backend.repository.ComponentRepository;
import com.pcbuilderstore.backend.repository.PCBuildComponentRepository;
import com.pcbuilderstore.backend.repository.PCBuildRepository;
import com.pcbuilderstore.backend.service.BuildComponentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BuildComponentServiceImpl implements BuildComponentService {

    private final PCBuildRepository pcBuildRepository;

    private final PCBuildComponentRepository pcBuildComponentRepository;

    private final ComponentRepository componentRepository;

    private final PCBuildComponentMapper componentMapper;

    @Override
    public PCBuildComponentResponse addComponent(
            Long buildId,
            AddComponentRequest request) {

        PCBuild build = pcBuildRepository.findById(buildId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Build not found"));

        Component component = componentRepository
                .findById(request.getComponentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Component not found"));

        PCBuildComponent buildComponent = new PCBuildComponent();

        buildComponent.setBuild(build);
        buildComponent.setComponent(component);
        buildComponent.setQuantity(request.getQuantity());

        PCBuildComponent saved =
                pcBuildComponentRepository.save(buildComponent);

        return componentMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PCBuildComponentResponse> getBuildComponents(
            Long buildId) {

        PCBuild build = pcBuildRepository.findById(buildId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Build not found"));

        return pcBuildComponentRepository.findByBuild(build)
                .stream()
                .map(componentMapper::toResponse)
                .toList();
    }

    @Override
    public PCBuildComponentResponse updateComponent(
            Long buildId,
            Long buildComponentId,
            UpdateBuildComponentRequest request) {

        PCBuildComponent buildComponent =
                pcBuildComponentRepository.findById(buildComponentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Build Component not found"));

        buildComponent.setQuantity(request.getQuantity());

        PCBuildComponent updated =
                pcBuildComponentRepository.save(buildComponent);

        return componentMapper.toResponse(updated);
    }

    @Override
    public void removeComponent(
            Long buildId,
            Long buildComponentId) {

        PCBuildComponent buildComponent =
                pcBuildComponentRepository.findById(buildComponentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Build Component not found"));

        pcBuildComponentRepository.delete(buildComponent);
    }

}