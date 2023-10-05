package crud_1.carSale;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public User saveUser(User User) {
		return userRepository.save(User);
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
	
	public User getUserByName(String name) {
		return userRepository.findByName(name);
	}
	
	public String deleteUserById(int id) {
		userRepository.deleteById(id);
		return "removed User with id: " + id;
	}
	
	public User updateUser(User user) {
		User currentUser = userRepository.findById(user.getId()).orElse(null);

		return userRepository.save(currentUser);
	}
}
