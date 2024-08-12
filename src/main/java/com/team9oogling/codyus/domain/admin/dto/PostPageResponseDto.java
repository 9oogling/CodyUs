package com.team9oogling.codyus.domain.admin.dto;

import com.team9oogling.codyus.domain.post.dto.PostResponseDto;
import lombok.Getter;

import java.util.List;

@Getter
public class PostPageResponseDto {
    private final List<PostResponseDto> postResponseDtoList;
    private final int totalPages;
    private final Long totalElements;
    private final int size;

    public PostPageResponseDto(List<PostResponseDto> postResponseDtoList, int totalPages, Long totalElements, int size) {
        this.postResponseDtoList = postResponseDtoList;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.size = size;
    }
}
