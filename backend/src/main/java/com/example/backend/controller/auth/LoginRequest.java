package com.example.backend.controller.auth;

public record LoginRequest(
        String login,
        String password
) {
}
