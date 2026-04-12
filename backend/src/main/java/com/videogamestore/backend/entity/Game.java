package com.videogamestore.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "games")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String genre;

    @Column(nullable = false)
    private Double price;

    private String description;

    @Builder.Default
    private boolean active = true;

    @Transient
    private String imageUrl;

    @Transient
    private Double rating;
}