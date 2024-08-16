package com.team9oogling.codyus.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserInfoDto {

	String username;
	boolean isAdmin;
	String nickName;
	String phoneNumber;
	String address;
}