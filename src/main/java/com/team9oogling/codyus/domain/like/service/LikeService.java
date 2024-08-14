package com.team9oogling.codyus.domain.like.service;

import com.team9oogling.codyus.domain.like.dto.LikedPostResponseDto;
import com.team9oogling.codyus.domain.like.entity.Like;
import com.team9oogling.codyus.domain.like.repository.LikeRepository;
import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.repository.PostRepository;
import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.domain.user.repository.UserRepository;
import com.team9oogling.codyus.global.entity.StatusCode;
import com.team9oogling.codyus.global.exception.CustomException;
import com.team9oogling.codyus.global.security.UserDetailsImpl;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public LikeService(LikeRepository likeRepository, PostRepository postRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void addLike(Long postId, UserDetailsImpl userDetails) {
        Post post = postRepository.findById(postId).orElseThrow(()
                -> new CustomException(StatusCode.NOT_FOUND_POST));

        User user = userDetails.getUser();

        if (post.getUser().getId().equals(user.getId())) {
            throw new CustomException(StatusCode.CANNOT_LIKE_YOURS);
        }
        Optional<Like> checkLike = likeRepository.findByPostIdAndUserId(postId, user.getId());

        if (checkLike.isPresent()) {
            throw new CustomException(StatusCode.ALREADY_EXIST_LIKE);
        } else {
            Like like = new Like(user, post);

            likeRepository.save(like);
        }
    }

    @Transactional
    public void unLike(Long postId, UserDetailsImpl userDetails) {
        User user = userDetails.getUser();


        Like checkLike = likeRepository.findByPostIdAndUserId(postId, user.getId()).orElseThrow(()
                -> new CustomException(StatusCode.NOT_FOUND_LIKE));

        likeRepository.delete(checkLike);
    }



    // 사용자가 좋아요 한 목록 조회
    @Transactional
    public Page<LikedPostResponseDto> getLikedPosts(UserDetailsImpl userDetails, Pageable pageable) {
        User user = userDetails.getUser();

        Page<Like> likePage = likeRepository.findAllByUserId(user.getId(), pageable);

        return likePage.map(like -> new LikedPostResponseDto(like.getPost()));
    }

    @Transactional
    public int likecount(Long postId){
        return likeRepository.countByPostId(postId);
    }

    public boolean isLiked(Long postId, UserDetailsImpl userDetails) {
        User user = userDetails.getUser();

        return likeRepository.findByPostIdAndUserId(postId, user.getId()).isPresent();

    }

}
