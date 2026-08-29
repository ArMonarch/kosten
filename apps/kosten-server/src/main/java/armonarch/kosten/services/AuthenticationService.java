package armonarch.kosten.services;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import armonarch.kosten.exceptions.UnauthorizedException;
import armonarch.kosten.exceptions.UserNotFoundException;
import armonarch.kosten.models.User;

@Service
public class AuthenticationService {
  private Base64.Encoder encoder = Base64.getEncoder();
  private Base64.Decoder decoder = Base64.getDecoder();

  @Autowired
  UserService userService;

  public String encodePassword(String password) {
    return encoder.encodeToString(password.getBytes());
  }

  public String decodeHashedPassword(String hashedPassword) {
    return decoder.decode(hashedPassword).toString();
  }

  public boolean verifyPassword(String password, String hashPassword) {
    return encodePassword(password).equals(hashPassword);
  }

  public User verifyUser(String authHeader) throws UserNotFoundException, UnauthorizedException {
    var identyfier = authHeader.substring(6);
    var values = identyfier.split(":");
    if (values.length != 3) {
      throw new UnauthorizedException("UnAuthorized");
    }
    Long id = Long.parseLong(values[0]);
    String email = values[1], hashedPassword = values[2];

    User user = userService.getUser(email)
        .orElseThrow(() -> new UserNotFoundException("Invalid Email or Password!"));

    if (id != user.getId()) {
      throw new UserNotFoundException("Invalid Email or Password!");
    }

    // verify password
    if (!user.getHashedPassword().equals(hashedPassword)) {
      System.out.printf("%s", hashedPassword.length());
      System.out.printf("%s", user.getHashedPassword().length());
      throw new UserNotFoundException("Invalid Email or Password!");
    }

    return user;
  }
}
