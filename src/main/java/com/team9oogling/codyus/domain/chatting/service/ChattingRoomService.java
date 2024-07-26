package com.team9oogling.codyus.domain.chatting.service;

import static com.team9oogling.codyus.global.entity.StatusCode.*;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team9oogling.codyus.domain.chatting.dto.ChattingRoomCreateResponseDto;
import com.team9oogling.codyus.domain.chatting.dto.ChattingRoomResponseDto;
import com.team9oogling.codyus.domain.chatting.entity.ChattingMember;
import com.team9oogling.codyus.domain.chatting.entity.ChattingRoom;
import com.team9oogling.codyus.domain.chatting.entity.MessageOffset;
import com.team9oogling.codyus.domain.chatting.repository.ChattingMemberRepository;
import com.team9oogling.codyus.domain.chatting.repository.ChattingRoomRepository;
import com.team9oogling.codyus.domain.chatting.repository.MessageOffsetRepository;
import com.team9oogling.codyus.domain.chatting.repository.MessageRepositoryCustomImpl;
import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.service.PostService;
import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.global.exception.CustomException;
import com.team9oogling.codyus.global.security.UserDetailsImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChattingRoomService {

	private final ChattingRoomRepository chattingRoomRepository;
	private final ChattingMemberRepository chattingMemberRepository;
	private final MessageOffsetRepository messageOffsetRepository;

	private final MessageRepositoryCustomImpl messageRepositoryCustom;

	private final MessageService messageService;
	private final PostService postService;

	@Transactional
	public ChattingRoomCreateResponseDto createChattingRoom(Long postId, UserDetailsImpl userDetails) {
		User user = userDetails.getUser();
		Post post = postService.findById(postId);

		if (Objects.equals(post.getUser().getId(), user.getId())) {
			throw new CustomException(SAME_USERID_POST_USERID);
		}
		ChattingRoomPostAndUser(postId, user);

		ChattingRoom chattingRoom = new ChattingRoom(post);
		chattingRoomRepository.save(chattingRoom);
		ChattingMember chattingMember = new ChattingMember(user, chattingRoom);
		ChattingMember chattingPostMember = new ChattingMember(post.getUser(), chattingRoom);
		chattingRoom.addMember(chattingMember);
		chattingRoom.addMember(chattingPostMember);
		chattingMemberRepository.save(chattingMember);
		chattingMemberRepository.save(chattingPostMember);

		MessageOffset messageOffset = new MessageOffset(user, chattingRoom);
		MessageOffset messageOffsetPostUser = new MessageOffset(post.getUser(), chattingRoom);
		messageOffsetRepository.save(messageOffset);
		messageOffsetRepository.save(messageOffsetPostUser);

		return new ChattingRoomCreateResponseDto(chattingRoom.getId(), post);
	}

	@Transactional(readOnly = true)
	public Page<ChattingRoomResponseDto> chattingRoomList(UserDetailsImpl userDetails, int page, int size) {
		User user = userDetails.getUser();
		List<ChattingMember> memberList = chattingMemberRepository.findByUser(user);

		List<ChattingRoomResponseDto> responseList = memberList.stream()
			.map(messageRepositoryCustom::findTopMessage)
			.map(responseDto -> {
				MessageOffset messageOffset = messageService.messageOffsetFindById(responseDto.getChattingRoomId(),
					user.getId());
				Integer unReadCount = messageService.unReadCount(responseDto.getChattingMember(),
					messageOffset.getLastReadMessageId());
				return new ChattingRoomResponseDto(responseDto, unReadCount);
			})
			.sorted(Comparator.comparing(ChattingRoomResponseDto::getLastTimestamp, Comparator.nullsLast(Comparator.reverseOrder()))
				.thenComparing(ChattingRoomResponseDto::getChattingRoomId))
			.toList();

		Pageable pageable = PageRequest.of(page-1, size);
		int totalSize = responseList.size();
		int start = (int) pageable.getOffset();
		int end = Math.min(start + pageable.getPageSize(), totalSize);
		List<ChattingRoomResponseDto> pagedList = responseList.subList(start, end);

		return new PageImpl<>(pagedList, pageable, totalSize);
	}

	private void ChattingRoomPostAndUser(Long postId, User user) {
		boolean isChattingRoom = chattingRoomRepository.findByPostId(postId)
			.stream()
			.anyMatch(room -> chattingMemberRepository.existsByChattingRoomAndUser(room, user)
			);
		if (isChattingRoom) {
			throw new CustomException(ALREADY_CHATTINGROOMS_EXISTS);
		}
	}
}
