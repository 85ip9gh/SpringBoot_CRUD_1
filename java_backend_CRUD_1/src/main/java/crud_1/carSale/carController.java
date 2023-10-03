package crud_1.carSale;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class carController {

	@Autowired
	private CarService carService;
	
	@PostMapping("/addCar")
	public Car addCar(@RequestBody Car car) {
		return carService.saveCar(car);
	}
	
	@PostMapping("/addAllCars")
	public List<Car> addAllCar(@RequestBody List<Car> carList) {
		return carService.saveAllCars(carList);
	}

	@GetMapping("/cars")
	public List<Car> getAllCars(){
		return carService.getAllCars();
	}
	
	@GetMapping("/cars/{id}")
	public Car getCarById(@PathVariable int id) {
		return carService.getCarById(id);
	}
	
	@GetMapping("/cars/{brand}")
	public Car getCarByBrand(@PathVariable String brand) {
		return carService.getCarByBrand(brand);
	}
	
	@GetMapping("/cars/{color}")
	public Car getCarByColor(@PathVariable String color) {
		return carService.getCarByColor(color);
	}
	
	@GetMapping("/cars/{type}")
	public Car getCarByType(@PathVariable String type) {
		return carService.getCarByType(type);
	}
	
	@GetMapping("/cars/{age}")
	public Car getCarByAge(@PathVariable int age) {
		return carService.getCarByAge(age);
	}
	
	@PutMapping("/updateCar")
	public Car updateCar(@RequestBody Car car) {
		return carService.updateCar(car);
	}
	
	@DeleteMapping("/deleteCar/{id}")
	public String deleteCar(@PathVariable int id) {
		return carService.deleteCar(id);
	}
}
