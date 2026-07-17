package com.pcbuilderstore.backend.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcbuilderstore.backend.dto.request.LoginRequest;
import com.pcbuilderstore.backend.dto.request.RegisterRequest;
import com.pcbuilderstore.backend.dto.response.AuthenticationResponse;
import com.pcbuilderstore.backend.dto.response.UserProfileResponse;
import com.pcbuilderstore.backend.entity.User;
import com.pcbuilderstore.backend.enums.AccountStatus;
import com.pcbuilderstore.backend.enums.RoleType;
import com.pcbuilderstore.backend.exception.DuplicateResourceException;
import com.pcbuilderstore.backend.repository.UserRepository;
import com.pcbuilderstore.backend.security.jwt.JwtService;
import com.pcbuilderstore.backend.security.user.CustomUserDetails;
import com.pcbuilderstore.backend.service.AuthService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "Email already exists.");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(RoleType.CUSTOMER)
                .accountStatus(AccountStatus.ACTIVE)
                .build();

        User savedUser = userRepository.save(user);

        String jwtToken = jwtService.generateToken(
                new CustomUserDetails(savedUser));

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .expiresIn(3600)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AuthenticationResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtService.generateToken(
                new CustomUserDetails(user));

        return AuthenticationResponse.builder()
                .token(token)
                .expiresIn(3600)
                .build();
    }
    
    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        User user = userDetails.getUser();

        return UserProfileResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .accountStatus(user.getAccountStatus())
                .build();
    }
}