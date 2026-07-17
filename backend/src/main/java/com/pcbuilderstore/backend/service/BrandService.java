package com.pcbuilderstore.backend.service;

import java.util.List;

import com.pcbuilderstore.backend.dto.request.CreateBrandRequest;
import com.pcbuilderstore.backend.dto.request.UpdateBrandRequest;
import com.pcbuilderstore.backend.dto.response.BrandResponse;

public interface BrandService {

    BrandResponse createBrand(CreateBrandRequest request);

    BrandResponse updateBrand(Long id, UpdateBrandRequest request);

    void deleteBrand(Long id);

    BrandResponse getBrandById(Long id);

    List<BrandResponse> getAllBrands();
}