package com.team9oogling.codyus.domain.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team9oogling.codyus.domain.user.dto.UserQuestionRequestDto;
import com.team9oogling.codyus.domain.user.service.UserQuestionService;
import com.team9oogling.codyus.global.dto.MessageResponseDto;
import com.team9oogling.codyus.global.entity.ResponseFactory;
import com.team9oogling.codyus.global.entity.StatusCode;
import com.team9oogling.codyus.global.security.UserDetailsImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserQuestionController {

	private final UserQuestionService userQuestionService;

	@PostMapping("/help")
	public ResponseEntity<MessageResponseDto> createUserQuestion(@RequestBody @Valid final UserQuestionRequestDto requestDto,
		@AuthenticationPrincipal UserDetailsImpl userDetails) {
		userQuestionService.createUserQuestion(requestDto, userDetails);
		return ResponseFactory.created(StatusCode.SUCCESS_CREATE_USER_QUESTION);
	}
}
