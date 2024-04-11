package com.example.backend.dto;

import com.example.backend.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthDataDto {
    private String token;
    private UserEntity.Role role;
}
