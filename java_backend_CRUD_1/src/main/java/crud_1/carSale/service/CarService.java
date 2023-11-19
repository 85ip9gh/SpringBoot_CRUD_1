package crud_1.carSale.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import crud_1.carSale.entity.Car;
import crud_1.carSale.entity.User;
import crud_1.carSale.repository.CarRepository;

@Service
public class CarService {

	@Autowired
	private CarRepository carRepository;
	
	public Car saveCar(Car car) {
		return carRepository.save(car);
	}
	
	public Car changeCarUser(User user, int carId) {
		carRepository.findById(carId).get().setUser(user);
		return saveCar(carRepository.findById(carId).get());
	}
	
	public List<Car> addAllCars(List<Car> listOfCars){
		return carRepository.saveAll(listOfCars);
	}
	
	public List<Car> saveAllCars() {
		return carRepository.saveAll(carRepository.findAll());
	}
	
	public List<Car> getAllCars(){
		return carRepository.findAll();
	}
	
	public void updateSellingCar(int id, boolean sell) {
		
		Car currentCar = carRepository.findById(id).get();
		
		currentCar.setSelling(sell);
		carRepository.save(currentCar);
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
	
	public Car getCarByAge(int age) {
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
