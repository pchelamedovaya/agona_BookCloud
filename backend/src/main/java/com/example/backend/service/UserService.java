package com.example.backend.service;

import com.example.backend.dto.EmailPasswordDto;
import com.example.backend.dto.AuthDataDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.AuthDataEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.AuthDataRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthDataRepository authDataRepository;

    public UserEntity addUser(UserDto userDto) {
        UserEntity newUser = UserEntity.builder()
                .hashPassword(passwordEncoder.encode(userDto.getPassword()))
                .email(userDto.getEmail())
                .role(UserEntity.Role.USER)
                .state(UserEntity.State.ACTIVE)
                .build();
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exist");
        }
        return userRepository.save(newUser);
    }

    public AuthDataDto login(EmailPasswordDto emailPassword) throws Throwable {
        UserEntity user = userRepository.findByEmail(emailPassword.getEmail())
                .orElseThrow((Supplier<Throwable>) () -> new UsernameNotFoundException("User not found"));
        if (passwordEncoder.matches(emailPassword.getPassword(), user.getHashPassword())) {
            String tokenValue = UUID.randomUUID().toString();
            AuthDataEntity token = AuthDataEntity.builder()
                    .token(tokenValue)
                    .user(user)
                    .build();

            authDataRepository.save(token);

            return AuthDataDto.builder()
                    .token(tokenValue)
                    .role(user.getRole())
                    .build();

        } else {
            throw new UsernameNotFoundException("Invalid username or password");
        }
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(it -> UserDto.builder()
                        .firstName(it.getFirstName())
                        .lastName(it.getLastName())
                        .about(it.getAbout())
                        .email(it.getEmail())
                        .build())
                .toList();
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
}
