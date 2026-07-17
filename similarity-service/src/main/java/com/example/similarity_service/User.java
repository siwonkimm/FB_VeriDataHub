package com.example.similarity_service;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users") // H2 데이터베이스에서 'user'는 예약어일 수 있으므로 테이블 이름을 'users'로 지정합니다.
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username; // 로그인할 때 사용할 아이디 (이메일 형태 또는 일반 아이디)

    @Column(nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false)
    private String nickname; // 사용자가 서비스에서 사용할 닉네임

    @Column(nullable = false)
    private String role; // 권한 (예: "USER", "ADMIN")

    public User(String username, String password, String nickname, String role) {
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
    }
}