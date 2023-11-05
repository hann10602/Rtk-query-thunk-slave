package com.nnh.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nnh.entity.TodoEntity;

public interface TodoRepository extends JpaRepository<TodoEntity, Long> {
}
