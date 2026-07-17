package com.pcbuilderstore.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.pcbuilderstore.backend.dto.request.AddComponentRequest;
import com.pcbuilderstore.backend.dto.request.UpdateBuildComponentRequest;
import com.pcbuilderstore.backend.dto.response.PCBuildComponentResponse;
import com.pcbuilderstore.backend.service.BuildComponentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/builds/{buildId}/components")
@RequiredArgsConstructor
@Validated
public class BuildComponentController {

    private final BuildComponentService buildComponentService;

    @PostMapping
    public ResponseEntity<PCBuildComponentResponse> addComponent(
            @PathVariable Long buildId,
            @Valid @RequestBody AddComponentRequest request) {

        PCBuildComponentResponse response =
                buildComponentService.addComponent(buildId, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<PCBuildComponentResponse>> getComponents(
            @PathVariable Long buildId) {

        return ResponseEntity.ok(
                buildComponentService.getBuildComponents(buildId));
    }

    @PutMapping("/{buildComponentId}")
    public ResponseEntity<PCBuildComponentResponse> updateComponent(
            @PathVariable Long buildId,
            @PathVariable Long buildComponentId,
            @Valid @RequestBody UpdateBuildComponentRequest request) {

        return ResponseEntity.ok(
                buildComponentService.updateComponent(
                        buildId,
                        buildComponentId,
                        request));
    }

    @DeleteMapping("/{buildComponentId}")
    public ResponseEntity<Void> removeComponent(
            @PathVariable Long buildId,
            @PathVariable Long buildComponentId) {

        buildComponentService.removeComponent(
                buildId,
                buildComponentId);

        return ResponseEntity.noContent().build();
    }
}