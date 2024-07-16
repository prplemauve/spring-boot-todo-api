package com.job.web.controller;

import com.job.web.model.ToDo;
import com.job.web.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {

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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodoItem(@PathVariable("id") Long id) {
        ToDo todoItem = todoItemService.getById(id)
                .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));
        todoItemService.delete(todoItem);
        return ResponseEntity.noContent().build();
    }
}
