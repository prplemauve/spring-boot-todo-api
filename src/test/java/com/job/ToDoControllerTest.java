package com.job;

import org.springframework.beans.factory.annotation.Autowired;
import com.job.service.ToDoService;
import com.job.model.ToDo;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import jakarta.validation.Valid;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;

@Controller
public class ToDoControllerTest {

    @Autowired
    private ToDoService todoItemService;

    @GetMapping("/create-todo")
    public String showCreateForm(ToDo todoItem) {
        return "new-todo-item";
    }

    @PostMapping("/todo")
    public String createTodoItem(@Valid ToDo todoItem, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "error";
        }
        todoItemService.save(todoItem);
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String deleteTodoItem(@PathVariable("id") Long id, Model model) {
        ToDo todoItem = todoItemService.getById(id)
                .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));
        todoItemService.delete(todoItem);
        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String showUpdateForm(@PathVariable("id") Long id, Model model) {
        ToDo todoItem = todoItemService.getById(id)
                .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));
        model.addAttribute("todo", todoItem);
        return "edit-todo-item";
    }

    @PostMapping("/todo/{id}")
    public String updateTodoItem(@PathVariable("id") Long id, @Valid ToDo todoItem, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "error";
        }
        ToDo item = todoItemService.getById(id)
                .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));
        item.setIsComplete(todoItem.getIsComplete());
        item.setDescription(todoItem.getDescription());
        todoItemService.save(item);
        return "redirect:/";
    }
}
