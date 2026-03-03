import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; 

export default function App() {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    axios
      .get("http://localhost:8080/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    axios
      .post("http://localhost:8080/api/tasks", {
        title,
        description,
        status: "PENDING",
      })
      .then(() => {
        setTitle("");
        setDescription("");
        fetchTasks();
      });
  };
  const deleteTask = (id) => {
  axios
    .delete(`http://localhost:8080/api/tasks/${id}`)
    .then(() => fetchTasks());
};
const toggleStatus = (task) => {
  const newStatus = task.status === "PENDING" ? "COMPLETED" : "PENDING";

  axios
    .put(`http://localhost:8080/api/tasks/${task.id}/status`, {
      status: newStatus,
    })
    .then(() => fetchTasks());
};
const createTask = (e) => {
  e.preventDefault();

  axios
    .post("http://localhost:8080/api/tasks", {
      title,
      description,
      status: "PENDING",
    })
    .then(() => {
      setTitle("");
      setDescription("");
      fetchTasks();
    });
};

return (
  <div className="container">
    <div className="card">
      <h1>Task List</h1>
      <div className="subtitle">React + Spring Boot + MySQL</div>

      <div className="formRow">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btnPrimary" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="list">
        {tasks.length === 0 ? (
          <div className="desc">No tasks found</div>
        ) : (
          tasks.map((t) => (
            <li className="item" key={t.id}>
              <div className="itemLeft">
                <div className="titleRow">
                  <strong>{t.title}</strong>
                  <span
                    className={
                      "badge " + (t.status === "DONE" ? "badgeDone" : "badgePending")
                    }
                  >
                    {t.status}
                  </span>
                </div>
                <div className="desc">{t.description}</div>
              </div>

              <div className="actions">
                <button className="btn btnSecondary" onClick={() => toggleTask(t.id)}>
                  Toggle
                </button>
                <button className="btn btnDanger" onClick={() => deleteTask(t.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  </div>
);}