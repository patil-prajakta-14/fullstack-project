import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const API_URL = "https://localhost:7247/api/Tasks"; // change if your port is different

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/${user.userId}`);
      setTasks(res.data);
      console.log("Fetched Tasks:", res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // useEffect(() => {
  //   if (user?.userId) {
  //     fetchTasks();
  //   }
  // }, [user]);


  useEffect(() => {
      if (user?.userId) {
          fetchTasks();
      }
  }, [user, fetchTasks]);

  const handleAddTask = async () => {
    const title = prompt("Enter task title:");
    const description = prompt("Enter task description:");

    if (!title || !description) return;

    const newTask = {
      title,
      description,
      status: "To Do",
      userId: user.userId,
    };

    try {
      const res = await axios.post(API_URL, newTask);

      // Immediately update UI
      setTasks((prevTasks) => [res.data, ...prevTasks]);

      console.log("Added Task:", res.data);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Task not added");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      const updatedTask = { ...task, status: newStatus };

      await axios.put(`${API_URL}/${task.id}`, updatedTask);

      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ? true : task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="main-bg min-vh-100 py-5">
      <div className="container dashboard-container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <h1 className="text-white fw-bold">Get things done.</h1>

          <div className="d-flex align-items-center gap-3">
            <button className="btn create-btn" onClick={handleAddTask}>
              <i className="bi bi-plus-lg me-2"></i>
              CREATE TASK
            </button>

            <button className="logout-icon-btn" onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>

        <hr className="dashboard-line" />

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text search-icon">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control dashboard-input"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-md-end">
            <select
              className="form-select filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">No status filter</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-card shadow-sm mb-4">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div>
                  <h3 className="fw-bold mb-2">{task.title}</h3>
                  <p className="text-muted mb-4">{task.description}</p>

                  <select
                    className="status-dropdown"
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task, e.target.value)
                    }
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="task-card text-center">
            <h4>No tasks found</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;