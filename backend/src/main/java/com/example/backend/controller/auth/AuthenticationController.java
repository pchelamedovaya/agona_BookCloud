package com.example.backend.controller.auth;

import com.example.backend.entity.UserEntity;
import com.example.backend.security.exception.ForbiddenException;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.backend.security.exception.AuthenticationException;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/signup")
    AuthenticationResponse register(@RequestBody RegisterRequest registerRequest) {
        return authenticationService.register(registerRequest);
    }

    @PostMapping("/login")
    AuthenticationResponse login(@RequestBody LoginRequest loginRequest) {
        Optional<UserEntity> optionalUser = userService.findByLogin(loginRequest.login());

        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            if (user.isBanned()) {
                throw new ForbiddenException("You are banned");
            }
        } else {
            throw new AuthenticationException("User not found");
        }

        return authenticationService.login(loginRequest);
    }

    @PostMapping("/refresh")
    AuthenticationResponse login(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authenticationService.refreshToken(refreshTokenRequest);
    }

    @GetMapping("/signin")
    String loginPage() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return String.valueOf(authentication.getPrincipal());
        }
        return "empty";
    }
}
