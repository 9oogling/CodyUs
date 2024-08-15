package com.team9oogling.codyus.domain.user.controller;

import com.team9oogling.codyus.domain.user.dto.FindEmailByPhoneNumberResponseDto;
import com.team9oogling.codyus.domain.user.dto.UpdateProfileAddressRequestDto;
import com.team9oogling.codyus.domain.user.dto.UpdateProfilePasswordRequestDto;
import com.team9oogling.codyus.domain.user.dto.UpdateProfilePhoneNumberRequestDto;
import com.team9oogling.codyus.domain.user.dto.UserInfoDto;
import com.team9oogling.codyus.domain.user.dto.UserSignupRequestDto;
import com.team9oogling.codyus.domain.user.dto.UserWithDrawalRequestDto;
import com.team9oogling.codyus.domain.user.entity.UserRole;
import com.team9oogling.codyus.domain.user.service.UserService;
import com.team9oogling.codyus.global.dto.DataResponseDto;
import com.team9oogling.codyus.global.dto.MessageResponseDto;
import com.team9oogling.codyus.global.entity.ResponseFactory;
import com.team9oogling.codyus.global.entity.StatusCode;
import com.team9oogling.codyus.global.security.UserDetailsImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  // 회원 관련 정보 받기
  @GetMapping("/user-info")
  @ResponseBody
  public ResponseEntity<DataResponseDto<UserInfoDto>> getUserInfo(
      @AuthenticationPrincipal UserDetailsImpl userDetails) {
    String email = userDetails.getUser().getEmail();
    UserRole role = userDetails.getUser().getRole();
    String nickName = userDetails.getUser().getNickname();
    String phoneNumber = userDetails.getUser().getPhoneNumber();
    String address = userDetails.getUser().getAddress();
    boolean isAdmin = (role == UserRole.ADMIN);

    UserInfoDto responseDto = new UserInfoDto(email, isAdmin, nickName, phoneNumber, address);

    return ResponseFactory.ok(responseDto, StatusCode.SUCCESS_GET_USERINFO);
  }

  @PostMapping("/users/signup")
  public ResponseEntity<MessageResponseDto> signup(
      @Valid @RequestBody UserSignupRequestDto requestDto) {
    userService.signup(requestDto);

    return ResponseFactory.created(StatusCode.SUCCESS_SIGNUP);
  }

  @PostMapping("/users/logout")
  public ResponseEntity<?> logout(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    userService.logout(userDetails);

    return ResponseFactory.noContent();
  }

  @PostMapping("/users/token/refresh")
  public ResponseEntity<MessageResponseDto> refreshToken(HttpServletRequest request) {
    HttpHeaders headers = userService.refreshToken(request);

    return ResponseFactory.ok(StatusCode.SUCCESS_REFRESH_TOKEN, headers);
  }

  @PutMapping("/users/withdrawal")
  public ResponseEntity<MessageResponseDto> withdrawal(
      @AuthenticationPrincipal UserDetailsImpl userDetails,
      @Valid @RequestBody UserWithDrawalRequestDto requestDto) {
    userService.withdrawal(requestDto, userDetails);

    return ResponseFactory.ok(StatusCode.SUCCESS_WITHDRAWAL);
  }

  @PutMapping("/profile/password/my")
  public ResponseEntity<MessageResponseDto> updatePassword(
      @AuthenticationPrincipal UserDetailsImpl userDetails,
      @Valid @RequestBody UpdateProfilePasswordRequestDto requestDto) {
    userService.updatePassword(requestDto, userDetails);

    return ResponseFactory.ok(StatusCode.SUCCESS_UPDATE_PASSWORD);
  }

  @PutMapping("/profile/address/my")
  public ResponseEntity<MessageResponseDto> updateAddress(
      @AuthenticationPrincipal UserDetailsImpl userDetails,
      @RequestBody UpdateProfileAddressRequestDto requestDto) {
    userService.updateAddress(requestDto, userDetails);

    return ResponseFactory.ok(StatusCode.SUCCESS_UPDATE_ADDRESS);
  }

  @PutMapping("/profile/phone/my")
  public ResponseEntity<MessageResponseDto> updatePhoneNumber(
      @AuthenticationPrincipal UserDetailsImpl userDetails,
      @Valid @RequestBody UpdateProfilePhoneNumberRequestDto requestDto) {
    userService.updatePhoneNumber(requestDto, userDetails);

    return ResponseFactory.ok(StatusCode.SUCCESS_UPDATE_PHONE_NUMBER);
  }

  @GetMapping("/users/email/find-by-phone")
  public ResponseEntity<DataResponseDto<FindEmailByPhoneNumberResponseDto>> FindEmail(
      @RequestParam String phoneNumber) {

    FindEmailByPhoneNumberResponseDto responseDto = userService.FindEmail(phoneNumber);

    return ResponseFactory.ok(responseDto, StatusCode.SUCCESS_FIND_EMAIL);
  }

  @GetMapping("/users/exists-by-email")
  public ResponseEntity<DataResponseDto<Boolean>> checkEmailExists(@RequestParam String email) {
    boolean exists = userService.checkEmailExists(email);

    return ResponseFactory.ok(exists, StatusCode.SUCCESS_CHECK_EMAIL);
  }

}
