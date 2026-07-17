package com.example.similarity_service;

import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class RebuttalResponse {
    private Long id;
    private String content;
    private String writerNickname;
    private int agreeCount;
    private LocalDateTime createdAt;

    public RebuttalResponse(Rebuttal rebuttal) {
        this.id = rebuttal.getId();
        this.content = rebuttal.getContent();
        this.writerNickname = rebuttal.getWriter().getNickname();
        this.agreeCount = rebuttal.getAgreeCount();
        this.createdAt = rebuttal.getCreatedAt();
    }
}
