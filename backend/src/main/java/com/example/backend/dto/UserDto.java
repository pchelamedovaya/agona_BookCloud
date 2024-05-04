package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import com.example.backend.entity.UserEntity.Role;
import com.example.backend.entity.UserEntity.State;

@Data
@Builder
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String login;
    private String about;
    private String email;
    private String password;
    private Role role;
    private State state;
}
