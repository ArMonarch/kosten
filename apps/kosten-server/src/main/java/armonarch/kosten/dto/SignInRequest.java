package armonarch.kosten.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class SignInRequest {
  @NotBlank(message = "Email is required!")
  @Email(message = "Email must be valid!")
  private String email;
  @NotBlank(message = "Password is required!")
  private String password;

  public SignInRequest() {
  }

  public SignInRequest(String email, String password) {
    this.email = email;
    this.password = password;
  }

  // Getters
  public String getEmail() {
    return this.email;
  }

  public String getPassword() {
    return this.password;
  }

  // Setters
  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
