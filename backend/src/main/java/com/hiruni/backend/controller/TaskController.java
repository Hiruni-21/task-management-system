package com.hiruni.backend.controller;

import com.hiruni.backend.model.Task;
import com.hiruni.backend.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // GET all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // POST create task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }
    // Delete task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
    taskRepository.deleteById(id);
    }
    // add Update endpoint
    @PutMapping("/{id}/status")
public Task updateStatus(@PathVariable Long id, @RequestBody Task updatedTask) {
    Task task = taskRepository.findById(id).orElseThrow();
    task.setStatus(updatedTask.getStatus());
    return taskRepository.save(task);
}
}