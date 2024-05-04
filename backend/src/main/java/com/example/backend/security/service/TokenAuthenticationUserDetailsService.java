package com.example.backend.security.service;

import com.example.backend.dto.UserDto;
import com.example.backend.security.exception.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TokenAuthenticationUserDetailsService implements AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> {
    @Override
    public UserDetails loadUserDetails(PreAuthenticatedAuthenticationToken token) throws UsernameNotFoundException {
        return loadUserDetails((UserDto) token.getPrincipal(), String.valueOf(token.getCredentials()));
    }

    private UserDetails loadUserDetails(UserDto userDto, String token) {
        try {
            return Optional.ofNullable(userDto)
                    .map(account -> {
                        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(userDto.getRole().name()));
                        return UserAccount.builder()
                                .id(account.getId())
                                .username(account.getLogin())
                                .firstName(account.getFirstName())
                                .lastName(account.getLastName())
                                .authorities(authorities)
                                .isAccountNonExpired(true)
                                .isCredentialsNonExpired(true)
                                .isAccountNonLocked(true)
                                .isEnabled(true)
                                .token(token)
                                .build();
                    })
                    .orElseThrow(() -> new UsernameNotFoundException("Unknown user by token %s".formatted(token)));
        } catch (Exception exception) {
            throw new AuthenticationException(exception.getMessage());
        }
    }
}
