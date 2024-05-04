package com.example.backend.security.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.security.core.AuthenticationException;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UserBannedException extends AuthenticationException {
    public UserBannedException(String msg) {
        super(msg);
    }
}
