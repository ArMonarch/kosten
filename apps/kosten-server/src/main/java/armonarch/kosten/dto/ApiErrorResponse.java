package armonarch.kosten.dto;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;

public class ApiErrorResponse {
  private LocalDateTime timestamp;
  private HttpStatus status;
  private String message;
  private Map<String, String> errors;

  public ApiErrorResponse() {
  }

  public ApiErrorResponse(HttpStatus status, String message, Map<String, String> errors) {
    this.status = status;
    this.message = message;
    this.errors = errors;
    this.timestamp = LocalDateTime.now();
  }

  // Getters
  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public HttpStatus getStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }

  public Map<String, String> getErrors() {
    return errors;
  }

  // Setters
  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public void setStatus(HttpStatus status) {
    this.status = status;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setErrors(Map<String, String> errors) {
    this.errors = errors;
  }
}
