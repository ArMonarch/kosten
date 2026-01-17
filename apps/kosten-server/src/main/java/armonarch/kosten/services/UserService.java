package armonarch.kosten.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import armonarch.kosten.models.User;
import armonarch.kosten.repository.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  // method to get user by id
  public Optional<User> getUser(Long id) {
    return userRepository.findById(id);
  }

  public Optional<User> getUser(String email) {
    return userRepository.findByEmail(email);
  }

  // method to create user
  public User create(String name, String email, String hashedPassword) {
    User user = new User(name, email, hashedPassword);
    return userRepository.save(user);
  }
}
