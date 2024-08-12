package com.team9oogling.codyus.domain.chatting.dto;

import lombok.Getter;

@Getter
public class ChattingRoomCreateResponseDto {
	private final Long ChattingRoomId;

	public ChattingRoomCreateResponseDto(final Long chattingRoomId) {
		this.ChattingRoomId = chattingRoomId;
	}
}
