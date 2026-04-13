package com.videogamestore.backend.service;

import com.videogamestore.backend.entity.*;
import com.videogamestore.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final RawgService rawgService;

    public Purchase buy(String username, Long gameId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));

        boolean alreadyBought = purchaseRepository
                .findByUserUsernameOrderByPurchaseDateDesc(username)
                .stream()
                .anyMatch(p -> p.getGame().getId().equals(gameId));

        if (alreadyBought) throw new RuntimeException("Ya tienes este juego");

        Purchase purchase = Purchase.builder()
                .user(user)
                .game(game)
                .amount(game.getPrice())
                .build();

        return purchaseRepository.save(purchase);
    }

    public List<Purchase> getMyPurchases(String username) {
        List<Purchase> purchases = purchaseRepository
                .findByUserUsernameOrderByPurchaseDateDesc(username);

        purchases.forEach(p -> {
            Map<String, Object> rawg = rawgService.searchGame(p.getGame().getName());
            p.getGame().setImageUrl((String) rawg.get("imageUrl"));
            p.getGame().setRating(((Number) rawg.get("rating")).doubleValue());
        });

        return purchases;
    }
}