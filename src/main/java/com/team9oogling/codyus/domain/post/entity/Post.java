package com.team9oogling.codyus.domain.post.entity;

import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.global.entity.Timestamped;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Post extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostCategoryMatches> postCategoryMatches = new ArrayList<>();

    private String title;
    private String content;

    @Enumerated(EnumType.STRING)
    private PostStatus status = PostStatus.INPROGRESS;

    @Enumerated(EnumType.STRING)
    private SaleType saleType;

    private int price;

    private String hashtags;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostImage> postImages = new ArrayList<>();

    // 거래 완료 일자
    @Column
    private LocalDate completedDate;

    // 좋아요 수 필드 추가
    private int likeCount = 0;


    public String getNickname() {
        return user.getNickname(); // User 엔티티에서 nickname 가져오기
    }

    public Post(String title, String content, int price, SaleType saleType, String hashtags, User user, List<Category> categories) {
        this.title = title;
        this.content = content;
        this.price = price;
        this.saleType = saleType;
        this.hashtags = hashtags;
        this.user = user;
        this.likeCount = 0;  // 초기 좋아요 수는 0으로 설정

        // 카테고리를 PostCategoryMatches로 매핑
        categories.forEach(category -> {
            PostCategoryMatches postCategoryMatch = new PostCategoryMatches(this, category);
            this.postCategoryMatches.add(postCategoryMatch);
            category.getPostCategoryMatches().add(postCategoryMatch);
        });
    }

    public void update(String title, String content, int price, SaleType saleType, String hashtags, User user, List<Category> categories,
        List<PostImage> postImages) {
        this.title = title;
        this.content = content;
        this.price = price;
        this.saleType = saleType;
        this.hashtags = hashtags;
        this.user = user;
        this.postImages = postImages;

        // 기존 카테고리 매핑 제거
        this.postCategoryMatches.clear();

        // 새로운 카테고리 매핑 추가
        categories.forEach(category -> {
            PostCategoryMatches postCategoryMatch = new PostCategoryMatches(this, category);
            this.postCategoryMatches.add(postCategoryMatch);
            category.getPostCategoryMatches().add(postCategoryMatch);
        });
    }

    // 좋아요 수 증가
    public void incrementLikeCount() {
        this.likeCount++;
    }

    // 좋아요 수 감소
    public void decrementLikeCount() {
        if (this.likeCount > 0) {
            this.likeCount--;
        }
    }
}
