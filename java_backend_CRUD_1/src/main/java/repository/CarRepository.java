package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import entity.Car;

public interface CarRepository extends JpaRepository<Car, Integer>{

	Car findByBrand(String brand);

	Car findByColor(String color);

	Car findByType(String type);

	Car findByAge(String age);
}
