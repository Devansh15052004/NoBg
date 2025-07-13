package com.example.Nobg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class NobgApplication {

	public static void main(String[] args) {
		SpringApplication.run(NobgApplication.class, args);
	}

}
