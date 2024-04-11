package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

import com.example.backend.entity.UserEntity.Role;

@Data
@Builder
public class UserDto {
    private String firstName;
    private String lastName;
    private String about;
    private String email;
    private String password;
    private Role role;
}
