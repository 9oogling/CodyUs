package com.team9oogling.codyus.domain.admin.controller;

import com.team9oogling.codyus.domain.admin.dto.AllUserPageResponseDto;
import com.team9oogling.codyus.domain.admin.dto.CategoryRequestDto;
import com.team9oogling.codyus.domain.admin.service.AdminService;
import com.team9oogling.codyus.domain.post.dto.PostResponseDto;
import com.team9oogling.codyus.global.dto.DataResponseDto;
import com.team9oogling.codyus.global.dto.MessageResponseDto;
import com.team9oogling.codyus.global.entity.ResponseFactory;
import com.team9oogling.codyus.global.entity.StatusCode;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {


  private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/category")
    public ResponseEntity<MessageResponseDto> AddCategory(
            @Valid @RequestBody CategoryRequestDto requestDto) {
        adminService.addCategory(requestDto);

        return ResponseFactory.created(StatusCode.SUCCESS_CREATE_CATEGORY);
    }

    // 가입된 사용자 전체 조회
    @PreAuthorize("hasRole('ADMIN')") // ADMIN 역할을 가진 사용자만 접근 가능
    @GetMapping("/users")
    public ResponseEntity<DataResponseDto<AllUserPageResponseDto>> getAllUsers(
            @RequestParam(required = false, value = "page", defaultValue = "0") Integer page) {
        AllUserPageResponseDto allUsers = adminService.getAllUsers(page);

        return ResponseFactory.ok(allUsers, StatusCode.SUCCESS_GET_ALLUSERS);
    }

    // 관리자 권한으로 사용자 게시물 삭제
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{userId}/posts/{postId}")
    public ResponseEntity<MessageResponseDto> deletePostByUserAndPostId(@PathVariable Long userId,
                                                                        @PathVariable Long postId) {
        adminService.deletePostByUserAndPostId(userId, postId);

        return ResponseFactory.ok(StatusCode.SUCCESS_DELETE_POST);
    }

    // 사용자별 게시물 조회
//    @PreAuthorize("hasRole('ADMIN')")
//    @GetMapping("/users/{userId}/posts")
//    public ResponseEntity<DataResponseDto<List<AllUserPageResponseDto>>> getAllPostsByUser(@PathVariable Long userId) {
//
//        List<AllUserPageResponseDto> allPostsByUser = adminService.getAllPostsByUser(userId);
//
//        return ResponseFactory.ok(allPostsByUser, StatusCode.SUCCESS_GET_USER_POST);
//    }

    // 일자별 거래 완료 조회
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/posts/status")
    public ResponseEntity<DataResponseDto<List<PostResponseDto>>> getPostsByStatus(
            @RequestParam LocalDate completedDate
    ) {
        List<PostResponseDto> posts = adminService.getPostsByStatus(completedDate);

        return ResponseFactory.ok(posts, StatusCode.SUCCESS_GET_POSTS_BY_STATUS);
    }
}
