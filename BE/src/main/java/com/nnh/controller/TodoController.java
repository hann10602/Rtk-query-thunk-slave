package com.nnh.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nnh.dto.ResponseResult;
import com.nnh.dto.TodoCreateSdi;
import com.nnh.dto.TodoDeleteSdi;
import com.nnh.dto.TodoSdo;
import com.nnh.dto.TodoUpdateSdi;
import com.nnh.service.TodoService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class TodoController {
	private final TodoService todoService;
	
	public TodoController(TodoService todoService) {
		super();
		this.todoService = todoService;
	}

	@GetMapping("/todo/{id}")
	public TodoSdo getTodo(@PathVariable Long id, 
			@RequestHeader(name = "Authentication") String token, 
			@RequestParam(name = "test") String param) {
		System.out.println("Token " + token);
		System.out.println("Param " + param);
		return todoService.getTodo(id);
	}
	
	@GetMapping("/todos")
	public List<TodoSdo> getTodos() {
		return todoService.getTodos();
	}
	
	@PostMapping("/create")
	public ResponseResult create(@RequestBody TodoCreateSdi req) {
		return todoService.create(req);
	}
	
	@PutMapping("/update")
	public ResponseResult update(@RequestBody TodoUpdateSdi req) {
		return todoService.update(req);
	}
	
	@DeleteMapping("/delete")
	public ResponseResult delete(@RequestBody TodoDeleteSdi req) {
		return todoService.delete(req);
	}
}
