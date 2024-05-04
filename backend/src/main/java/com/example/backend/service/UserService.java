package com.example.backend.service;


import com.example.backend.dto.UserDto;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        List<UserEntity> allUsers = userRepository.findAllByOrderByIdDesc();

        return allUsers.stream()
                .map(it -> UserDto.builder()
                        .id(it.getId())
                        .firstName(it.getFirstName())
                        .lastName(it.getLastName())
                        .about(it.getAbout())
                        .login(it.getLogin())
                        .email(it.getEmail())
                        .role(it.getRole())
                        .state(it.getState())
                        .build())
                .toList();
    }

    public UserDto toggleUserState(Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    if (user.getState() == UserEntity.State.ACTIVE) {
                        user.setState(UserEntity.State.BANNED);
                    } else {
                        user.setState(UserEntity.State.ACTIVE);
                    }
                    userRepository.save(user);
                    return UserDto.builder()
                            .id(user.getId())
                            .firstName(user.getFirstName())
                            .lastName(user.getLastName())
                            .about(user.getAbout())
                            .login(user.getLogin())
                            .email(user.getEmail())
                            .role(user.getRole())
                            .state(user.getState())
                            .build();
                })
                .orElse(null);
    }

    public UserDto getUserById(Long id) {
        return userRepository.findById(id)
                .map(it -> UserDto.builder()
                        .email(it.getEmail())
                        .firstName(it.getFirstName())
                        .lastName(it.getLastName())
                        .role(it.getRole())
                        .about(it.getAbout())
                        .build())
                .get();
    }

    public Optional<UserEntity> findByLogin(String login) {
        return userRepository.findByLogin(login);
    }
}
