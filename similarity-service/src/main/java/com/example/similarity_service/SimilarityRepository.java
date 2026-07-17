package com.example.similarity_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimilarityRepository extends JpaRepository<SimilarityResult, Long> {
}