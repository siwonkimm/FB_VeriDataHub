package com.example.similarity_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RebuttalRepository extends JpaRepository<Rebuttal, Long> {
    // 특정 게시글(postId)에 달린 반론들을 추천수(agreeCount)가 높은 순으로 정렬해서 가져오기
    List<Rebuttal> findByPostIdOrderByAgreeCountDesc(Long postId);
}
