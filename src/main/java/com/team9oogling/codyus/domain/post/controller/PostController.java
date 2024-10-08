package com.team9oogling.codyus.domain.post.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team9oogling.codyus.domain.post.dto.PostRequestDto;
import com.team9oogling.codyus.domain.post.dto.PostResponseDto;
import com.team9oogling.codyus.domain.post.entity.SearchType;
import com.team9oogling.codyus.domain.post.service.PostService;
import com.team9oogling.codyus.global.dto.DataResponseDto;
import com.team9oogling.codyus.global.dto.MessageResponseDto;
import com.team9oogling.codyus.global.entity.ResponseFactory;
import com.team9oogling.codyus.global.entity.StatusCode;
import com.team9oogling.codyus.global.security.UserDetailsImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {


    private final PostService postService;

    //게시물 생성
    @PostMapping
    public ResponseEntity<DataResponseDto<PostResponseDto>> savePost(@Valid @RequestPart(value = "request") PostRequestDto requestDto,
                                                                     @RequestPart(value = "image", required = true) List<MultipartFile> images,
                                                                     @RequestPart(value = "productImage", required = true) List<MultipartFile> productImages,
                                                                     @AuthenticationPrincipal UserDetailsImpl userDetails) {
        PostResponseDto responseDto = postService.savePost(requestDto, userDetails, images, productImages);

        return ResponseFactory.created(responseDto, StatusCode.SUCCESS_CREATE_POST);
    }

    //수정
    @PutMapping(value="/{postId}", consumes = "multipart/form-data")
    public ResponseEntity<DataResponseDto<PostResponseDto>> updatePost(@PathVariable Long postId,
                                                                       @RequestPart(value = "request") PostRequestDto requestDto,
                                                                       @RequestPart(value = "image", required = false) List<MultipartFile> images,
                                                                       @RequestPart(value = "productImage", required = false) List<MultipartFile> productImages,
                                                                       @AuthenticationPrincipal UserDetailsImpl userDetails) {
        PostResponseDto responseDto = postService.updatePost(postId, requestDto, images, productImages,userDetails);

        return ResponseFactory.ok(responseDto, StatusCode.SUCCESS_UPDATE_POST);
    }

    //삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<MessageResponseDto> deletePost(@PathVariable Long postId,
                                                         @AuthenticationPrincipal UserDetailsImpl userDetails) {
        postService.deletePost(postId, userDetails);

        return ResponseFactory.ok(StatusCode.SUCCESS_DELETE_POST);
    }

    //게시물 전체조회
    @GetMapping
    public ResponseEntity<DataResponseDto<Page<PostResponseDto>>> getAllPost(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size,
            @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
            @RequestParam(value = "desc", defaultValue = "true") boolean descending) {

        Pageable pageable = PageRequest.of(page -1, size,
                descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending());
        Page<PostResponseDto> posts = postService.findAllPost(pageable);
        return ResponseFactory.ok(posts, StatusCode.SUCCESS_GET_ALLPOST);
    }

    // 게시물 상세 조회
    @GetMapping("/{postId}")
    public ResponseEntity<DataResponseDto<PostResponseDto>> getPost(
            @PathVariable Long postId) {

        PostResponseDto post = postService.getPost(postId);
        return ResponseFactory.ok(post, StatusCode.SUCCESS_GET_POST);
    }

    @GetMapping("/my")
    public ResponseEntity<DataResponseDto<Page<PostResponseDto>>> getMyPosts(
        @RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "4") int size,
		@RequestParam(defaultValue = "createdAt") String sortBy,
        @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<PostResponseDto> myPosts = postService.findMyPosts(pageable, userDetails);

        return ResponseFactory.ok(myPosts, StatusCode.SUCCESS_GET_MYPOST);
    }

    // 게시물 검색
    @GetMapping("/search")
    public ResponseEntity<DataResponseDto<Page<PostResponseDto>>> searchPosts(
            @RequestParam(required = false) SearchType type,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy, // Default sort by field
            @RequestParam(defaultValue = "false") boolean descending) { // Default sort direction) {

        Pageable pageable = PageRequest.of(page-1, size,
                descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending());
        Page<PostResponseDto> posts = postService.searchPosts(type, keyword, pageable);
        return ResponseFactory.ok(posts, StatusCode.SUCCESS_SEARCH_POSTS);
    }

    // 카테고리별 게시물 조회
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<DataResponseDto<Page<PostResponseDto>>> getPostsByCategory(
            @PathVariable String categoryName,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size,
            @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
            @RequestParam(value = "desc", defaultValue = "true") boolean descending) {

        Pageable pageable = PageRequest.of(page, size,
                descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending());

        Page<PostResponseDto> posts;
        if ("RANKING".equals(categoryName)) {
            posts = postService.findPostsByLikes(PageRequest.of(page - 1, size, Sort.by(sortBy).descending()));
        } else {
            posts = postService.findPostsByCategory(categoryName, PageRequest.of(page - 1, size, Sort.by(sortBy).descending()));
        }

        return ResponseFactory.ok(posts, StatusCode.SUCCESS_GET_POSTSBYCATEGORY);
    }

    @GetMapping("/likes")
    public ResponseEntity<DataResponseDto<Page<PostResponseDto>>> getPostsByLikes(Pageable pageable) {
        Page<PostResponseDto> posts = postService.findPostsByLikes(pageable);
        return ResponseFactory.ok(posts, StatusCode.SUCCESS_GET_POSTS_BY_LIKES);
    }




}
