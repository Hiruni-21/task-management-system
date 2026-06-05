package com.hiruni.backend.controller;

import com.hiruni.backend.model.Task;
import com.hiruni.backend.model.TaskStatus;
import com.hiruni.backend.repository.TaskRepository;
import jakarta.validation.Valid;
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

    @GetMapping
    public List<Task> getAllTasks(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) TaskStatus status
    ) {
        if (status != null) {
            return taskRepository.findByStatus(status);
        }

        if (search != null && !search.isBlank()) {
            return taskRepository.findByTitleContainingIgnoreCase(search);
        }

        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@Valid @RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @Valid @RequestBody Task updatedTask) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }

    @PatchMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}
