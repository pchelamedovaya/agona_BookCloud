package com.example.backend.controller;

import com.example.backend.dto.EmailPasswordDto;
import com.example.backend.dto.AuthDataDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.UserEntity;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public UserEntity createUser(@RequestBody UserDto userDto){
        return userService.addUser(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDataDto> login(@RequestBody EmailPasswordDto emailPassword) throws Throwable {
        return ResponseEntity.ok(userService.login(emailPassword));
    }

    @GetMapping("/users")
    public List<UserDto> getAllUsers(){
        return userService.getAllUsers();
    }

}
