package com.pcbuilderstore.backend.service;

import com.pcbuilderstore.backend.dto.request.LoginRequest;
import com.pcbuilderstore.backend.dto.request.RegisterRequest;
import com.pcbuilderstore.backend.dto.response.AuthenticationResponse;
import com.pcbuilderstore.backend.dto.response.UserProfileResponse;

public interface AuthService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(LoginRequest request);
    
    UserProfileResponse getCurrentUser();

}