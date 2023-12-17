package crud_1.carSale.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import crud_1.carSale.entity.Car;
import crud_1.carSale.entity.User;
import crud_1.carSale.repository.UserRepository;

@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
		User currentUser =  userRepository.findByName(username).get();	
		
		if(currentUser == null) {
			throw new UsernameNotFoundException("User: " + username + "not found");	
		}
		
		if(username.equals("sam")) {
			return new User("sam", "man", "ROLE_USER", 100000);
		}
		
		return new User(currentUser);
				
//				.map(User::new)
//				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
		
	}
	
	public User saveUser(User user) {
		if(userRepository.existsByName(user.getName())) {
			return null;
		}
		
		return userRepository.save(user);
	}
	
	
	public long getUserMoney(String name) {
		return userRepository.findByName(name).get().getMoney();
	}
	
	public long addMoney(String name, long deposit) {
		User user = userRepository.findByName(name).get();
		long totalMoney = user.getMoney() + deposit;
		user.setMoney(totalMoney);
		userRepository.save(user);
		return totalMoney; 
	}
	
	public List<User> saveAllUsers(List<User> Users) {
		return userRepository.saveAll(Users);
	}
	
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	public User getUserById(int id) {
		return userRepository.findById(id).orElse(null);
	}
	
	public Optional<User> getUserByName(String name) {
		return userRepository.findByName(name);
	}
	
	public void deleteUserById(int id) {
		userRepository.deleteById(id);
		return;
	}
	
	public List<Car> getUserCars(String username){
		return userRepository.findByName(username).get().getMyCars();
	}
	
	public User updateUser(User user) {
		User currentUser = userRepository.findById(user.getId()).orElse(null);
		
		return userRepository.save(currentUser);
	}


}
