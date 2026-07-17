package com.example.similarity_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // 모든 글을 작성 시간 기준 내림차순(최신순)으로 가져오는 메서드
    List<Post> findAllByOrderByCreatedAtDesc();
}
