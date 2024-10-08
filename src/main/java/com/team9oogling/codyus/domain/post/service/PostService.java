package com.team9oogling.codyus.domain.post.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.team9oogling.codyus.domain.post.dto.PostRequestDto;
import com.team9oogling.codyus.domain.post.dto.PostResponseDto;
import com.team9oogling.codyus.domain.post.entity.Category;
import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.entity.PostImage;
import com.team9oogling.codyus.domain.post.entity.SearchType;
import com.team9oogling.codyus.domain.post.repository.CategoryRepository;
import com.team9oogling.codyus.domain.post.repository.PostImageRepository;
import com.team9oogling.codyus.domain.post.repository.PostRepository;
import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.global.entity.StatusCode;
import com.team9oogling.codyus.global.exception.CustomException;
import com.team9oogling.codyus.global.security.UserDetailsImpl;
import com.team9oogling.codyus.upload.AwsS3Uploader;
import com.team9oogling.codyus.upload.ImageType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final AwsS3Uploader awsS3Uploader;
    private final PostImageRepository postImageRepository;

    @Transactional
    public PostResponseDto savePost(PostRequestDto requestDto, UserDetailsImpl userDetails, List<MultipartFile> images, List<MultipartFile> productImages) {
        User user = userDetails.getUser();

        // 여러 카테고리명을 받아와서 매핑
        List<Category> categories = requestDto.getCategoryName().stream()
            .map(categoryName -> categoryRepository.findByCategory(categoryName)
                .orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_CATEGORY)))
            .collect(Collectors.toList());

        // Post 엔티티에 여러 카테고리를 전달
        final Post post = new Post(requestDto.getTitle(), requestDto.getContent(), requestDto.getPrice(),
            requestDto.getSaleType(), requestDto.getHashtags(), user, categories);
        postRepository.save(post);

        // 2. 이미지 업로드 및 URL 저장
        List<String> imageUrls = awsS3Uploader.uploadImage(images, ImageType.POST, post.getId());
        List<String> productImageUrls = awsS3Uploader.uploadImage(productImages, ImageType.PRODUCT, post.getId());

        // 3. PostImage 엔티티 생성 및 게시물에 추가
        List<PostImage> postImages = imageUrls.stream()
            .map(url -> new PostImage(post, url))
            .collect(Collectors.toList());
        postImages.addAll(productImageUrls.stream()
            .map(url -> new PostImage(post, url))
            .collect(Collectors.toList()));

        // 4. 게시물에 이미지 추가 및 저장
        post.getPostImages().addAll(postImages);
        postRepository.save(post); // Save the post with images
        return new PostResponseDto(post);
    }

    @Transactional
    public PostResponseDto updatePost(Long postId, PostRequestDto requestDto, List<MultipartFile> images,
        List<MultipartFile> productImages, UserDetailsImpl userDetails) {
        User user = userDetails.getUser();
        Post post = findById(postId);
        checkUserSame(post, user);
        List<PostImage> postImages = post.getPostImages();

        if( null == postImages || null == productImages ) {
            throw new CustomException(StatusCode.NOT_FOUND_IMAGE);
        }else{
            awsS3Uploader.deleteImage(postImages.get(0).getPostUrl());
            awsS3Uploader.deleteImage(postImages.get(1).getPostUrl());
            List<String> awsS3Images = awsS3Uploader.uploadImage(images, ImageType.POST, post.getId());
            List<String> awsS3ProductImages = awsS3Uploader.uploadImage(productImages, ImageType.PRODUCT, post.getId());
            PostImage postImage = new PostImage(post, awsS3Images.get(0));
            PostImage postProductImage = new PostImage(post, awsS3ProductImages.get(0));
            postImages.set(0, postImage);
            postImages.set(1, postProductImage);
        }

        // 여러 카테고리명을 받아와서 매핑
        List<Category> categories = requestDto.getCategoryName().stream()
            .map(categoryName -> categoryRepository.findByCategory(categoryName)
                .orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_CATEGORY)))
            .collect(Collectors.toList());

        // 기존의 카테고리를 클리어하고 새롭게 업데이트
        post.update(requestDto.getTitle(), requestDto.getContent(), requestDto.getPrice(),
            requestDto.getSaleType(), requestDto.getHashtags(), user, categories, postImages);

        return new PostResponseDto(post);
    }

    @Transactional
    public void deletePost(Long postId, UserDetailsImpl userDetails) {
        User user = userDetails.getUser();
        Post post = findById(postId);
        checkUserSame(post, user);
        postRepository.delete(post);

    }

    @Transactional(readOnly = true)
    public Page<PostResponseDto> findPostsByCategory(String categoryName, Pageable pageable) {
        Page<Post> postsPage = postRepository.findByCategoryName(categoryName, pageable);
        return postsPage.map(PostResponseDto::new);
    }

    @Transactional(readOnly = true)
    public Page<PostResponseDto> findPostsByLikes(Pageable pageable) {
        // 'likeCount'를 기준으로 내림차순 정렬을 위한 Pageable 객체 생성
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "likeCount")
        );

        // 'likeCount'를 기준으로 정렬된 게시물 조회
        Page<Post> postsPage = postRepository.findAll(sortedPageable);

        // Post 엔티티를 PostResponseDto로 변환
        return postsPage.map(PostResponseDto::new);
    }

    @Transactional(readOnly = true)
    public Page<PostResponseDto> findAllPost(Pageable pageable) {
        Page<Post> postsPage = postRepository.findAll(pageable);
        return postsPage.map(PostResponseDto::new);
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


    public Page<PostResponseDto> searchPosts(SearchType type, String keyword, Pageable pageable){
        //검색 타입이나 검색어가 비어있는 경우
        if (type == null || keyword == null || keyword.trim().isEmpty()) {
            throw new CustomException(StatusCode.INVALID_SEARCH_QUERY);
        }

        //검색 수행
        Page<Post> postPage = postRepository.searchPosts(type, keyword, pageable);

        // 검색 결과가 없을 때 예외 처리
        if (postPage.isEmpty()) {
            throw new CustomException(StatusCode.NOT_FOUND_SEARCH);
        }

        // Post 엔티티를 PostResponseDto로 변환
        return postPage.map(PostResponseDto::new);
    }

    public Page<PostResponseDto> findMyPosts(Pageable pageable, UserDetailsImpl userDetails) {
        User user = userDetails.getUser();
        Page<Post> posts = postRepository.findByUser(user,pageable);
        return posts.map(post -> new PostResponseDto(post.getId(), post.getTitle(), post.getCreatedAt()));
    }

    @Transactional
    public void addCategoryIfNotExists(CategoryRepository categoryRepository, String categoryName) {
        categoryRepository.findByCategory(categoryName).orElseGet(() -> {
            Category category = new Category();
            category.addCategory(categoryName);
            return categoryRepository.save(category);
        });
    }

    public PostImage findFirstByPost(Post post) {
        return postImageRepository.findFirstByPost(post).orElse(null);
    }
}
