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
        Map<String, Object> rawg = rawgService.searchGame(game.getName());
        game.setImageUrl((String) rawg.get("imageUrl"));
        game.setRating(((Number) rawg.get("rating")).doubleValue());
        return gameRepository.save(game);
    }

    public Game update(Long id, Game updated) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));

        // Comparar ANTES de asignar el nuevo nombre
        boolean nameChanged = !game.getName().equalsIgnoreCase(updated.getName());

        game.setName(updated.getName());
        game.setGenre(updated.getGenre());
        game.setPrice(updated.getPrice());
        game.setDescription(updated.getDescription());

        if (nameChanged) {
            Map<String, Object> rawg = rawgService.searchGame(updated.getName());
            game.setImageUrl((String) rawg.get("imageUrl"));
            game.setRating(((Number) rawg.get("rating")).doubleValue());
        }

        return gameRepository.save(game);
    }

    public void delete(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));
        game.setActive(false);
        gameRepository.save(game);
    }
}