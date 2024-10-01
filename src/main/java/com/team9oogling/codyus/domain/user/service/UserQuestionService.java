package com.team9oogling.codyus.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team9oogling.codyus.domain.user.dto.UserQuestionRequestDto;
import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.domain.user.entity.UserQuestion;
import com.team9oogling.codyus.domain.user.repository.UserQuestionRepository;
import com.team9oogling.codyus.global.security.UserDetailsImpl;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserQuestionService {

	private final UserQuestionRepository userQuestionRepository;

	@Transactional
	public void createUserQuestion(UserQuestionRequestDto requestDto, UserDetailsImpl userDetails) {
		User user = userDetails.getUser();
		userQuestionRepository.save(new UserQuestion(user, requestDto));
	}
}
