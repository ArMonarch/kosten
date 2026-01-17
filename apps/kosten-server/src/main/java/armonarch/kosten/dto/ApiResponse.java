package armonarch.kosten.dto;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

public class ApiResponse<T> {
  private LocalDateTime timestamp;
  private HttpStatus status;
  private String message;
  private T data;

  public ApiResponse() {
  }

  public ApiResponse(HttpStatus status, String message, T data) {
    this.status = status;
    this.message = message;
    this.data = data;
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

  public T getData() {
    return this.data;
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

  public void setData(T data) {
    this.data = data;
  }
}
