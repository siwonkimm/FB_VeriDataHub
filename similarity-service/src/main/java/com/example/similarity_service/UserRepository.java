package com.example.similarity_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 로그인이나 중복 가입 확인 시 아이디로 사용자를 찾기 위한 메서드입니다.
    Optional<User> findByUsername(String username);
}