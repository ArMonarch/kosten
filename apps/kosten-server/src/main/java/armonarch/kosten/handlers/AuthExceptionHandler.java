package armonarch.kosten.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import armonarch.kosten.dto.ApiErrorResponse;
import armonarch.kosten.exceptions.UnauthorizedException;

// "Required header 'Name' is not present.
@RestControllerAdvice
public class AuthExceptionHandler {
  @ExceptionHandler(MissingRequestHeaderException.class)

  public ResponseEntity<ApiErrorResponse> handleValidationErrors(MissingRequestHeaderException ex) {
    var message = "Required header '%s' is not present".formatted(ex.getHeaderName());
    var error = new ApiErrorResponse(HttpStatus.BAD_REQUEST, message,
        null);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  @ExceptionHandler(UnauthorizedException.class)
  public ResponseEntity<ApiErrorResponse> handleValidationErrors(UnauthorizedException ex) {
    var error = new ApiErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage(),
        null);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }
}
