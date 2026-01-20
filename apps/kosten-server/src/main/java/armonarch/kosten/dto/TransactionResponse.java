package armonarch.kosten.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import armonarch.kosten.enums.TransactionFrequency;
import armonarch.kosten.enums.TransactionType;
import armonarch.kosten.models.Transaction;

public class TransactionResponse {
  private Long id;

  private String name;

  private String label;

  private Long userId;

  private String transactionCategory;

  private TransactionType transactionType;

  private TransactionFrequency transactionFrequency;

  private BigDecimal amount;

  private LocalDate transactionDate;

  public TransactionResponse(Transaction transaction) {
    this.id = transaction.getId();
    this.name = transaction.getName();
    this.label = transaction.getLabel();
    this.userId = transaction.getUser().getId();
    this.amount = transaction.getAmount();
    this.transactionCategory = transaction.getTransactionCategory();
    this.transactionDate = transaction.getTransactionDate();
    this.transactionType = transaction.getTransactionType();
    this.transactionFrequency = transaction.getTransactionFrequency();
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

  public Long getUserId() {
    return userId;
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
}
