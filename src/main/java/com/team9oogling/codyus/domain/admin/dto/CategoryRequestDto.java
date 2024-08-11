package com.team9oogling.codyus.domain.admin.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CategoryRequestDto {

  @NotBlank
  private String CategoryName;

}
