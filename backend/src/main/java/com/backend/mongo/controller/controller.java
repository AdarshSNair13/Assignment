package com.backend.mongo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.mongo.repository.Taskrepository;
import com.backend.mongo.student.s_model;

@RestController
@CrossOrigin(origins = "*")
public class controller {
	
	@Autowired
	private Taskrepository repository;
	
	@PostMapping("/create/{task}")
	public List<s_model> createTask(@RequestBody s_model task) {
		repository.insert(task);
		return repository.findAll();
	}
	
	
	@PostMapping("/upd/{id}")
	public List<s_model> update1(@PathVariable String id) {
		 s_model test = repository.findById(id).orElseThrow();
		 test.setDone(!test.isDone());
		 repository.save(test);
		 return repository.findAll();
	}
	
	@PostMapping("/delete/{id}")
	public List<s_model> update(@PathVariable String id) {
		repository.deleteById(id);
		return repository.findAll();
	}
	
	@GetMapping("/list")
	public List<s_model> searchTask() {
		return repository.findAll();
	}

}
