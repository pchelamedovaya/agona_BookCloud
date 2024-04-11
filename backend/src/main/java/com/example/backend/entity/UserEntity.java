package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String about;

    private String email;
    private String hashPassword;

    @Enumerated(value = EnumType.STRING)
    private State state;

    @Enumerated(value = EnumType.STRING)
    private Role role = Role.USER;

    public enum State {
        ACTIVE, BANNED
    }

    public enum Role {
        USER, ADMIN
    }

    public boolean isActive() {
        return this.state == State.ACTIVE;
    }

    public boolean isBanned() {
        return this.state == State.BANNED;
    }

    public boolean isAdmin() {
        return this.role == Role.ADMIN;
    }
}
