package com.team9oogling.codyus.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team9oogling.codyus.domain.user.entity.UserQuestion;

public interface UserQuestionRepository extends JpaRepository<UserQuestion, Long> {
}
