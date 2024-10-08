package com.team9oogling.codyus.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UserWithDrawalRequestDto {

  @NotBlank(message = "비밀번호를 입력해주세요.")
  private String password;

}
