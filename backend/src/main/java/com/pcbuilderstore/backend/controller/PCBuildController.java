package com.pcbuilderstore.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.pcbuilderstore.backend.dto.request.CreatePCBuildRequest;
import com.pcbuilderstore.backend.dto.request.UpdatePCBuildRequest;
import com.pcbuilderstore.backend.dto.response.PCBuildResponse;
import com.pcbuilderstore.backend.service.PCBuildService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/builds")
@RequiredArgsConstructor
@Validated
public class PCBuildController {

    private final PCBuildService pcBuildService;

    @PostMapping
    public ResponseEntity<PCBuildResponse> createBuild(
            @Valid @RequestBody CreatePCBuildRequest request) {

        PCBuildResponse response = pcBuildService.createBuild(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PCBuildResponse> getBuildById(
            @PathVariable Long id) {

        return ResponseEntity.ok(pcBuildService.getBuildById(id));
    }

    @GetMapping
    public ResponseEntity<List<PCBuildResponse>> getMyBuilds() {

        return ResponseEntity.ok(pcBuildService.getMyBuilds());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PCBuildResponse> updateBuild(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePCBuildRequest request) {

        return ResponseEntity.ok(
                pcBuildService.updateBuild(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuild(
            @PathVariable Long id) {

        pcBuildService.deleteBuild(id);

        return ResponseEntity.noContent().build();
    }
}