package crud_1.carSale.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import crud_1.carSale.entity.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer>{

	Car findByBrand(String brand);

	Car findByColor(String color);

	Car findByType(String type);

	Car findByAge(int age);
}
