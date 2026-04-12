package com.videogamestore.backend.controller;

import com.videogamestore.backend.entity.Game;
import com.videogamestore.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {

    private final GameService gameService;

    @GetMapping
    public List<Game> getAll() {
        return gameService.getAll();
    }

    @GetMapping("/{id}")
    public Game getById(@PathVariable Long id) {
        return gameService.getById(id);
    }

    @GetMapping("/search")
    public List<Game> search(@RequestParam String name) {
        return gameService.search(name);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Game create(@RequestBody Game game) {
        return gameService.create(game);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Game update(@PathVariable Long id, @RequestBody Game game) {
        return gameService.update(id, game);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        gameService.delete(id);
        return ResponseEntity.noContent().build();
    }
}