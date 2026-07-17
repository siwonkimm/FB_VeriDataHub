package com.example.similarity_service;

import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String writerNickname; // 작성자 닉네임만 쏙 골라서 반환
    private LocalDateTime createdAt;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.writerNickname = post.getWriter().getNickname();
        this.createdAt = post.getCreatedAt();
    }
}