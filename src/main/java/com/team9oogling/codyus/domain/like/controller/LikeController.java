package com.team9oogling.codyus.domain.like.controller;

import com.team9oogling.codyus.domain.like.dto.LikedPostResponseDto;
import com.team9oogling.codyus.domain.like.service.LikeService;
import com.team9oogling.codyus.global.dto.DataResponseDto;
import com.team9oogling.codyus.global.security.UserDetailsImpl;
import com.team9oogling.codyus.global.dto.MessageResponseDto;
import com.team9oogling.codyus.global.entity.ResponseFactory;
import com.team9oogling.codyus.global.entity.StatusCode;
import com.team9oogling.codyus.global.security.UserDetailsImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class LikeController {
    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{postId}/likes")
    public ResponseEntity<MessageResponseDto> addLike(@PathVariable Long postId,
                                                      @AuthenticationPrincipal UserDetailsImpl userDetails) {
        likeService.addLike(postId, userDetails);

        return ResponseFactory.created(StatusCode.SUCCESS_ADD_LIKE);
    }

    @DeleteMapping("/{postId}/likes")
    public ResponseEntity<MessageResponseDto> unLike(@PathVariable Long postId,
                                                     @AuthenticationPrincipal UserDetailsImpl userDetails) {
        likeService.unLike(postId, userDetails);

        return ResponseFactory.ok(StatusCode.SUCCESS_DELETE_LIKE);
    }


    //사용자가 좋아요 한 목록 조회
    @GetMapping("/likes/my")
    public ResponseEntity<DataResponseDto<Page<LikedPostResponseDto>>> getLikedPosts(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            System.out.println("Authentication is null");
        } else {
            System.out.println("Authentication: " + authentication.getName());
            System.out.println("Authorities: " + authentication.getAuthorities());
        }

        Pageable pageable = PageRequest.of(page,size);
        Page<LikedPostResponseDto> likedPosts = likeService.getLikedPosts(userDetails,pageable);

        return ResponseFactory.ok(likedPosts, StatusCode.SUCCESS_GET_LIKE);
    }

    @GetMapping("/{postId}/likes/count")
    public ResponseEntity<DataResponseDto<Integer>> getLikeCount(@PathVariable Long postId) {
        int likeCount = likeService.likecount(postId);
        return ResponseFactory.ok(likeCount, StatusCode.SUCCESS_GET_LIKECOUNT);

    }

    @GetMapping("/{postId}/likes/status")
    public ResponseEntity<DataResponseDto<Boolean>> getLikeStatus(@PathVariable Long postId,
                                                                  @AuthenticationPrincipal UserDetailsImpl userDetails) {
        boolean isLiked = likeService.isLiked(postId, userDetails);
        return ResponseFactory.ok(isLiked, StatusCode.SUCCESS_GET_LIKESTATUS);
    }




}
