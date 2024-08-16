package com.team9oogling.codyus.domain.oauth.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.team9oogling.codyus.domain.oauth.service.KakaoService;
import jakarta.servlet.http.HttpServletResponse;
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
  public String kakaoLogin(@RequestParam String code, HttpServletResponse response)
      throws JsonProcessingException {

    // 1. 카카오 로그인 후 JWT 토큰 생성
    String token = kakaoService.kakaoLogin(code, response);

    // 2. 응답 헤더에 Bearer 추가
    response.setHeader("Authorization", "Bearer " + token);

    // 3. 홈 페이지로 리다이렉트
    return "redirect:/home";
  }

}
