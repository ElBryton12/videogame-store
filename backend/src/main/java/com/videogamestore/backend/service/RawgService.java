package com.videogamestore.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RawgService {

    @Value("${rawg.api.key}")
    private String apiKey;

    @Value("${rawg.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    @SuppressWarnings("unchecked")
    public Map<String, Object> searchGame(String name) {
        String url = apiUrl + "/games?key=" + apiKey + "&search=" + name + "&page_size=1";
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response != null) {
                List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
                if (results != null && !results.isEmpty()) {
                    Map<String, Object> game = results.get(0);
                    return Map.of(
                        "imageUrl", game.getOrDefault("background_image", ""),
                        "rating", game.getOrDefault("rating", 0.0),
                        "rawgId", game.getOrDefault("id", 0)
                    );
                }
            }
        } catch (Exception e) {
            System.out.println("RAWG error: " + e.getMessage());
        }
        return Map.of("imageUrl", "", "rating", 0.0, "rawgId", 0);
    }
}