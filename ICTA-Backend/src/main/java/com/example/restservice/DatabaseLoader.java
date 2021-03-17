package com.example.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component // <1>
public class DatabaseLoader implements CommandLineRunner { // <2>

	private final PersonRepository repository;

	@Autowired // <3>
	public DatabaseLoader(PersonRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception { // <4>
	}
}