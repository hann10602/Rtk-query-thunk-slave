package com.nnh.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.nnh.dto.ResponseResult;
import com.nnh.dto.TodoCreateSdi;
import com.nnh.dto.TodoDeleteSdi;
import com.nnh.dto.TodoSdo;
import com.nnh.dto.TodoUpdateSdi;
import com.nnh.entity.TodoEntity;
import com.nnh.repository.TodoRepository;
import com.nnh.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService{
	private final TodoRepository todoRepo;

	public TodoServiceImpl(TodoRepository todoRepo) {
		super();
		this.todoRepo = todoRepo;
	}

	@Override
	public List<TodoSdo> getTodos() {
		List<TodoEntity> entityList = todoRepo.findAll();
		List<TodoSdo> dtoList = new ArrayList<>();
		
		entityList.forEach(item -> {
			TodoSdo dto = new TodoSdo();
			BeanUtils.copyProperties(item, dto);
			dtoList.add(dto);
		});
		
		return dtoList;
	}

	@Override
	public ResponseResult create(TodoCreateSdi req) {
		try {
			TodoEntity entity = new TodoEntity();
			BeanUtils.copyProperties(req, entity);
			todoRepo.save(entity);
			
			return new ResponseResult("success");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseResult("fail");
		}
	}

	@Override
	public ResponseResult update(TodoUpdateSdi req) {

		try {
			TodoEntity entity = new TodoEntity();
			BeanUtils.copyProperties(req, entity);
			todoRepo.save(entity);
			
			return new ResponseResult("success");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseResult("fail");
		}
	}

	@Override
	public ResponseResult delete(TodoDeleteSdi req) {
		try {
			todoRepo.deleteById(req.getId());
			
			return new ResponseResult("success");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseResult("fail");
		}
	}

	@Override
	public TodoSdo getTodo(Long id) {
		TodoEntity entity = todoRepo.findById(id).get();
		TodoSdo sdo = new TodoSdo();
		
		BeanUtils.copyProperties(entity, sdo);
		return sdo;
	}

}
