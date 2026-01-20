package armonarch.kosten.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import armonarch.kosten.enums.TransactionFrequency;
import armonarch.kosten.enums.TransactionType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "transactions")
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  private String label;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @NotBlank
  @Column(name = "transaction_category")
  private String transactionCategory;

  @NotNull
  @Enumerated(EnumType.STRING)
  @Column(name = "transaction_type")
  private TransactionType transactionType;

  @Enumerated(EnumType.STRING)
  @Column(name = "transaction_frequency")
  private TransactionFrequency transactionFrequency;

  @NotNull
  private BigDecimal amount;

  @NotNull
  @Column(name = "transaction_date")
  private LocalDate transactionDate;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public Transaction() {
  }

  // Getters
  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getLabel() {
    return label;
  }

  public User getUser() {
    return user;
  }

  public String getTransactionCategory() {
    return transactionCategory;
  }

  public TransactionType getTransactionType() {
    return transactionType;
  }

  public TransactionFrequency getTransactionFrequency() {
    return transactionFrequency;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public LocalDate getTransactionDate() {
    return transactionDate;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  // Setters
  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public void setTransactionCategory(String transactionCategory) {
    this.transactionCategory = transactionCategory;
  }

  public void setTransactionType(TransactionType transactionType) {
    this.transactionType = transactionType;
  }

  public void setTransactionFrequency(TransactionFrequency transactionFrequency) {
    this.transactionFrequency = transactionFrequency;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public void setTransactionDate(LocalDate transactionDate) {
    this.transactionDate = transactionDate;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
