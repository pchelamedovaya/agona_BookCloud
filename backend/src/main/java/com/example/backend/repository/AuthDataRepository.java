package com.example.backend.repository;

import com.example.backend.entity.AuthDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthDataRepository extends JpaRepository<AuthDataEntity, Long> {
    public Optional<AuthDataEntity> findByToken(String token);
}
