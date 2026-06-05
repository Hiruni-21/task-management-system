import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080/api/tasks";

const emptyForm = {
  title: "",
  description: "",
  status: "PENDING",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [message, setMessage] = useState("");

  async function loadTasks() {
    try {
      const response = await axios.get(API_URL, {
        params: {
          search: search || null,
          status: statusFilter || null,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load tasks. Please check backend.");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!form.title.trim()) {
      setMessage("Task title is required.");
      return;
    }

    try {
      if (editingTaskId) {
        await axios.put(`${API_URL}/${editingTaskId}`, form);
        setMessage("Task updated successfully.");
      } else {
        await axios.post(API_URL, form);
        setMessage("Task created successfully.");
      }

      setForm(emptyForm);
      setEditingTaskId(null);
      await loadTasks();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while saving the task.");
    }
  }

  function handleEdit(task) {
    setEditingTaskId(task.id);

    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
    });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("Task deleted successfully.");
      await loadTasks();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete task.");
    }
  }

  async function handleStatusChange(task, newStatus) {
    try {
      await axios.patch(`${API_URL}/${task.id}/status`, {
        status: newStatus,
      });

      await loadTasks();
    } catch (error) {
      console.error(error);
      setMessage("Failed to update task status.");
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    await loadTasks();
  }

  function handleClearFilters() {
    setSearch("");
    setStatusFilter("");

    setTimeout(() => {
      loadTasks();
    }, 0);
  }

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Full Stack Project</p>
          <h1>Task Management System</h1>
          <p className="hero-text">
            Manage your tasks using React frontend, Spring Boot backend, and MySQL database.
          </p>
        </div>
      </header>

      <main className="container">
        {message && <div className="message">{message}</div>}

        <section className="card">
          <h2>{editingTaskId ? "Update Task" : "Create Task"}</h2>

          <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Task Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Example: Study Spring Boot"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="Write task description"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleInputChange}>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="button-row">
              <button type="submit">
                {editingTaskId ? "Update Task" : "Add Task"}
              </button>

              {editingTaskId && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setEditingTaskId(null);
                    setForm(emptyForm);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="card">
          <h2>Search and Filter</h2>

          <form className="filter-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <button type="submit">Apply</button>

            <button type="button" className="secondary-button" onClick={handleClearFilters}>
              Clear
            </button>
          </form>
        </section>

        <section className="task-section">
          <div className="section-header">
            <h2>Task List</h2>
            <span>{tasks.length} task(s)</span>
          </div>

          {tasks.length === 0 ? (
            <div className="empty-box">No tasks found.</div>
          ) : (
            <div className="task-grid">
              {tasks.map((task) => (
                <article className="task-card" key={task.id}>
                  <div>
                    <div className="task-top">
                      <h3>{task.title}</h3>
                      <span className={`status ${task.status.toLowerCase()}`}>
                        {task.status.replace("_", " ")}
                      </span>
                    </div>

                    <p>{task.description || "No description added."}</p>

                    <small>
                      Created: {task.createdAt ? new Date(task.createdAt).toLocaleString() : "N/A"}
                    </small>
                  </div>

                  <div className="task-actions">
                    <select
                      value={task.status}
                      onChange={(event) => handleStatusChange(task, event.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>

                    <button onClick={() => handleEdit(task)}>Edit</button>

                    <button className="danger-button" onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
