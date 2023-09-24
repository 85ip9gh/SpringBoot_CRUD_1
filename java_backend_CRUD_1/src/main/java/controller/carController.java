package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import entity.Car;
import service.CarService;

@RestController
public class carController {

	@Autowired
	private CarService carService;
	
	@PostMapping("/addCar")
	public Car addCar(@RequestBody Car car) {
		return carService.saveCar(car);
	}
	
	@PostMapping("/addAllCars")
	public List<Car> addCar(@RequestBody List<Car> carList) {
		return carService.saveAllCars(carList);
	}
	
	
	@GetMapping("/CarList")
	public List<Car> getAllCars(){
		return carService.getAllCars();
	}
	
	public Car findCarById(int id) {
		return carService.getCarById(id);
	}
}
