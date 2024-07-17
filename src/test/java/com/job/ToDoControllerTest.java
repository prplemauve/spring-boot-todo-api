package com.job;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.job.model.ToDo;
import com.job.service.ToDoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/todos")
public class ToDoControllerTest {

    @Autowired
    private ToDoService todoItemService;

    @GetMapping
    public ResponseEntity<List<ToDo>> getAll() {
        List<ToDo> todos = todoItemService.getAll();
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getById(@PathVariable("id") Long id) {
        ToDo todoItem = todoItemService.getById(id)
                .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));
        return ResponseEntity.ok(todoItem);
    }

    @PostMapping
    public ResponseEntity<?> createTodoItem(@Valid @RequestBody ToDo todoItem, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Validation errors");
        }
        todoItemService.save(todoItem);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodoItem(@PathVariable("id") Long id, @Valid @RequestBody ToDo todoItem, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Validation errors");
        }
        ToDo existingItem = todoItemService.getById(id)
                .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));
        existingItem.setIsComplete(todoItem.getIsComplete());
        existingItem.setDescription(todoItem.getDescription());
        todoItemService.save(existingItem);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateTodoStatus(@PathVariable("id") Long id, @RequestBody Map<String, Boolean> updateMap) {
        if (!updateMap.containsKey("isComplete")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing isComplete field");
        }
        Boolean isComplete = updateMap.get("isComplete");
        ToDo existingItem = todoItemService.getById(id)
                .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));
        existingItem.setIsComplete(isComplete);
        todoItemService.save(existingItem);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodoItem(@PathVariable("id") Long id) {
        todoItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}