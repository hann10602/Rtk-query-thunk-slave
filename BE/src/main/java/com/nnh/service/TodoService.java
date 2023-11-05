package com.nnh.service;

import java.util.List;

import com.nnh.dto.ResponseResult;
import com.nnh.dto.TodoCreateSdi;
import com.nnh.dto.TodoDeleteSdi;
import com.nnh.dto.TodoSdo;
import com.nnh.dto.TodoUpdateSdi;

public interface TodoService {
	List<TodoSdo> getTodos();
	TodoSdo getTodo(Long id);
	ResponseResult create(TodoCreateSdi req);
	ResponseResult update(TodoUpdateSdi req);
	ResponseResult delete(TodoDeleteSdi req);
}
