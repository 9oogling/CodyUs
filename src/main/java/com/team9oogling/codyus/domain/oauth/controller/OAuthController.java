package com.team9oogling.codyus.domain.oauth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.team9oogling.codyus.domain.oauth.service.KakaoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller
@RequestMapping("/api")
public class OAuthController {

  private final KakaoService kakaoService;

  public OAuthController(KakaoService kakaoService) {
    this.kakaoService = kakaoService;
  }

  @GetMapping("/user/kakao/callback")
  public String kakaoLogin(@RequestParam String code) throws JsonProcessingException {

    // 카카오 로그인 후 JWT 토큰 생성
    String jwtToken = kakaoService.kakaoLogin(code);

    // JWT 토큰을 URL 파라미터로 포함하여 홈 페이지로 리다이렉트
    return "redirect:/home?token=" + jwtToken;
  }
}