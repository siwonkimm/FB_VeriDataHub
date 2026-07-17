package com.example.similarity_service;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequest {
    private String title;
    private String content;
    private String username; // 글을 쓰는 사람의 아이디
}
