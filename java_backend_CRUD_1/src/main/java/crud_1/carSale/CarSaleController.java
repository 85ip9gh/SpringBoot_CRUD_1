package crud_1.carSale;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarSaleController {

	@Autowired
	private CarService carService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/basic-auth")
	public String basicAuthentication() {
		return "Success";
	}
	
	@PostMapping("/addCar")
	public Car addCar(@RequestBody Car car, Principal principal) {
		Optional<User> currentUser =  userService.getUserByName(principal.getName());
		car.setUser(currentUser.get());
		
		return carService.saveCar(car);
	}
	
	@PostMapping("/addUser")
	public User addUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
	@PostMapping("/addAllCars")
	public List<Car> addAllCar(@RequestBody List<Car> carList) {
		return carService.saveAllCars(carList);
	}

	@GetMapping("/cars")
	public List<Car> getAllCars(){
		List<Car> allCars = carService.getAllCars();
		
		allCars.forEach(car -> {
			if(car.getUser() != null) {
				car.setSeller(car.getUser().getName());
			} else {
				car.setSeller("Anonymous");
			}
		} );
		
		return allCars;
	}
	
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return userService.getAllUsers();
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
	
	@DeleteMapping("/deleteUser/{id}")
	public String deleteUser(@PathVariable int id) {
		return userService.deleteUserById(id);
	}
}
