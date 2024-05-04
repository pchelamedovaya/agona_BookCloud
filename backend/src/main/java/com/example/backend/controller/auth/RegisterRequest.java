package com.example.backend.controller.auth;

public record RegisterRequest(
        String login,
        String email,
        String password
) {
}
