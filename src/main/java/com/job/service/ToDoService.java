package com.job.service;

import com.job.model.ToDo;
import com.job.repository.ToDoRepository;
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

    public void delete(Long id) {
        todoItemRepository.deleteById(id);
    }

    public ToDo updateStatus(Long id, boolean isComplete) {
        ToDo todoItem = getById(id)
                .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));
        todoItem.setIsComplete(isComplete);
        todoItem.setUpdatedAt(Instant.now());
        return todoItemRepository.save(todoItem);
    }
}
