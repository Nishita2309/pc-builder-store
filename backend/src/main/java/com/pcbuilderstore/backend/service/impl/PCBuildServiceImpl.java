package com.pcbuilderstore.backend.service.impl;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcbuilderstore.backend.dto.request.CreatePCBuildRequest;
import com.pcbuilderstore.backend.dto.request.UpdatePCBuildRequest;
import com.pcbuilderstore.backend.dto.response.PCBuildResponse;
import com.pcbuilderstore.backend.entity.PCBuild;
import com.pcbuilderstore.backend.entity.User;
import com.pcbuilderstore.backend.exception.ResourceNotFoundException;
import com.pcbuilderstore.backend.mapper.PCBuildMapper;
import com.pcbuilderstore.backend.repository.PCBuildRepository;
import com.pcbuilderstore.backend.repository.UserRepository;
import com.pcbuilderstore.backend.service.PCBuildService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PCBuildServiceImpl implements PCBuildService {

    private final PCBuildRepository pcBuildRepository;

    private final UserRepository userRepository;

    private final PCBuildMapper pcBuildMapper;

    @Override
    public PCBuildResponse createBuild(CreatePCBuildRequest request) {

        User currentUser = getCurrentUser();

        PCBuild build = pcBuildMapper.toEntity(request);

        build.setUser(currentUser);

        PCBuild savedBuild = pcBuildRepository.save(build);

        return pcBuildMapper.toResponse(savedBuild);
    }

    @Override
    @Transactional(readOnly = true)
    public PCBuildResponse getBuildById(Long id) {

        PCBuild build = getOwnedBuild(id);

        return pcBuildMapper.toResponse(build);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PCBuildResponse> getMyBuilds() {

        User currentUser = getCurrentUser();

        return pcBuildRepository.findByUser(currentUser)
                .stream()
                .map(pcBuildMapper::toResponse)
                .toList();
    }

    @Override
    public PCBuildResponse updateBuild(
            Long id,
            UpdatePCBuildRequest request) {

        PCBuild build = getOwnedBuild(id);

        build.setName(request.getName());
        build.setDescription(request.getDescription());

        PCBuild updatedBuild = pcBuildRepository.save(build);

        return pcBuildMapper.toResponse(updatedBuild);
    }

    @Override
    public void deleteBuild(Long id) {

        PCBuild build = getOwnedBuild(id);

        pcBuildRepository.delete(build);
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found"));
    }

    private PCBuild getOwnedBuild(Long buildId) {

        User currentUser = getCurrentUser();

        PCBuild build = pcBuildRepository.findById(buildId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Build not found with id: " + buildId));

        if (!build.getUser().getId().equals(currentUser.getId())) {

            throw new ResourceNotFoundException(
                    "Build not found with id: " + buildId);
        }

        return build;
    }
}