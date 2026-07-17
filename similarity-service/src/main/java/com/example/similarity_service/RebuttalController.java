package com.example.similarity_service;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts/{postId}/rebuttals")
@CrossOrigin(origins = "*")
public class RebuttalController {

    private final RebuttalRepository rebuttalRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public RebuttalController(RebuttalRepository rebuttalRepository,
                              PostRepository postRepository,
                              UserRepository userRepository) {
        this.rebuttalRepository = rebuttalRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // 1. 특정 글에 반론 등록하기
    @PostMapping
    public String createRebuttal(@PathVariable Long postId, @RequestBody RebuttalRequest request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        User writer = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        Rebuttal rebuttal = new Rebuttal(post, writer, request.getContent());
        rebuttalRepository.save(rebuttal);

        return "반론이 성공적으로 제기되었습니다!";
    }

    // 2. 특정 글의 반론 목록 최신/추천순 조회하기
    @GetMapping
    public List<RebuttalResponse> getRebuttals(@PathVariable Long postId) {
        return rebuttalRepository.findByPostIdOrderByAgreeCountDesc(postId)
                .stream()
                .map(RebuttalResponse::new)
                .collect(Collectors.toList());
    }

    // 3. 반론에 동의하기 (추천 수 올리기)
    @PostMapping("/{rebuttalId}/agree")
    public String agreeRebuttal(@PathVariable Long postId, @PathVariable Long rebuttalId) {
        Rebuttal rebuttal = rebuttalRepository.findById(rebuttalId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 반론입니다."));

        rebuttal.setAgreeCount(rebuttal.getAgreeCount() + 1);
        rebuttalRepository.save(rebuttal);

        return "반론에 동의(추천)하셨습니다! 현재 동의 수: " + rebuttal.getAgreeCount();
    }
}