package com.example.backend.security.filter;


import com.example.backend.controller.auth.TokenRequest;
import com.example.backend.dto.UserDto;
import com.example.backend.security.util.HttpResponseUtil;
import com.example.backend.security.util.HttpSettingUtil;
import com.example.backend.service.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
public class TokenAuthenticationFilter extends RequestHeaderAuthenticationFilter {
    private final AuthenticationService authenticationService;

    public TokenAuthenticationFilter(AuthenticationService authenticationService, AuthenticationManager authenticationManager) {
        this.authenticationService = authenticationService;
        this.setAuthenticationManager(authenticationManager);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException {
        try {
            TokenRequest token = HttpSettingUtil.getTokenFromValidatedAuthorizationHeader(((HttpServletRequest) request).getHeader(AUTHORIZATION));
            if (Objects.nonNull(token)) {
                UserDto userDto = authenticationService.getUserInfoByToken(token);
                SecurityContextHolder.getContext().setAuthentication(new PreAuthenticatedAuthenticationToken(userDto, token));
            }
            chain.doFilter(request, response);
        } catch (Exception exception) {
            HttpResponseUtil.putExceptionInResponse(((HttpServletRequest) request), ((HttpServletResponse) response),
                    exception, HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
