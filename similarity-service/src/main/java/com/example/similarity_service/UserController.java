package com.example.similarity_service;

import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    // final 변수를 선언하고
    private final UserRepository userRepository;

    // 스프링이 확실하게 인식할 수 있도록 직접 생성자를 만들어 줍니다 (빨간줄 완벽 해결!)
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 1. 회원가입 API
    @PostMapping("/signup")
    public String registerUser(@RequestBody SignUpRequest request) {
        // 이미 가입된 아이디가 있는지 체크
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());
        if (existingUser.isPresent()) {
            return "이미 사용 중인 아이디입니다!";
        }

        // 새 회원 정보 저장
        User user = new User(
                request.getUsername(),
                request.getPassword(),
                request.getNickname(),
                "USER"
        );
        userRepository.save(user);

        return "회원가입이 완료되었습니다!";
    }

    // 2. 로그인 API
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest request) {
        // 아이디로 회원 찾기
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        if (userOptional.isEmpty()) {
            return "존재하지 않는 아이디입니다.";
        }

        User user = userOptional.get();

        // 비밀번호 대조
        if (!user.getPassword().equals(request.getPassword())) {
            return "비밀번호가 일치하지 않습니다.";
        }

        return "로그인 성공! 환영합니다, " + user.getNickname() + "님. (권한: " + user.getRole() + ")";
    }
}