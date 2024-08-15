package com.team9oogling.codyus.global.runner;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.team9oogling.codyus.domain.chatting.entity.ChattingMember;
import com.team9oogling.codyus.domain.chatting.entity.ChattingRoom;
import com.team9oogling.codyus.domain.chatting.entity.MessageOffset;
import com.team9oogling.codyus.domain.chatting.repository.ChattingMemberRepository;
import com.team9oogling.codyus.domain.chatting.repository.ChattingRoomRepository;
import com.team9oogling.codyus.domain.chatting.repository.MessageOffsetRepository;
import com.team9oogling.codyus.domain.like.entity.Like;
import com.team9oogling.codyus.domain.like.repository.LikeRepository;
import com.team9oogling.codyus.domain.post.entity.Category;
import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.entity.SaleType;
import com.team9oogling.codyus.domain.post.repository.CategoryRepository;
import com.team9oogling.codyus.domain.post.repository.PostRepository;
import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.domain.user.entity.UserRole;
import com.team9oogling.codyus.domain.user.entity.UserStatus;
import com.team9oogling.codyus.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class dummyDataRunner implements CommandLineRunner {

	private final PasswordEncoder passwordEncoder;

	private final UserRepository userRepository;
	private final CategoryRepository categoryRepository;
	private final PostRepository postRepository;
	private final LikeRepository likeRepository;
	private final ChattingMemberRepository chattingMemberRepository;
	private final ChattingRoomRepository chattingRoomRepository;
	private final MessageOffsetRepository messageOffsetRepository;

	private static final int USER_COUNT = 10;
	private static final int POST_COUNT = 100;

	// true 면 실행 false 면 run 실행하지않음
	private static final boolean RUN = false;

	@Override
	@Transactional
	public void run(String... args) throws Exception {

		if (!RUN) {
			return;
		}
		List<User> users = new ArrayList<>();

		String encode = passwordEncoder.encode("Qwer1234@");
		for (int i = 0; i < USER_COUNT; i++) {
			users.add(new User("user" + i + "@email.com", i + "번째", encode, UserRole.USER, UserStatus.ACTIVE));
		}

		userRepository.saveAll(users);
		List<Category> categories = new ArrayList<>();

		Category categoryOne = new Category();
		categoryOne.addCategory("MAN");
		Category categoryTwo = new Category();
		categoryTwo.addCategory("SUMMER");
		categoryRepository.save(categoryOne);
		categoryRepository.save(categoryTwo);

		categories.add(categoryOne);
		categories.add(categoryTwo);

		List<Post> postAll = new ArrayList<>();
		List<Post> posts = new ArrayList<>();

		for (User user : users) {
			List<Like> likes = new ArrayList<>();
			for (Post post : posts) {
				likes.add(new Like(user, post));
			}
			likeRepository.saveAll(likes);
			posts = new ArrayList<>();
			for (int i = 0; i < POST_COUNT; i++) {
				Post post = new Post("title = " + i, "content" + i, 10000, (i % 2 == 0 ? SaleType.NEW : SaleType.USED),
					"#랜덤", user, categories);
				posts.add(post);
				postAll.add(post);
				new ChattingRoom(post);
			}
			postRepository.saveAll(posts);
		}

		List<MessageOffset> messageOffsets = new ArrayList<>();
		for (Post post : postAll) {
			for (User user : users) {
				if (!Objects.equals(post.getUser().getId(), user.getId())) {
					ChattingRoom chattingRoom = new ChattingRoom(post);
					ChattingMember chattingMember = new ChattingMember(user, chattingRoom);
					ChattingMember chattingMember2 = new ChattingMember(post.getUser(), chattingRoom);

					chattingRoomRepository.save(chattingRoom);
					chattingMemberRepository.save(chattingMember);
					chattingMemberRepository.save(chattingMember2);
					MessageOffset messageOffset = new MessageOffset(user, chattingRoom);
					MessageOffset messageOffset2 = new MessageOffset(chattingRoom.getPost().getUser(), chattingRoom);
					messageOffsets.add(messageOffset);
					messageOffsets.add(messageOffset2);
				}
			}
		}
		messageOffsetRepository.saveAll(messageOffsets);
	}
}
