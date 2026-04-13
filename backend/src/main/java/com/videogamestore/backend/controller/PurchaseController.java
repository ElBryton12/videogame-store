package com.videogamestore.backend.controller;

import com.videogamestore.backend.entity.Purchase;
import com.videogamestore.backend.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @PostMapping("/{gameId}")
    public ResponseEntity<?> buy(@PathVariable Long gameId, Principal principal) {
        try {
            return ResponseEntity.ok(purchaseService.buy(principal.getName(), gameId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public List<Purchase> myPurchases(Principal principal) {
        return purchaseService.getMyPurchases(principal.getName());
    }
}