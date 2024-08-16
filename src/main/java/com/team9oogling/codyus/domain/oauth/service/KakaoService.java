package com.team9oogling.codyus.domain.oauth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team9oogling.codyus.domain.oauth.dto.KakaoUserInfoDto;
import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.domain.user.entity.UserRole;
import com.team9oogling.codyus.domain.user.entity.UserStatus;
import com.team9oogling.codyus.domain.user.repository.UserRepository;
import com.team9oogling.codyus.global.jwt.JwtProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.net.URI;
import java.util.Optional;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j(topic = "KAKAO Login")
@Service
@RequiredArgsConstructor
public class KakaoService {

  @Value("${kakao.api_key}")
  private String clientId;

  @Value("${kakao.redirect_uri}")
  private String redirectUri;

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final RestTemplate restTemplate;
  private final JwtProvider jwtProvider;

  public String kakaoLogin(String code, HttpServletResponse response) throws JsonProcessingException {
    // 1. "인가 코드"로 "액세스 토큰" 요청
    String accessToken = getToken(code);

    // 2. 토큰으로 카카오 API 호출 : "액세스 토큰"으로 "카카오 사용자 정보" 가져오기
    KakaoUserInfoDto kakaoUserInfo = getKakaoUserInfo(accessToken);

    // 3. 필요시 사용자 정보를 저장하거나 업데이트
    User user = saveOrUpdateUser(kakaoUserInfo);

    // 4. JWT 토큰 생성 (Bearer 제거)
    String jwtToken = jwtProvider.createAccessToken(kakaoUserInfo.getEmail(), UserRole.USER);

    // 5. Refresh Token 생성 및 저장
    String refreshToken = jwtProvider.createRefreshToken(kakaoUserInfo.getEmail(), UserRole.USER);
    user.updateRefreshToken(refreshToken);
    userRepository.save(user);

    // 6. JWT 토큰을 쿠키에 저장 (Bearer 없이)
    Cookie accessTokenCookie = new Cookie("Authorization", jwtToken);  // Bearer 제거
    accessTokenCookie.setPath("/");
    accessTokenCookie.setHttpOnly(false); // JavaScript에서 접근 불가하게 설정
    accessTokenCookie.setMaxAge(60 * 60 * 24); // 쿠키 유효 기간: 1일
    response.addCookie(accessTokenCookie);

    // 7. Refresh Token도 필요한 경우 쿠키에 저장 (선택사항)
    Cookie refreshTokenCookie = new Cookie("RefreshToken", refreshToken);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setHttpOnly(false);
    refreshTokenCookie.setMaxAge(60 * 60 * 24 * 7); // 쿠키 유효 기간: 1주일
    response.addCookie(refreshTokenCookie);

    log.info("JWT Token and Refresh Token saved in cookies");

    // 8. JWT 토큰 반환
    return jwtToken;  // JWT 토큰 반환
  }

  private String getToken(String code) throws JsonProcessingException {
    log.info("인가 코드 : " + code);
    // 요청 URL 만들기
    URI uri = UriComponentsBuilder
        .fromUriString("https://kauth.kakao.com")
        .path("/oauth/token")
        .encode()
        .build()
        .toUri();

    // HTTP Header 생성
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

    // HTTP Body 생성
    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("grant_type", "authorization_code");
    body.add("client_id", clientId);
    body.add("redirect_uri", redirectUri);
    body.add("code", code);

    RequestEntity<MultiValueMap<String, String>> requestEntity = RequestEntity
        .post(uri)
        .headers(headers)
        .body(body);

    // HTTP 요청 보내기
    ResponseEntity<String> response = restTemplate.exchange(
        requestEntity,
        String.class
    );

    // HTTP 응답 (JSON) -> 액세스 토큰 파싱
    JsonNode jsonNode = new ObjectMapper().readTree(response.getBody());
    return jsonNode.get("access_token").asText();
  }

  private KakaoUserInfoDto getKakaoUserInfo(String accessToken) throws JsonProcessingException {
    log.info("accessToken : " + accessToken);
    // 요청 URL 만들기
    URI uri = UriComponentsBuilder
        .fromUriString("https://kapi.kakao.com")
        .path("/v2/user/me")
        .encode()
        .build()
        .toUri();

    // HTTP Header 생성
    HttpHeaders headers = new HttpHeaders();
    headers.add("Authorization", "Bearer " + accessToken);
    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

    RequestEntity<MultiValueMap<String, String>> requestEntity = RequestEntity
        .post(uri)
        .headers(headers)
        .body(new LinkedMultiValueMap<>());

    // HTTP 요청 보내기
    ResponseEntity<String> response = restTemplate.exchange(
        requestEntity,
        String.class
    );

    JsonNode jsonNode = new ObjectMapper().readTree(response.getBody());
    Long id = jsonNode.get("id").asLong();
    String email = jsonNode.get("kakao_account")
        .get("email").asText();
    String nickname = jsonNode.get("properties")
        .get("nickname").asText();

    log.info("카카오 사용자 정보: " + email + ", " + nickname);
    return new KakaoUserInfoDto(email, nickname);
  }

  private User saveOrUpdateUser(KakaoUserInfoDto kakaoUserInfo) {
    // UserRepository를 이용해 사용자 정보를 저장하거나 업데이트하는 로직을 구현
    Optional<User> optionalUser = userRepository.findByEmail(kakaoUserInfo.getEmail());
    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      user.updateNickname(kakaoUserInfo.getNickname());
      return userRepository.save(user);
    } else {
      User user = new User(
          kakaoUserInfo.getEmail(),
          kakaoUserInfo.getNickname(),
          passwordEncoder.encode("kakao_default_password"),
          UserRole.USER,
          UserStatus.ACTIVE
      );
      return userRepository.save(user);
    }
  }
}