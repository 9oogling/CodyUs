package com.team9oogling.codyus.domain.admin.controller;

import com.team9oogling.codyus.domain.admin.dto.AllUserPageResponseDto;
import com.team9oogling.codyus.domain.admin.dto.CategoryRequestDto;
import com.team9oogling.codyus.domain.admin.dto.PostPageResponseDto;
import com.team9oogling.codyus.domain.admin.service.AdminService;
import com.team9oogling.codyus.global.dto.DataResponseDto;
import com.team9oogling.codyus.global.dto.MessageResponseDto;
import com.team9oogling.codyus.global.entity.ResponseFactory;
import com.team9oogling.codyus.global.entity.StatusCode;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/admin")
public class AdminController {


    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // 카테고리 생성 api
    @PostMapping("/category")
    public ResponseEntity<MessageResponseDto> AddCategory(
            @Valid @RequestBody CategoryRequestDto requestDto) {
        adminService.addCategory(requestDto);

        return ResponseFactory.created(StatusCode.SUCCESS_CREATE_CATEGORY);
    }

    // 가입된 사용자 전체 조회
    @GetMapping("/users")
    public ResponseEntity<DataResponseDto<AllUserPageResponseDto>> getAllUsers(
            @RequestParam(required = false, value = "page", defaultValue = "1") int page) {
        AllUserPageResponseDto allUsers = adminService.getAllUsers(page - 1);

        return ResponseFactory.ok(allUsers, StatusCode.SUCCESS_GET_ALLUSERS);
    }

    // 관리자 권한 사용자 게시물 삭제
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<MessageResponseDto> deletePostByUserAndPostId(
            @PathVariable Long postId) {
        adminService.deletePostByUserAndPostId(postId);

        return ResponseFactory.ok(StatusCode.SUCCESS_DELETE_POST);
    }

    // 사용자별 게시물 조회
    @GetMapping("/users/{userId}/posts")
    public ResponseEntity<DataResponseDto<PostPageResponseDto>> getAllPostsByUser(
            @PathVariable Long userId,
            @RequestParam(required = false, value = "page", defaultValue = "1") int page) {
        PostPageResponseDto postPageResponseDto = adminService.getAllPostsByUser(userId, page - 1);

        return ResponseFactory.ok(postPageResponseDto, StatusCode.SUCCESS_GET_USER_POST);
    }

    // 일자별 거래 완료 조회
    @GetMapping("/posts/status")
    public ResponseEntity<DataResponseDto<PostPageResponseDto>> getPostsByStatus(
            @RequestParam LocalDate completedDate,
            @RequestParam(required = false, value = "page", defaultValue = "1") int page) {

        PostPageResponseDto postPageResponseDto = adminService.getPostsByStatus(completedDate, page - 1);

        return ResponseFactory.ok(postPageResponseDto, StatusCode.SUCCESS_GET_POSTS_BY_STATUS);
    }
}
