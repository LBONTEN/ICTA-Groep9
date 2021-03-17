package com.example.restservice;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.repository.CrudRepository;

// @RepositoryRestResource(collectionResourceRel = "people", path = "people")
// public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {

//   List<Person> findByLastName(@Param("name") String name);
//   List<Person> findByFirstName(@Param("name") String name);

// }

public interface PersonRepository extends CrudRepository<Person, Long> { // <1>

}