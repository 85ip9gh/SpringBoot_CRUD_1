package crud_1.carSale;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
		
		return new User(currentUser.getName(), currentUser.getPassword());
				
//				.map(User::new)
//				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
		
	}
	
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
	
	public Optional<User> getUserByName(String name) {
		return userRepository.findByName(name);
	}
	
	public String deleteUserById(int id) {
		userRepository.deleteById(id);
		return "removed User with id: " + id;
	}
	
	public List<Car> getUserCars(String username){
		return userRepository.findByName(username).get().getMyCars();
	}
	
	public User updateUser(User user) {
		User currentUser = userRepository.findById(user.getId()).orElse(null);

		return userRepository.save(currentUser);
	}


}
