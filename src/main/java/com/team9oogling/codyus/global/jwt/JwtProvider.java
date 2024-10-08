package com.team9oogling.codyus.global.jwt;

import com.team9oogling.codyus.domain.user.entity.UserRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j(topic = "Global Exception")
@Component
public class JwtProvider {

  @Value("${jwt.secret.key}")
  private String secretKey;

  @Value("${jwt.access.token.expiration}")
  private long ACCESS_TOKEN_EXPIRATION;

  @Value("${jwt.refresh.token.expiration}")
  private long REFRESH_TOKEN_EXPIRATION;

  private static final String BEARER_PREFIX = "Bearer ";
  private final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
  private Key key;

  @PostConstruct
  public void init() {
    byte[] bytes = Base64.getDecoder().decode(secretKey);
    key = Keys.hmacShaKeyFor(bytes);
  }

  public String generateToken(String email, UserRole role, Date expirationDate, String loginProvider) {
    return Jwts.builder()
        .setSubject(email)
        .claim("auth", role.name())
        .claim("loginProvider", loginProvider)
        .setExpiration(expirationDate)
        .setIssuedAt(new Date())
        .signWith(key, signatureAlgorithm)
        .compact();
  }

  private Date generateExpirationDate(long ms) {
    return new Date(new Date().getTime() + ms);
  }

  public String createAccessToken(String email, UserRole role, String loginProvider) {
    Date expirationDate = generateExpirationDate(ACCESS_TOKEN_EXPIRATION);
    return generateToken(email, role, expirationDate, loginProvider);
  }

  public String createRefreshToken(String email, UserRole role, String loginProvider) {
    Date expirationDate = generateExpirationDate(REFRESH_TOKEN_EXPIRATION);
    return generateToken(email, role, expirationDate, loginProvider);
  }

  public String getAccessTokenFromHeader(HttpServletRequest request) {
    String authorizationHeader = request.getHeader("Authorization");
    if (!StringUtils.hasText(authorizationHeader) || !authorizationHeader.startsWith(BEARER_PREFIX)) {
      return null;
    }
    return authorizationHeader.substring(7);
  }

  public String getRefreshTokenFromHeader(HttpServletRequest request) {
    return request.getHeader("x-refresh-token");
  }

  public Claims getClaimsFromToken(String token) {
    try {
      return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    } catch (ExpiredJwtException e) {
      log.error("만료된 토큰 입니다.");
      throw e;
    } catch (JwtException e) {
      log.error("유효하지 않은 토큰 입니다.");
      throw e;
    }
  }
}