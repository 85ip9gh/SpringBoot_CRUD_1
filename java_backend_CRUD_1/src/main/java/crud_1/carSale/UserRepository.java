package crud_1.carSale;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByName(String name);
	Optional<User> findById(Long id);
	boolean existsByName(String name);
}
