package com.backend.mongo.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.backend.mongo.student.s_model;

@Repository
public interface Taskrepository extends MongoRepository <s_model,String> {
	
	
}
