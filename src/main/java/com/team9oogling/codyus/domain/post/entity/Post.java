package com.team9oogling.codyus.domain.post.entity;

import com.team9oogling.codyus.domain.user.entity.User;
import com.team9oogling.codyus.global.entity.Timestamped;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;


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

        // 카테고리를 PostCategoryMatches로 매핑
        categories.forEach(category -> {
            PostCategoryMatches postCategoryMatch = new PostCategoryMatches(this, category);
            this.postCategoryMatches.add(postCategoryMatch);
            category.getPostCategoryMatches().add(postCategoryMatch);
        });
    }

    public void update(String title, String content, int price, SaleType saleType, String hashtags, User user, List<Category> categories) {
        this.title = title;
        this.content = content;
        this.price = price;
        this.saleType = saleType;
        this.hashtags = hashtags;
        this.user = user;

        // 기존 카테고리 매핑 제거
        this.postCategoryMatches.clear();

        // 새로운 카테고리 매핑 추가
        categories.forEach(category -> {
            PostCategoryMatches postCategoryMatch = new PostCategoryMatches(this, category);
            this.postCategoryMatches.add(postCategoryMatch);
            category.getPostCategoryMatches().add(postCategoryMatch);
        });
    }
}
