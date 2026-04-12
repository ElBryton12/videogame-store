package com.videogamestore.backend.service;

import com.videogamestore.backend.entity.Game;
import com.videogamestore.backend.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final RawgService rawgService;

    public List<Game> getAll() {
        List<Game> games = gameRepository.findByActiveTrue();
        games.forEach(this::enrichWithRawg);
        return games;
    }

    public Game getById(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));
        enrichWithRawg(game);
        return game;
    }

    public List<Game> search(String name) {
        List<Game> games = gameRepository.findByNameContainingIgnoreCaseAndActiveTrue(name);
        games.forEach(this::enrichWithRawg);
        return games;
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
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));
        game.setActive(false);
        gameRepository.save(game);
    }

    private void enrichWithRawg(Game game) {
        Map<String, Object> rawg = rawgService.searchGame(game.getName());
        game.setImageUrl((String) rawg.get("imageUrl"));
        game.setRating(((Number) rawg.get("rating")).doubleValue());
    }
}