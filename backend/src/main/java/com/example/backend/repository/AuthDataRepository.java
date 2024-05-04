package com.example.backend.repository;

import com.example.backend.entity.AuthDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthDataRepository extends JpaRepository<AuthDataEntity, Long> {
}
