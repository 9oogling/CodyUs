package com.team9oogling.codyus.domain.post.service;


import com.team9oogling.codyus.domain.post.dto.PostRequestDto;
import com.team9oogling.codyus.domain.post.dto.PostResponseDto;
import com.team9oogling.codyus.domain.post.entity.Category;
import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.entity.SearchType;
import com.team9oogling.codyus.domain.post.repository.CategoryRepository;
import com.team9oogling.codyus.domain.post.repository.PostRepository;
import com.team9oogling.codyus.domain.post.repository.PostRepositoryImpl;
import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.domain.user.repository.UserRepository;
import com.team9oogling.codyus.global.entity.StatusCode;
import com.team9oogling.codyus.global.exception.CustomException;
import com.team9oogling.codyus.global.security.UserDetailsImpl;
import com.team9oogling.codyus.upload.AwsS3Uploader;
import com.team9oogling.codyus.upload.ImageType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostRepositoryImpl postRepositoryImpl;
    private final CategoryRepository categoryRepository;
    private final AwsS3Uploader awsS3Uploader;

    @Transactional
    public PostResponseDto savePost(PostRequestDto requestDto, UserDetailsImpl userDetails, List<MultipartFile> images) {
        User user = userDetails.getUser();

        Category category = categoryRepository.findByCategory(requestDto.getCategoryName())
                .orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_CATEGORY));

        Post post = new Post(requestDto.getTitle(), requestDto.getContent(), requestDto.getPrice(),
                requestDto.getSaleType(), requestDto.getHashtags(), user, category);
        post = postRepository.save(post);

        awsS3Uploader.uploadImage(images, ImageType.POST, post.getId());

        return new PostResponseDto(post);
    }

    @Transactional
    public PostResponseDto updatePost(Long postId, PostRequestDto requestDto, UserDetailsImpl userDetails) {
        User user = userDetails.getUser();
        Post post = findById(postId);
        checkUserSame(post, user);
        post.update(requestDto.getTitle(), requestDto.getContent(), requestDto.getPrice(),
                requestDto.getSaleType(), requestDto.getHashtags(), user, requestDto.getCategoryName());

        return new PostResponseDto(post);
    }

    @Transactional(readOnly = true)
    public void deletePost(Long postId, UserDetailsImpl userDetails) {
        User user = userDetails.getUser();
        Post post = findById(postId);
        checkUserSame(post, user);
        postRepository.delete(post);

    }

    public List<PostResponseDto> findAllPost(int page, int size) {
        Page<Post> postsPage = postRepository.findAll(PageRequest.of(page, size));
        return postsPage.stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }


    public PostResponseDto getPost(Long postId) {
        Post post = findById(postId);

        return new PostResponseDto(post);
    }

    public Post findById(Long postId) {
        return postRepository.findById(postId).orElseThrow(
                () -> new CustomException(StatusCode.NOT_FOUND_POST));
    }

    private void checkUserSame(Post post, User user) {
        if (!post.getUser().getId().equals(user.getId())) {
            throw new CustomException(StatusCode.UNAUTHORIZED);
        }
    }


    public Page<PostResponseDto> searchPosts(SearchType type, String keyword, int page, int size,
                                             String sortBy, boolean descending) {
        //검색 타입이나 검색어가 비어있는 경우
        if (type == null || keyword == null || keyword.trim().isEmpty()) {
            throw new CustomException(StatusCode.INVALID_SEARCH_QUERY);
        }

        Sort.Direction direction = descending ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        //검색 수행
        Page<Post> postPage = postRepository.searchPosts(type, keyword, pageable);

        // 검색 결과가 없을 때 예외 처리
        if (postPage.isEmpty()) {
            throw new CustomException(StatusCode.NOT_FOUND_SEARCH);
        }

        // Post 엔티티를 PostResponseDto로 변환
        return postPage.map(PostResponseDto::new);
    }

    public List<PostResponseDto> findMyPosts(UserDetailsImpl userDetails) {
        User user = userDetails.getUser();

        List<Post> posts = postRepository.findByUser(user);
        return posts.stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void addCategoryIfNotExists(CategoryRepository categoryRepository, String categoryName) {
        categoryRepository.findByCategory(categoryName).orElseGet(() -> {
            Category category = new Category();
            category.addCategory(categoryName);
            return categoryRepository.save(category);
        });
    }
}
