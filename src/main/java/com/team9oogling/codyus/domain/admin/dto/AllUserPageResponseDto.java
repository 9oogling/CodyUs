package com.team9oogling.codyus.domain.admin.dto;

import com.team9oogling.codyus.domain.user.dto.UserInfoDto;
import lombok.Getter;

import java.util.List;

@Getter
public class AllUserPageResponseDto {

    private final List<AllUserResponseDto> userResponseDtoList;
    private final int totalPage;
    private final int pageSize;

    public AllUserPageResponseDto(List<AllUserResponseDto> userResponseDtoList, int totalPage, int pageSize) {
        this.userResponseDtoList = userResponseDtoList;
        this.totalPage = totalPage;
        this.pageSize = pageSize;
    }
}