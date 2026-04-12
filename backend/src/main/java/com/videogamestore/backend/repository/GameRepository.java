package com.videogamestore.backend.repository;

import com.videogamestore.backend.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByActiveTrue();
    List<Game> findByNameContainingIgnoreCaseAndActiveTrue(String name);
    List<Game> findByGenreIgnoreCaseAndActiveTrue(String genre);
}