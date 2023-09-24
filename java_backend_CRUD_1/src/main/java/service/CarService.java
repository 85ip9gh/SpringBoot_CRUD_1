package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import entity.Car;
import repository.CarRepository;

@Service
public class CarService {

	@Autowired
	private CarRepository carRepository;
	
	public Car saveCar(Car car) {
		return carRepository.save(car);
	}
	
	public List<Car> saveAllCars(List<Car> cars) {
		return carRepository.saveAll(cars);
	}
	
	public List<Car> getAllCars(){
		return carRepository.findAll();
	}
	
	public Car getCarById(int id) {
		return carRepository.findById(id).orElse(null);
	}
	
	public Car getCarByBrand(String brand) {
		return carRepository.findByBrand(brand);
	}
	
	public Car getCarByColor(String color) {
		return carRepository.findByColor(color);
	}
	
	public Car getCarByType(String type) {
		return carRepository.findByType(type);
	}
	
	public Car getCarByAge(String age) {
		return carRepository.findByAge(age);
	}
	
	public String deleteCar(int id) {
		carRepository.deleteById(id);
		return "removed car with id: " + id;
	}
	
	public Car updateCar(Car car) {
		Car currentCar = carRepository.findById(car.getId()).orElse(null);
		currentCar.setAge(car.getAge());
		currentCar.setBrand(car.getBrand());
		currentCar.setColor(car.getColor());
		currentCar.setType(car.getType());

		return carRepository.save(currentCar);
	}
	
	
	
	
	
	
	
	
}
