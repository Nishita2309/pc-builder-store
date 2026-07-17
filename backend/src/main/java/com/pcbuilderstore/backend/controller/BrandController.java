package com.pcbuilderstore.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.pcbuilderstore.backend.dto.request.CreateBrandRequest;
import com.pcbuilderstore.backend.dto.request.UpdateBrandRequest;
import com.pcbuilderstore.backend.dto.response.BrandResponse;
import com.pcbuilderstore.backend.service.BrandService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
@Validated
public class BrandController {

    private final BrandService brandService;

    @PostMapping
    public ResponseEntity<BrandResponse> createBrand(
            @Valid @RequestBody CreateBrandRequest request) {

        BrandResponse response = brandService.createBrand(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandResponse> getBrandById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                brandService.getBrandById(id));
    }

    @GetMapping
    public ResponseEntity<List<BrandResponse>> getAllBrands() {

        return ResponseEntity.ok(
                brandService.getAllBrands());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrandResponse> updateBrand(
            @PathVariable Long id,
            @Valid @RequestBody UpdateBrandRequest request) {

        return ResponseEntity.ok(
                brandService.updateBrand(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(
            @PathVariable Long id) {

        brandService.deleteBrand(id);

        return ResponseEntity.noContent().build();
    }
}