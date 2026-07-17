package com.pcbuilderstore.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthenticationResponse {

    private String token;

    @Builder.Default
    private String type = "Bearer";

    private long expiresIn;

}