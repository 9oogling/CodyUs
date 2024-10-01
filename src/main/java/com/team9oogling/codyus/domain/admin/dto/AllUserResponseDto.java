package com.team9oogling.codyus.domain.admin.dto;

import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.domain.user.entity.UserRole;
import com.team9oogling.codyus.domain.user.entity.UserStatus;
import lombok.Getter;

@Getter
public class AllUserResponseDto {

    private final Long id;
    private final String nickName;
    private final String email;
    private final String phone;
    private final UserRole role;
    private final UserStatus status;
    private final String address;

    public AllUserResponseDto(User user) {
        this.id = user.getId();
        this.nickName = user.getNickname();
        this.email = user.getEmail();
        this.phone = user.getPhoneNumber();
        this.role = user.getRole();
        this.status = user.getStatus();
        this.address = user.getAddress();
    }

}
