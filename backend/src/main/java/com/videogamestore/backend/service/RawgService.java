package com.videogamestore.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class RawgService {

    @Value("${rawg.api.key}")
    private String apiKey;

    @Value("${rawg.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    // Caché en memoria: nombre del juego → datos de RAWG
    private final ConcurrentHashMap<String, Map<String, Object>> cache = new ConcurrentHashMap<>();

    @SuppressWarnings("unchecked")
    public Map<String, Object> searchGame(String name) {
        String key = name.toLowerCase().trim();

        // Si ya está en caché, devolver sin llamar a RAWG
        if (cache.containsKey(key)) {
            return cache.get(key);
        }

        String url = apiUrl + "/games?key=" + apiKey + "&search=" + name + "&page_size=1";
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response != null) {
                List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
                if (results != null && !results.isEmpty()) {
                    Map<String, Object> game = results.get(0);
                    Map<String, Object> data = Map.of(
                        "imageUrl", game.getOrDefault("background_image", ""),
                        "rating",   game.getOrDefault("rating", 0.0),
                        "rawgId",   game.getOrDefault("id", 0)
                    );
                    cache.put(key, data); // guardar en caché
                    return data;
                }
            }
        } catch (Exception e) {
            System.out.println("RAWG error: " + e.getMessage());
        }

        Map<String, Object> empty = Map.of("imageUrl", "", "rating", 0.0, "rawgId", 0);
        cache.put(key, empty);
        return empty;
    }

    public int getCacheSize() {
        return cache.size();
    }
}