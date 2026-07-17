package com.example.similarity_service;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "rebuttals")
@Getter
@Setter
@NoArgsConstructor
public class Rebuttal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어떤 게시글에 대한 반론인지 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    // 반론 작성자 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User writer;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // 반론 주장 및 근거 내용

    private int agreeCount; // 이 반론에 동의하는 사람 수 (추천수)

    private LocalDateTime createdAt;

    public Rebuttal(Post post, User writer, String content) {
        this.post = post;
        this.writer = writer;
        this.content = content;
        this.agreeCount = 0; // 초기 동의 수는 0개
        this.createdAt = LocalDateTime.now();
    }
}
