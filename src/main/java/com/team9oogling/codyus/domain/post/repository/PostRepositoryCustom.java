package com.team9oogling.codyus.domain.post.repository;

import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.entity.SearchType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface PostRepositoryCustom {
    Page<Post> searchPosts(SearchType type, String keyword, Pageable pageable);
    Page<Post> findByCategoryName(@Param("categoryName") String categoryName, Pageable pageable);
}
