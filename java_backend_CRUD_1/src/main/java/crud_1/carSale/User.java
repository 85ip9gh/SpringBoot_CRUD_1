package crud_1.carSale;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity(name = "user_details")
public class User {
	
	@Id
	@GeneratedValue
	int id;
	
	String name;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	public List<Car> myCars = new ArrayList<>();
	
	public User() {
		super();
	}
	
	public User(String name, List<Car> myCars) {
		this.name = name;
		this.myCars = myCars;
	}
	
	
}
	