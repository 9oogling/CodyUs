package com.team9oogling.codyus.domain.chatting.dto;

import lombok.Getter;

@Getter
public class UnReadChattingCountResponseDto {

	private final int unReadCount;

	public UnReadChattingCountResponseDto(int unReadCount) {
		this.unReadCount = unReadCount;
	}
}
