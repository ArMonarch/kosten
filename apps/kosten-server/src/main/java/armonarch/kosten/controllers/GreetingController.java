package armonarch.kosten.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import armonarch.kosten.dto.GreetingResponse;

@RestController
@RequestMapping(path = "/api")
public class GreetingController {
  private static final String template = "Hello, %s!";

  @GetMapping("/greeting")
  public ResponseEntity<GreetingResponse> greeting(@RequestParam(defaultValue = "World") String name) {
    GreetingResponse greeting = new GreetingResponse(name, template.formatted(name), LocalDateTime.now());
    return ResponseEntity.status(HttpStatus.OK).body(greeting);
  }
}
