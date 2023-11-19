package crud_1.carSale.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import crud_1.carSale.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByName(String name);
	Optional<User> findById(Long id);
	boolean existsByName(String name);
}
