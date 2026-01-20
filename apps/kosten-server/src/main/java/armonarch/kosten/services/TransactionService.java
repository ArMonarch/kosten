package armonarch.kosten.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import armonarch.kosten.enums.TransactionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import armonarch.kosten.dto.TransactionRequest;
import armonarch.kosten.enums.TransactionFrequency;
import armonarch.kosten.exceptions.TransactionNotFoundException;
import armonarch.kosten.exceptions.UnauthorizedException;
import armonarch.kosten.models.Transaction;
import armonarch.kosten.models.User;
import armonarch.kosten.repository.TransactionRepository;
import armonarch.kosten.repository.UserRepository;

@Service
public class TransactionService {
  @Autowired
  TransactionRepository transactionRepository;
  @Autowired
  UserRepository userRepository;

  public List<Transaction> getTransactions(Long userId) throws TransactionNotFoundException {
    var transactions = transactionRepository.findByUserId(userId);
    if (transactions.isEmpty()) {
      throw new TransactionNotFoundException("Transactions Not Found");
    }
    return transactions;
  }

  public List<Transaction> getTransactions(Long userId, TransactionType transactionType)
      throws TransactionNotFoundException {
    var transactions = transactionRepository.findByUserIdAndTransactionType(userId, transactionType);
    if (transactions.isEmpty()) {
      throw new TransactionNotFoundException("Transactions Not Found");
    }
    return transactions;
  }

  public BigDecimal getTransactionsSum(Long userId, TransactionType transactionType) {
    var amountSum = transactionRepository.getSumByUserIdAndTransactionType(userId, transactionType);
    if (amountSum.isEmpty()) {
      return BigDecimal.ZERO;
    }
    return amountSum.get();
  }

  public Long getTransactionsCount(Long userId, TransactionType transactionType) {
    var amountSum = transactionRepository.getCountByUserIdAndTransactionType(userId, transactionType);
    if (amountSum.isEmpty()) {
      return 0L;
    }
    return amountSum.get();
  }

  public Long deleteTransaction(Long id, User user) throws TransactionNotFoundException, UnauthorizedException {
    Transaction transaction = transactionRepository.findById(id)
        .orElseThrow(() -> new TransactionNotFoundException("Transaction Not Found"));
    if (!transaction.getUser().equals(user)) {
      throw new UnauthorizedException("Unauthorized Access");
    }
    return transactionRepository.deleteTransactionById(id);
  }

  public Transaction createTransaction(Transaction entity) {
    return transactionRepository.save(entity);
  }

  public Transaction createTransaction(TransactionRequest entity, User user) {
    var transaction = new Transaction();
    transaction.setName(entity.getName());
    transaction.setLabel(entity.getLabel());
    transaction.setAmount(entity.getAmount());
    transaction.setUser(user);
    transaction.setTransactionType(entity.getTransactionType());
    transaction.setTransactionFrequency(TransactionFrequency.ONE_TIME);
    transaction.setTransactionCategory(entity.getTransactionCategory());
    transaction.setTransactionDate(LocalDate.now());
    transaction.setCreatedAt(LocalDateTime.now());
    transaction.setUpdatedAt(LocalDateTime.now());

    return transactionRepository.save(transaction);
  }
}
