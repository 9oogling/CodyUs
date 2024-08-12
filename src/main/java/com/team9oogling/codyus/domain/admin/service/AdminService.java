package com.team9oogling.codyus.domain.admin.service;

import com.team9oogling.codyus.domain.admin.dto.AllUserPageResponseDto;
import com.team9oogling.codyus.domain.admin.dto.AllUserResponseDto;
import com.team9oogling.codyus.domain.admin.dto.CategoryRequestDto;
import com.team9oogling.codyus.domain.post.dto.PostResponseDto;
import com.team9oogling.codyus.domain.post.entity.Category;
import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.entity.PostStatus;
import com.team9oogling.codyus.domain.post.repository.CategoryRepository;
import com.team9oogling.codyus.domain.post.repository.PostRepository;
import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.domain.user.repository.UserRepository;
import com.team9oogling.codyus.global.entity.StatusCode;
import com.team9oogling.codyus.global.exception.CustomException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional
    public void addCategory(CategoryRequestDto requestDto) {

        Optional<Category> category = categoryRepository.findByCategory(requestDto.getCategoryName());
        if (category.isPresent()) {
            throw new CustomException(StatusCode.ALREADY_EXIST_CATEGORY);
        } else {
            Category newCategory = new Category();
            newCategory.addCategory(requestDto.getCategoryName());

            categoryRepository.save(newCategory);
        }
    }

    // 가입된 사용자 전체 조회
    public AllUserPageResponseDto getAllUsers(int page) {

        Pageable pageable = PageRequest.of(page, 10);
        Page<User> userPage = userRepository.findAll(pageable);

        List<AllUserResponseDto> userResponseDtoList = userPage.stream()
                .map(AllUserResponseDto::new).toList();

        return new AllUserPageResponseDto(userResponseDtoList,userPage.getTotalPages(),userPage.getSize());
    }

    // 관리자 권한으로 유저 게시물 삭제
    @Transactional
    public void deletePostByUserAndPostId(Long userId, Long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);

        if (postOptional.isPresent()) {
            Post post = postOptional.get();

            if (post.getUser().getId().equals(userId)) {
                postRepository.delete(post);

            } else {
                throw new CustomException(StatusCode.NOT_MATCH_USERID_AND_POSTID);
            }

        } else {
            throw new CustomException(StatusCode.NOT_FOUND_POST);
        }
    }
//    // 사용자별 게시물 조회
//    public List<AllUserPageResponseDto> getAllPostsByUser(Long userId) {
//
//        List<Post> posts = postRepository.findByUserId(userId);
//
//        return posts.stream()
//                .map(post -> new AllUserPageResponseDto(
//                        post.getId(),
//                        post.getTitle(),
//                        post.getContent()))
//                .collect(Collectors.toList());
//    }

    // 일자별 거래 완료 조회
    public List<PostResponseDto> getPostsByStatus(LocalDate completedDate) {

        if (completedDate == null) {
            throw new CustomException(StatusCode.NOT_NULL_COMPLETED_DATE);
        }

        List<Post> posts = postRepository.findByStatusAndCompletedDate(PostStatus.COMPLETE, completedDate);

        if (posts == null) {
            throw new CustomException(StatusCode.NOT_FOUND_POST);
        }
        return posts.stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }
}