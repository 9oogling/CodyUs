package com.team9oogling.codyus.domain.admin.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class AllUserPageResponseDto {

    private final List<AllUserResponseDto> userResponseDtoList;
    private final int totalPage;
    private final int pageSize;
    private final Long totalElements;

    public AllUserPageResponseDto(List<AllUserResponseDto> userResponseDtoList, int totalPage, int pageSize, Long totalElements) {
        this.userResponseDtoList = userResponseDtoList;
        this.totalPage = totalPage;
        this.pageSize = pageSize;
        this.totalElements = totalElements;
    }
}