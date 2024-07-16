package com.job.web.service;

import com.job.web.model.ToDo;
import com.job.web.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository todoItemRepository;

    public Optional<ToDo> getById(Long id) {
        return todoItemRepository.findById(id);
    }

    public List<ToDo> getAll() {
        return todoItemRepository.findAll();
    }

    public ToDo save(ToDo todoItem) {
        if (todoItem.getId() == null) {
            todoItem.setCreatedAt(Instant.now());
        }
        todoItem.setUpdatedAt(Instant.now());
        return todoItemRepository.save(todoItem);
    }

    public void delete(ToDo todoItem) {
        todoItemRepository.delete(todoItem);
    }
}
