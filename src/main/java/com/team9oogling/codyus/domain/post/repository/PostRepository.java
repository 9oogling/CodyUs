package com.team9oogling.codyus.domain.post.repository;

import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.entity.PostStatus;
import com.team9oogling.codyus.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {
    Page<Post> findByUser(User user, Pageable pageable);

    Page<Post> findAllByStatusAndCompletedDate(PostStatus status, LocalDate completedDate, Pageable pageable);

    @Query("SELECT p FROM Post p JOIN p.postCategoryMatches pcm WHERE pcm.category.category = :categoryName")
    Page<Post> findByCategoryName(@Param("categoryName") String categoryName, Pageable pageable);  // Pageable 추가

    Page<Post> findAllByUserId(Long userId, Pageable pageable);

}