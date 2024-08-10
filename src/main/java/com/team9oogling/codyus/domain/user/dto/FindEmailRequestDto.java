package com.team9oogling.codyus.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindEmailRequestDto {

  @NotBlank(message = "휴대폰번호를 입력해주세요.")
  private String phoneNumber;

}
