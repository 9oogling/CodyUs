package com.team9oogling.codyus.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserQuestionRequestDto {

	@NotBlank(message = "이름은 필수 입력 항목입니다.")
	private String name;

	@NotBlank(message = "이메일은 필수 입력 항목입니다.")
	@Email(message = "이메일 형식이 올바르지 않습니다.")
	private String email;

	@NotBlank(message = "문의 내용은 필수 입력 항목입니다.")
	@Size(max = 500, message = "문의 내용은 500자 이내로 입력해야 합니다.")
	private String question;

}
