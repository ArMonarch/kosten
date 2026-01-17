package armonarch.kosten.dto;

import armonarch.kosten.models.User;

public class AuthResponse {
  private Long id;
  private String name;
  private String email;
  private String hashedPassword;

  public AuthResponse() {
  }

  public AuthResponse(User user) {
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
    this.hashedPassword = user.getHashedPassword();
  }

  public AuthResponse(Long id, String name, String email, String hashedPassword) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }

  // Getters
  public Long getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public String getEmail() {
    return this.email;
  }

  public String getHashedPassword() {
    return this.hashedPassword;
  }

  // Setters
  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setHashedPassword(String hashedPassword) {
    this.hashedPassword = hashedPassword;
  }
}
