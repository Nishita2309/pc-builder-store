package com.pcbuilderstore.backend.dto.response;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompatibilityResponse {

    private boolean compatible;

    private List<String> errors = new ArrayList<>();

    private List<String> warnings = new ArrayList<>();

}