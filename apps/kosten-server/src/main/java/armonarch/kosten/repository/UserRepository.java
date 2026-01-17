package armonarch.kosten.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import armonarch.kosten.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findById(Long id);

  Optional<User> findByEmail(String email);
}
