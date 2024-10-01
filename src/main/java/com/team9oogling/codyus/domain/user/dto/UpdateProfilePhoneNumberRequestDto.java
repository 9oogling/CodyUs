package com.team9oogling.codyus.domain.user.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class UpdateProfilePhoneNumberRequestDto {

  @Pattern(regexp = "^010-\\d{4}-\\d{4}$", message = "올바른 휴대폰 번호가 아닙니다.")
  private String phoneNumber;

}
