package com.team9oogling.codyus.domain.admin.service;

import com.team9oogling.codyus.domain.admin.dto.CategoryRequestDto;
import com.team9oogling.codyus.domain.post.entity.Category;
import com.team9oogling.codyus.domain.post.repository.CategoryRepository;
import com.team9oogling.codyus.global.entity.StatusCode;
import com.team9oogling.codyus.global.exception.CustomException;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

  private final CategoryRepository categoryRepository;

  public AdminService(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  @Transactional
  public void addCategory(CategoryRequestDto requestDto) {

    Optional<Category> category = categoryRepository.findByCategory(requestDto.getCategoryName());
    if (category.isPresent()) {
      throw new CustomException(StatusCode.ALREADY_EXIST_CATEGORY);
    } else {
      Category newCategory = new Category();
      newCategory.addCategory(requestDto.getCategoryName());

      categoryRepository.save(newCategory);
    }
  }

}
