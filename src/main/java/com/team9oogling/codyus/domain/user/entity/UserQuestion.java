package com.team9oogling.codyus.domain.user.entity;

import com.team9oogling.codyus.domain.user.dto.UserQuestionRequestDto;
import com.team9oogling.codyus.global.entity.Timestamped;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class UserQuestion extends Timestamped {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String email;

	@ManyToOne
	private User user;

	@Column(length = 500)
	private String question;
	private boolean isAnswer;

	public UserQuestion(User user, UserQuestionRequestDto requestDto) {
		this.name = requestDto.getName();
		this.user = user;
		this.email = requestDto.getEmail();
		this.question = requestDto.getQuestion();
		this.isAnswer = false;
	}
}
