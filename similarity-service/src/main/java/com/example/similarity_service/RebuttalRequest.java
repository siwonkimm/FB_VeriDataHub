package com.example.similarity_service;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RebuttalRequest {
    private String username; // 작성자 ID
    private String content;  // 반론 내용
}