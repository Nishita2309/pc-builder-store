package com.pcbuilderstore.backend.service;

import java.math.BigDecimal;

public interface BuildSummaryService {

    BigDecimal calculateTotalPrice(Long buildId);

    Integer calculateEstimatedPower(Long buildId);

}