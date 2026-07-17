package com.pcbuilderstore.backend.service.impl;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcbuilderstore.backend.entity.PCBuild;
import com.pcbuilderstore.backend.entity.PCBuildComponent;
import com.pcbuilderstore.backend.exception.ResourceNotFoundException;
import com.pcbuilderstore.backend.repository.PCBuildRepository;
import com.pcbuilderstore.backend.service.BuildSummaryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BuildSummaryServiceImpl implements BuildSummaryService {

    private final PCBuildRepository pcBuildRepository;

    @Override
    public BigDecimal calculateTotalPrice(Long buildId) {

        PCBuild build = pcBuildRepository.findById(buildId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Build not found with id: " + buildId));

        BigDecimal total = BigDecimal.ZERO;

        for (PCBuildComponent item : build.getBuildComponents()) {

            BigDecimal componentPrice = item.getComponent().getPrice();

            BigDecimal quantity = BigDecimal.valueOf(item.getQuantity());

            total = total.add(componentPrice.multiply(quantity));
        }

        return total;
    }

    @Override
    public Integer calculateEstimatedPower(Long buildId) {

        /*
         * Placeholder implementation.
         *
         * In the next pack, we'll calculate this using
         * ComponentSpecification values (e.g., TDP).
         */

        return 0;
    }
}