package armonarch.kosten.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(min = 3, max = 20)
  private String name;

  @NotBlank
  @Email
  private String email;

  @NotBlank
  private String hashedPassword;

  private boolean active;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public User() {
  }

  public User(String name, String email, String hashedPassword) {
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.active = true;
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
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

  public boolean getActive() {
    return this.active;
  }

  public LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return this.updatedAt;
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

  public void setActive(boolean active) {
    this.active = active;
  }

  public void setCreatedAt(LocalDateTime datetime) {
    this.createdAt = datetime;
  }

  public void setUpdatedAt(LocalDateTime datetime) {
    this.updatedAt = datetime;
  }
}
