package com.example.similarity_service;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/similarity")
@RequiredArgsConstructor // Repository를 주입받기 위해 추가합니다.
public class SimilarityController {

    private final SimilarityRepository similarityRepository; // DB 조작 도구 주입

    // 1. 데이터 저장하는 통로
    @PostMapping("/upload")
    public String uploadResult(@RequestBody Map<String, Object> resultData) {

        // 프론트에서 보낸 JSON 데이터 꺼내기 (예시)
        String title = (String) resultData.get("title");
        Double score = Double.valueOf(resultData.get("score").toString());

        // 엔티티 객체 생성 후 DB에 저장!
        SimilarityResult entity = new SimilarityResult(title, score);
        similarityRepository.save(entity);

        System.out.println("데이터가 성공적으로 H2 DB에 저장되었습니다! " + title);
        return "수신 및 DB 저장 성공!";
    }

    // 2. 저장된 데이터 전체 조회하는 통로 (추가하면 좋습니다)
    @GetMapping("/history")
    public List<SimilarityResult> getHistory() {
        return similarityRepository.findAll(); // DB에서 모든 행 조회해 가기
    }
}