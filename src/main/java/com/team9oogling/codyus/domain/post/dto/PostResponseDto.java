package com.team9oogling.codyus.domain.post.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.entity.PostImage;
import com.team9oogling.codyus.domain.post.entity.SaleType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostResponseDto {

    private Long id;
    private String title;
    private String content;
    private int price;
    private SaleType saleType;
    private String hashtags;
    private List<String> imageUrls;
    private String nickname; // nickname 필드 추가
    private int likes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public PostResponseDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.price = post.getPrice();
        this.saleType = post.getSaleType();
        this.hashtags = post.getHashtags();
        this.imageUrls = post.getPostImages().stream()
                .map(PostImage::getPostUrl) // `PostImage`로 변경
                .collect(Collectors.toList());
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getModifiedAt();
        this.nickname = post.getNickname(); // nickname 필드 초기화
        this.likes = post.getLikeCount();
    }

    public PostResponseDto(Long postId, String title, LocalDateTime createdAt) {
        this.id = postId;
        this.title = title;
        this.createdAt = createdAt;
    }
}
