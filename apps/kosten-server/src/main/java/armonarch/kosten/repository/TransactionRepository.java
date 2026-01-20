package armonarch.kosten.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import armonarch.kosten.enums.TransactionType;
import armonarch.kosten.models.Transaction;
import jakarta.transaction.Transactional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
  Optional<Transaction> findById(Long id);

  List<Transaction> findByUserId(Long userId);

  @Modifying
  @Transactional
  @Query("DELETE FROM Transaction t WHERE t.id = :id")
  Long deleteTransactionById(@Param("id") Long id);

  List<Transaction> findByUserIdAndTransactionType(long id, TransactionType transactionType);

  @Query("SELECT sum(amount) FROM Transaction t WHERE t.user.id = :userId AND t.transactionType = :transactionType")
  Optional<BigDecimal> getSumByUserIdAndTransactionType(@Param("userId") Long userId,
      @Param("transactionType") TransactionType transactionType);

  @Query("SELECT count(t) FROM Transaction t WHERE t.user.id = :userId AND t.transactionType = :transactionType")
  Optional<Long> getCountByUserIdAndTransactionType(@Param("userId") Long userId,
      @Param("transactionType") TransactionType transactionType);
}
