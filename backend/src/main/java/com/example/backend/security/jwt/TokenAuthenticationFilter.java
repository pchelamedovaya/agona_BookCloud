package com.example.backend.security.jwt;

import com.example.backend.security.details.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String token = request.getHeader("Authorization");

        if (token != null) {
            TokenAuthentication tokenAuthentication = new TokenAuthentication(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(tokenAuthentication.getName());
            tokenAuthentication.setAuthenticated(true);
            tokenAuthentication.setUserDetails(userDetails);
            SecurityContextHolder.getContext().setAuthentication(tokenAuthentication);
        }
        filterChain.doFilter(request, response);
    }
}
