package com.example.similarity_service;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 수동 생성자로 의존성 주입 (빨간줄 방지!)
    public PostController(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // 1. 글 쓰기 (Create)
    @PostMapping
    public String createPost(@RequestBody PostRequest request) {
        // 회원 아이디로 작성자 정보 조회
        User writer = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        Post post = new Post(request.getTitle(), request.getContent(), writer);
        postRepository.save(post);
        return "글이 성공적으로 등록되었습니다!";
    }

    // 2. 글 전체 목록 조회 (Read All - 최신순)
    @GetMapping
    public List<PostResponse> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PostResponse::new)
                .collect(Collectors.toList());
    }

    // 3. 글 상세 조회 (Read One)
    @GetMapping("/{id}")
    public PostResponse getPost(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));
        return new PostResponse(post);
    }

    // 4. 글 수정 (Update)
    @PutMapping("/{id}")
    public String updatePost(@PathVariable Long id, @RequestBody PostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        // 본인이 쓴 글인지 검증
        if (!post.getWriter().getUsername().equals(request.getUsername())) {
            return "본인이 작성한 글만 수정할 수 있습니다!";
        }

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        postRepository.save(post);

        return "글이 성공적으로 수정되었습니다!";
    }

    // 5. 글 삭제 (Delete)
    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable Long id, @RequestParam String username) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        // 본인이 쓴 글인지 검증
        if (!post.getWriter().getUsername().equals(username)) {
            return "본인이 작성한 글만 삭제할 수 있습니다!";
        }

        postRepository.delete(post);
        return "글이 성공적으로 삭제되었습니다!";
    }
}