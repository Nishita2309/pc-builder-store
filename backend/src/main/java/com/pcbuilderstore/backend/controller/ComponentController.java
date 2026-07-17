package com.pcbuilderstore.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcbuilderstore.backend.dto.request.CreateComponentRequest;
import com.pcbuilderstore.backend.dto.request.ComponentSearchRequest;
import com.pcbuilderstore.backend.dto.request.UpdateComponentRequest;
import com.pcbuilderstore.backend.dto.response.ComponentResponse;
import com.pcbuilderstore.backend.dto.response.ComponentSummaryResponse;
import com.pcbuilderstore.backend.service.ComponentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/components")
@RequiredArgsConstructor
@Validated
public class ComponentController {

    private final ComponentService componentService;

    @PostMapping
    public ResponseEntity<ComponentResponse> createComponent(
            @Valid @RequestBody CreateComponentRequest request) {

        ComponentResponse response =
                componentService.createComponent(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComponentResponse> updateComponent(
            @PathVariable Long id,
            @Valid @RequestBody UpdateComponentRequest request) {

        ComponentResponse response =
                componentService.updateComponent(id, request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComponentResponse> getComponentById(
            @PathVariable Long id) {

        ComponentResponse response =
                componentService.getComponentById(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<ComponentSummaryResponse>> getAllComponents(
            ComponentSearchRequest request,
            Pageable pageable) {

        Page<ComponentSummaryResponse> response =
                componentService.getAllComponents(request, pageable);

        return ResponseEntity.ok(response);
    }
}