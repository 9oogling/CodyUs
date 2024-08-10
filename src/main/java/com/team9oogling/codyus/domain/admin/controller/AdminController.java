package com.team9oogling.codyus.domain.admin.controller;

import com.team9oogling.codyus.domain.admin.dto.CategoryRequestDto;
import com.team9oogling.codyus.domain.admin.service.AdminService;
import com.team9oogling.codyus.global.dto.MessageResponseDto;
import com.team9oogling.codyus.global.entity.ResponseFactory;
import com.team9oogling.codyus.global.entity.StatusCode;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

  private AdminService adminService;

  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  @PostMapping("/category")
  public ResponseEntity<MessageResponseDto> AddCategory(
      @Valid @RequestBody CategoryRequestDto requestDto) {
    adminService.addCategory(requestDto);

    return ResponseFactory.created(StatusCode.SUCCESS_CREATE_CATEGORY);
  }
}
