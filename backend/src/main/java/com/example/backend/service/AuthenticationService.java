package com.example.backend.service;


import com.example.backend.controller.auth.*;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.UserEntity;

public interface AuthenticationService {
    UserDto getUserInfoByToken(TokenRequest token);

    AuthenticationResponse generateToken(long id, String login, UserEntity.Role role);

    AuthenticationResponse register(RegisterRequest registerRequest);

    AuthenticationResponse login(LoginRequest loginRequest);

    AuthenticationResponse refreshToken(RefreshTokenRequest refreshToken);
}
