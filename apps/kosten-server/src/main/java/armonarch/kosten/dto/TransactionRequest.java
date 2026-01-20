package armonarch.kosten.dto;

import armonarch.kosten.enums.TransactionFrequency;
import armonarch.kosten.enums.TransactionType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class TransactionRequest {
  @NotBlank
  private String name;

  private String label;

  @NotBlank
  private String transactionCategory;

  @Enumerated(EnumType.STRING)
  private TransactionFrequency transactionFrequency;

  @Enumerated(EnumType.STRING)
  private TransactionType transactionType = TransactionType.EXPENSE;

  @NotNull
  private BigDecimal amount;

  public TransactionRequest() {
  }

  // Getters
  public String getName() {
    return name;
  }

  public String getLabel() {
    return label;
  }

  public String getTransactionCategory() {
    return transactionCategory;
  }

  public TransactionFrequency getTransactionFrequency() {
    return transactionFrequency;
  }

  public TransactionType getTransactionType() {
    return transactionType;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  // Setters
  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  public void setTransactionCategory(String transactionCategory) {
    this.transactionCategory = transactionCategory;
  }

  public void setTransactionFrequency(TransactionFrequency transactionFrequency) {
    this.transactionFrequency = transactionFrequency;
  }

  public void setTransactionType(TransactionType transactionType) {
    this.transactionType = transactionType;
  }
}
