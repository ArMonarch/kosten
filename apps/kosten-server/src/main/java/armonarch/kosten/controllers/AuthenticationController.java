package armonarch.kosten.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import armonarch.kosten.dto.ApiErrorResponse;
import armonarch.kosten.dto.ApiResponse;
import armonarch.kosten.dto.SignInRequest;
import armonarch.kosten.dto.AuthResponse;
import armonarch.kosten.dto.SignUpRequest;
import armonarch.kosten.models.User;
import armonarch.kosten.services.AuthenticationService;
import armonarch.kosten.services.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
  @Autowired
  private AuthenticationService authenticationService;

  @Autowired
  private UserService userService;

  @PostMapping("/signin")
  public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest request) {
    Optional<User> user = userService.getUser(request.getEmail());

    if (user.isEmpty()) {
      var apiResponse = new ApiErrorResponse(HttpStatus.UNAUTHORIZED,
          "Invalid email or password",
          Map.of("email", "Invalid!", "password", "Invalid!"));
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiResponse);
    }

    // verify password
    if (!authenticationService.verifyPassword(request.getPassword(), user.get().getHashedPassword())) {
      var apiResponse = new ApiErrorResponse(HttpStatus.UNAUTHORIZED,
          "Invalid email or password",
          Map.of("email", "Invalid!", "password", "Invalid!"));
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiResponse);
    }

    var apiResponse = new ApiResponse<AuthResponse>(HttpStatus.OK,
        "Login successful",
        new AuthResponse(user.get()));
    return ResponseEntity.ok(apiResponse);
  }

  @PostMapping(value = "/signup")
  public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest request) {
    Optional<User> user = userService.getUser(request.getEmail());
    if (user.isEmpty()) {
      User createdUser = userService.create(request.getName(), request.getEmail(),
          authenticationService.encodePassword(request.getPassword()));
      var apiResponse = new ApiResponse<AuthResponse>(HttpStatus.CREATED, "User Created",
          new AuthResponse(createdUser));
      return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    } else {
      ApiErrorResponse errorResponse = new ApiErrorResponse(HttpStatus.CONFLICT, "Duplicate User", null);
      return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
  }
}
