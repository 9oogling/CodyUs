package com.team9oogling.codyus.domain.post.repository;


import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.team9oogling.codyus.domain.post.entity.Post;
import com.team9oogling.codyus.domain.post.entity.QCategory;
import com.team9oogling.codyus.domain.post.entity.QPost;
import com.team9oogling.codyus.domain.post.entity.QPostCategoryMatches;
import com.team9oogling.codyus.domain.post.entity.SearchType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostRepositoryImpl implements PostRepositoryCustom{

    @PersistenceContext
    private EntityManager entityManager;

    private final JPAQueryFactory queryFactory;

    public PostRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public Page<Post> searchPosts(SearchType type, String keyword, Pageable pageable) {
        QPost post = QPost.post;
        BooleanExpression predicate;

        switch (type) {
            case ALL:
                predicate = post.title.containsIgnoreCase(keyword)
                        .or(post.content.containsIgnoreCase(keyword))
                        .or(post.hashtags.containsIgnoreCase(keyword));
                break;
            case TITLE:
                predicate = post.title.containsIgnoreCase(keyword);
                break;
            case CONTENT:
                predicate = post.content.containsIgnoreCase(keyword);
                break;
            case HASHTAGS:
                predicate = post.hashtags.containsIgnoreCase(keyword);
                break;
            default:
                throw new IllegalArgumentException("검색 타입이 없습니다.");
        }


        JPAQuery<Post> query = queryFactory.selectFrom(post)
                .where(predicate)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        List<Post> posts = query.fetch();


        long total = queryFactory.selectFrom(post)
                .where(predicate)
                .fetchCount();


        return new PageImpl<>(posts, pageable, total);
    }

    @Override
    public Page<Post> findByCategoryName(String categoryName, Pageable pageable) {
        QPost post = QPost.post;
        QPostCategoryMatches matches = QPostCategoryMatches.postCategoryMatches;
        QCategory category = QCategory.category1;

        List<Post> postIds  = queryFactory
            .select(post)
            .from(matches)
            .join(matches.category, category)
            .where(category.category.eq(categoryName))
            .orderBy(post.createdAt.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

        Long total = queryFactory
            .select(matches.post.count())
            .from(matches)
            .join(matches.category, category)
            .where(category.category.eq(categoryName))
            .fetchOne();

        return new PageImpl<>(postIds, pageable, total != null ? total : 0);
    }
}
