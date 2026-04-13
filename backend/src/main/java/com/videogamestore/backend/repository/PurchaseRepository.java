package com.videogamestore.backend.repository;

import com.videogamestore.backend.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByUserUsernameOrderByPurchaseDateDesc(String username);
}