package armonarch.kosten.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import armonarch.kosten.dto.ApiResponse;
import armonarch.kosten.dto.TransactionRequest;
import armonarch.kosten.dto.TransactionResponse;
import armonarch.kosten.enums.TransactionType;
import armonarch.kosten.exceptions.TransactionNotFoundException;
import armonarch.kosten.exceptions.UnauthorizedException;
import armonarch.kosten.exceptions.UserNotFoundException;
import armonarch.kosten.models.Transaction;
import armonarch.kosten.services.AuthenticationService;
import armonarch.kosten.services.TransactionService;
import armonarch.kosten.services.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000", methods = { RequestMethod.GET, RequestMethod.POST,
    RequestMethod.OPTIONS, RequestMethod.DELETE, RequestMethod.HEAD, RequestMethod.PATCH, RequestMethod.PUT })
@RequestMapping("/api/transaction")
public class TransactionController {
  @Autowired
  AuthenticationService authenticationService;
  @Autowired
  TransactionService transactionService;
  @Autowired
  UserService userService;

  @GetMapping("/get")
  public ResponseEntity<?> getTransactions(@RequestHeader("Authorization") String authHeader)
      throws UserNotFoundException, TransactionNotFoundException,
      UnauthorizedException {
    var user = authenticationService.verifyUser(authHeader);
    List<TransactionResponse> transactions = new ArrayList<>();
    for (Transaction transaction : transactionService.getTransactions(user.getId())) {
      transactions.add(new TransactionResponse(transaction));
    }
    var response = new ApiResponse<List<TransactionResponse>>(HttpStatus.OK, "Get Transactions", transactions);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/expense/get")
  public ResponseEntity<?> getExpenses(@RequestHeader("Authorization") String authHeader)
      throws UserNotFoundException, TransactionNotFoundException,
      UnauthorizedException {
    var user = authenticationService.verifyUser(authHeader);
    List<TransactionResponse> transactions = new ArrayList<>();
    for (Transaction transaction : transactionService.getTransactions(user.getId(), TransactionType.EXPENSE)) {
      transactions.add(new TransactionResponse(transaction));
    }
    var response = new ApiResponse<List<TransactionResponse>>(HttpStatus.OK, "Get Transactions", transactions);
    return ResponseEntity.ok(response);
  }

  public ResponseEntity<?> getTransactionsSum(String authHeader, TransactionType transactionType)
      throws UserNotFoundException, TransactionNotFoundException,
      UnauthorizedException {
    var user = authenticationService.verifyUser(authHeader);
    var sum = transactionService.getTransactionsSum(user.getId(), transactionType);
    var response = new ApiResponse<BigDecimal>(HttpStatus.OK, "Get Total Sum", sum);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/expense/total/sum")
  public ResponseEntity<?> getExpensesSum(@RequestHeader("Authorization") String authHeader)
      throws UserNotFoundException, TransactionNotFoundException,
      UnauthorizedException {
    return getTransactionsSum(authHeader, TransactionType.EXPENSE);
  }

  @GetMapping("/income/total/sum")
  public ResponseEntity<?> getIncomesSum(@RequestHeader("Authorization") String authHeader)
      throws UserNotFoundException, TransactionNotFoundException,
      UnauthorizedException {
    return getTransactionsSum(authHeader, TransactionType.INCOME);
  }

  public ResponseEntity<?> getTransactionsCount(String authHeader, TransactionType transactionType)
      throws UserNotFoundException, TransactionNotFoundException,
      UnauthorizedException {
    var user = authenticationService.verifyUser(authHeader);
    var sum = transactionService.getTransactionsCount(user.getId(), transactionType);
    var response = new ApiResponse<Long>(HttpStatus.OK, "Get Total Sum", sum);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/expense/total/count")
  public ResponseEntity<?> getExpensesCount(@RequestHeader("Authorization") String authHeader)
      throws UserNotFoundException, TransactionNotFoundException,
      UnauthorizedException {
    return getTransactionsCount(authHeader, TransactionType.EXPENSE);
  }

  @GetMapping("/income/total/count")
  public ResponseEntity<?> getIncomesCount(@RequestHeader("Authorization") String authHeader)
      throws UserNotFoundException, TransactionNotFoundException,
      UnauthorizedException {
    return getTransactionsCount(authHeader, TransactionType.INCOME);
  }

  @GetMapping("/income/get")
  public ResponseEntity<?> getIncome(@RequestHeader("Authorization") String authHeader)
      throws UserNotFoundException, TransactionNotFoundException,
      UnauthorizedException {
    var user = authenticationService.verifyUser(authHeader);
    List<TransactionResponse> transactions = new ArrayList<>();
    for (Transaction transaction : transactionService.getTransactions(user.getId(), TransactionType.INCOME)) {
      transactions.add(new TransactionResponse(transaction));
    }
    var response = new ApiResponse<List<TransactionResponse>>(HttpStatus.OK, "Get Transactions", transactions);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/create")
  public ResponseEntity<?> createTransaction(@RequestHeader("Authorization") String authHeader,
      @Valid @RequestBody TransactionRequest request)
      throws UserNotFoundException, UnauthorizedException {
    var user = authenticationService.verifyUser(authHeader);
    Transaction transaction = transactionService.createTransaction(request, user);
    var response = new TransactionResponse(transaction);
    return ResponseEntity.ok(new ApiResponse<TransactionResponse>(HttpStatus.CREATED, "Created", response));
  }

  @PostMapping("/expense/create")
  public ResponseEntity<?> createExpense(@RequestHeader("Authorization") String authHeader,
      @Valid @RequestBody TransactionRequest request)
      throws UserNotFoundException, UnauthorizedException {
    request.setTransactionType(TransactionType.EXPENSE);
    return createTransaction(authHeader, request);
  }

  @PostMapping("/income/create")
  public ResponseEntity<?> createIncome(@RequestHeader("Authorization") String authHeader,
      @Valid @RequestBody TransactionRequest request)
      throws UserNotFoundException, UnauthorizedException {
    request.setTransactionType(TransactionType.INCOME);
    return createTransaction(authHeader, request);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteTransaction(@RequestHeader("Authorization") String authHeader, @PathVariable Long id)
      throws UserNotFoundException, TransactionNotFoundException, UnauthorizedException, MissingRequestHeaderException {
    var user = authenticationService.verifyUser(authHeader);
    var num = transactionService.deleteTransaction(id, user);
    var response = new ApiResponse<String>(HttpStatus.OK, "Transactions Deleted: " + num, null);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
