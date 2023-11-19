package crud_1.carSale.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cars")
public class Car {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String brand;
	private String color;
	private String type;
	private int age;	
	private boolean selling = false;
	
	@ManyToOne(fetch=FetchType.LAZY) 
	@JsonIgnore
	private User user;

	private String seller = (user != null) ? user.getName() : "Anonymous";
	
	public boolean getSelling() {
		return selling;
	}
	
	public void setSelling(boolean bool) {
		this.selling = bool;
	}
	
	public String getSeller() {
		return seller;
	}
	
	public int getId() {
		return id;
	}
	
	public String getBrand() {
		return brand;
	}
	
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
		this.seller = user.getName();
	}
	
}
