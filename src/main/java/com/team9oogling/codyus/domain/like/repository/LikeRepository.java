package com.team9oogling.codyus.domain.like.repository;

import com.team9oogling.codyus.domain.like.entity.Like;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByPostIdAndUserId(Long postId, Long userId);


    Page<Like> findAllByUserId(Long userId, Pageable pageable);

    int countByPostId(Long postId);

}
