package ma.enset.backend.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin("*")
@Tag(name = "Test", description = "Test endpoints for API verification")
public class TestController {

    @GetMapping("/health")
    @Operation(summary = "Health Check", description = "Check if the API is running")
    public ResponseEntity<?> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Digital Banking API is running");
        response.put("timestamp", java.time.Instant.now().toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/public")
    public ResponseEntity<?> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a public endpoint - no authentication required");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/protected")
    public ResponseEntity<?> protectedEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a protected endpoint - authentication required");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}
