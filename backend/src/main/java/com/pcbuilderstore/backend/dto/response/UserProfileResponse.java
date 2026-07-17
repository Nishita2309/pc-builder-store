package com.pcbuilderstore.backend.dto.response;

import com.pcbuilderstore.backend.enums.AccountStatus;
import com.pcbuilderstore.backend.enums.RoleType;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private RoleType role;

    private AccountStatus accountStatus;
}