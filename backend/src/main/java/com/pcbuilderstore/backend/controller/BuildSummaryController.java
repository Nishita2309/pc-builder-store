package com.pcbuilderstore.backend.controller;

import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pcbuilderstore.backend.dto.response.CompatibilityResponse;
import com.pcbuilderstore.backend.service.BuildSummaryService;
import com.pcbuilderstore.backend.service.CompatibilityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/builds")
@RequiredArgsConstructor
public class BuildSummaryController {

    private final BuildSummaryService buildSummaryService;

    private final CompatibilityService compatibilityService;

    @GetMapping("/{buildId}/summary/price")
    public ResponseEntity<BigDecimal> getTotalPrice(
            @PathVariable Long buildId) {

        return ResponseEntity.ok(
                buildSummaryService.calculateTotalPrice(buildId));
    }

    @GetMapping("/{buildId}/summary/power")
    public ResponseEntity<Integer> getEstimatedPower(
            @PathVariable Long buildId) {

        return ResponseEntity.ok(
                buildSummaryService.calculateEstimatedPower(buildId));
    }

    @GetMapping("/{buildId}/compatibility")
    public ResponseEntity<CompatibilityResponse> checkCompatibility(
            @PathVariable Long buildId) {

        return ResponseEntity.ok(
                compatibilityService.checkCompatibility(buildId));
    }
}