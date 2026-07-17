package com.pcbuilderstore.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.pcbuilderstore.backend.dto.request.LoginRequest;
import com.pcbuilderstore.backend.dto.request.RegisterRequest;
import com.pcbuilderstore.backend.dto.response.AuthenticationResponse;
import com.pcbuilderstore.backend.dto.response.UserProfileResponse;
import com.pcbuilderstore.backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthenticationResponse response =
                authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @Valid @RequestBody LoginRequest request) {

        AuthenticationResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile() {

        return ResponseEntity.ok(
                authService.getCurrentUser());
    }
}