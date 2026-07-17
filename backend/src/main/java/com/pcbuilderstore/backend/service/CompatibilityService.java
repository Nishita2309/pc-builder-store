package com.pcbuilderstore.backend.service;

import com.pcbuilderstore.backend.dto.response.CompatibilityResponse;

public interface CompatibilityService {

    CompatibilityResponse checkCompatibility(Long buildId);

}