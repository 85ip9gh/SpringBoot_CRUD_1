package crud_1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import crud_1.config.RSAKeyProperties;

/**
 * Main class for the application. Launches and runs the spring boot application
 * 
 * @author Pesanth Janaseth Rangaswamy Anitha
 */
@EnableConfigurationProperties(RSAKeyProperties.class)
@SpringBootApplication
public class Crud_1Application {

	public static void main(String[] args) {
		SpringApplication.run(Crud_1Application.class, args);
	}
}
