package com.example.backend.service;


import com.example.backend.controller.auth.*;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.AuthDataEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.AuthDataRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.exception.AuthenticationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

import static com.example.backend.security.util.SecurityConsts.ROLE;


@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository repository;
    private final AuthDataRepository authDataRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final static long expirationAccess = 24 * 60 * 60 * 1000;
    private final static long expirationRefresh = 30 * 24 * 60 * 60 * 1000L;
    private final static String jwtSecret = "pchela_medovayaa_ymvoboobovmy";

    private SecretKey encodeSecret() {
        byte[] base64secret = Base64.getEncoder().encode(jwtSecret.getBytes());
        return Keys.hmacShaKeyFor(base64secret);
    }

    @Override
    public UserDto getUserInfoByToken(TokenRequest token) {
        Claims claims = parseAccessToken(token.getToken());
        String login = claims.getSubject();

        Optional<UserEntity> userEntity = repository.findByLogin(login);
        return userEntity.map(entity -> new UserDto(
                entity.getId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getLogin(),
                entity.getAbout(),
                entity.getEmail(),
                entity.getHashPassword(),
                entity.getRole(),
                entity.getState()
        )).orElse(null);
    }

    private Claims parseAccessToken(String accessToken) {
        return Jwts.parser()
                .verifyWith(encodeSecret())
                .build()
                .parseSignedClaims(accessToken)
                .getPayload();

    }

    @Override
    public AuthenticationResponse generateToken(long id, String login, UserEntity.Role role) {
        Map<String, Object> claims = new HashMap<>(Collections.singletonMap(ROLE, role));
        claims.put(Claims.SUBJECT, login);
        claims.put(ROLE, role.name());

        long now = System.currentTimeMillis();
        String jwt = Jwts.builder()
                .claims(claims)
                .issuedAt(new Date(now))
                .expiration(new Date(now + expirationAccess))
                .signWith(encodeSecret())
                .compact();

        String refresh = id + "-" + UUID.randomUUID();
        AuthDataEntity authDataEntity = new AuthDataEntity(
                id,
                refresh,
                new java.sql.Date(now + expirationRefresh)
        );
        authDataRepository.save(authDataEntity);

        return AuthenticationResponse.builder()
                .accessToken(jwt)
                .refreshToken(refresh)
                .role(role.name())
                .build();
    }

    @Override
    public AuthenticationResponse register(RegisterRequest registerRequest) {
        String passwordHash = passwordEncoder.encode(registerRequest.password());
        UserEntity userEntity = UserEntity.builder()
                .firstName("Unknown")
                .email(registerRequest.email())
                .login(registerRequest.login())
                .hashPassword(passwordHash)
                .role(UserEntity.Role.USER)
                .state(UserEntity.State.ACTIVE)
                .build();
        userEntity = repository.save(userEntity);
        return generateToken(userEntity.getId(), userEntity.getLogin(), userEntity.getRole());
    }


    @Override
    public AuthenticationResponse login(LoginRequest loginRequest) {
        Optional<UserEntity> userEntity = repository.findByLogin(loginRequest.login());

        if (userEntity.isPresent()) {
            if (passwordEncoder.matches(loginRequest.password(), userEntity.get().getHashPassword())) {
                return generateToken(userEntity.get().getId(), userEntity.get().getLogin(), userEntity.get().getRole());
            }
        }
        throw new AuthenticationException("Incorrect credentials");
    }

    @Override
    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshToken) {
        String refreshedToken = refreshToken.getRefreshToken();
        long id = Integer.parseInt(refreshedToken.split("-")[0]);
        Optional<AuthDataEntity> authDataEntity = authDataRepository.findById(id);
        if (authDataEntity.isPresent()) {
            AuthDataEntity authData = authDataEntity.get();
            if (authData.getToken().equals(refreshedToken) && authData.getExpiryDate().after(new Date())) {
                UserEntity userEntity = repository.findById(id).get();
                return generateToken(
                        id,
                        userEntity.getLogin(),
                        userEntity.getRole()
                );
            }
        }
        throw new AuthenticationException("Incorrect token");
    }
}
