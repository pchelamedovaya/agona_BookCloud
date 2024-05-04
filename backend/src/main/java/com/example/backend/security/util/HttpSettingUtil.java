package com.example.backend.security.util;


import com.example.backend.controller.auth.TokenRequest;
import com.example.backend.security.exception.AuthenticationException;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.util.Optional;

import static com.example.backend.security.util.SecurityConsts.BEARER;

@UtilityClass
@Slf4j
public class HttpSettingUtil {

    public String getTokenFromAuthorizationHeader(String authorizationHeader) {
        return Optional.ofNullable(authorizationHeader)
                .filter(StringUtils::isNotBlank)
                .map(bearer -> StringUtils.removeStart(bearer, BEARER).trim())
                .filter(StringUtils::isNotBlank)
                .orElse(null);
    }
    public TokenRequest getTokenFromValidatedAuthorizationHeader(String authorizationHeader) {

        if (authorizationHeader == null) {
            return null;
        }

        if (!authorizationHeader.startsWith(BEARER)) {
            throw new AuthenticationException("Invalid authentication scheme found in Authorization header");
        }

        String token = HttpSettingUtil.getTokenFromAuthorizationHeader(authorizationHeader);
        if (token == null) {
            throw new AuthenticationException("Authorization header token is empty");
        }

        return TokenRequest.builder().token(token).build();
    }
}

