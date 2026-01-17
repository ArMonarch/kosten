package armonarch.kosten.dto;

import java.time.LocalDateTime;

public class GreetingResponse {
  private String name;
  private String message;
  private LocalDateTime timestamp;

  public GreetingResponse() {
  }

  public GreetingResponse(String name, String message, LocalDateTime timestamp) {
    this.name = name;
    this.message = message;
    this.timestamp = timestamp;
  }

  // Getters
  public String getName() {
    return this.name;
  }

  public String getMessage() {
    return this.message;
  }

  public LocalDateTime getTimestamp() {
    return this.timestamp;
  }

  // Setters
  public void setName(String name) {
    this.name = name;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }
}
