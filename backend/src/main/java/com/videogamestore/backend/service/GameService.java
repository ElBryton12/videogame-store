package com.videogamestore.backend.service;

import com.videogamestore.backend.entity.Game;
import com.videogamestore.backend.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    public List<Game> getAll() {
        return gameRepository.findByActiveTrue();
    }

    public Game getById(Long id) {
        return gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));
    }

    public List<Game> search(String name) {
        return gameRepository.findByNameContainingIgnoreCaseAndActiveTrue(name);
    }

    public Game create(Game game) {
        return gameRepository.save(game);
    }

    public Game update(Long id, Game updated) {
        Game game = getById(id);
        game.setName(updated.getName());
        game.setGenre(updated.getGenre());
        game.setPrice(updated.getPrice());
        game.setDescription(updated.getDescription());
        return gameRepository.save(game);
    }

    public void delete(Long id) {
        Game game = getById(id);
        game.setActive(false);       // soft delete
        gameRepository.save(game);
    }
}