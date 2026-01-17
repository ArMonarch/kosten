package armonarch.kosten.services;

import java.util.Base64;

import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
  private Base64.Encoder encoder = Base64.getEncoder();
  private Base64.Decoder decoder = Base64.getDecoder();

  public String encodePassword(String password) {
    return encoder.encodeToString(password.getBytes());
  }

  public String decodeHashedPassword(String hashedPassword) {
    return decoder.decode(hashedPassword).toString();
  }

  public boolean verifyPassword(String password, String hashPassword) {
    return encodePassword(password).equals(hashPassword);
  }
}
