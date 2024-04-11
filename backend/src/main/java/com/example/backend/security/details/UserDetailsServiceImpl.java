package com.example.backend.security.details;

import com.example.backend.entity.AuthDataEntity;
import com.example.backend.repository.AuthDataRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.function.Supplier;

@Component("customUserDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AuthDataRepository tokensRepository;

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String token) throws UsernameNotFoundException {
        AuthDataEntity result = tokensRepository.findByToken(token).orElseThrow((Supplier<Throwable>) () -> new UsernameNotFoundException("Token not found"));
        return new UserDetailsImpl(result.getUser());
    }
}
