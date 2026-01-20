package armonarch.kosten.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import armonarch.kosten.dto.ApiErrorResponse;
import armonarch.kosten.exceptions.UserNotFoundException;

@RestControllerAdvice
public class UserExceptionHandler {
  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<ApiErrorResponse> handleValidationErrors(UserNotFoundException ex) {
    var error = new ApiErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage(),
        null);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }
}
