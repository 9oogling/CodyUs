package com.team9oogling.codyus.domain.user.dto;

import com.team9oogling.codyus.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FindEmailByPhoneNumberResponseDto {

  private String email;

  public FindEmailByPhoneNumberResponseDto(User user) {
    this.email = user.getEmail();
  }

}
