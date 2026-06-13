import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Media');
  const [filter, setFilter] = useState('all');

  function handleAddTask() {
    if(!title.trim() || !description.trim() || !date){
      alert("Completa todos los campos para agregar una tarea.");
        return;
    }
    const newTask = {
      id: Date.now(),
      title,
      description,
      date,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDate('');
    setPriority('Media');
  }

  function handleDeleteTask(id) {
    const confirmDelete = window.confirm("¿Deseas eliminar esta tarea?");
    if(!confirmDelete){
      return;
    }
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }
  function handleToggleComplete(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

    
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
  
    if (filter === "pending") {
      return !task.completed;
    }
  
    return true;
  });
  

  return (
    <div className="app">
      <header className="header">
        <h1>Focus Planner</h1>
        <p>Organiza tus tareas, prioridades y objetivos</p>
      </header>

        <main className="container">
          <div className = "top-section"> 

              <section className="task-form">
                  <h2>Nueva tarea</h2>

                  <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Título de la tarea"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  />

                  <textarea
                  id="description"
                  name="description"
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  ></textarea>

                  <input
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  />

                <select
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>

                <button onClick={handleAddTask}>Agregar tarea</button>
              </section>

            <aside className="upcoming-tasks">
              <h2>Próximos días</h2>

              <div className = "upcoming-card">
                <p>📅18/06/2026</p>
                <span> 2 tareas programadas</span>
              </div>

              <div className="upcoming-card">
                <p> 📅20/06/2026</p>
                <span>1 tarea programada</span>
              </div>

              <div className="upcoming-card">
                <p> 📅22/06/2026</p>
                <span>4 tareas programadas</span>
              </div>

            </aside>
          </div>

          <section className="task-list">
            <h2>Mis tareas</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todas</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
            </select>

            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.completed ? "completed" : ""}`}
              >
                <h3>{task.title}</h3>
                <p className="task-date">
                  📅 {task.date}
                </p>
                <p>{task.description}</p>
                
                <span>{task.priority} Prioridad</span>
                <div className="task-actions">
                  <button
                    className="complete-btn"
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    {task.completed ? "Desmarcar" : "Completada"}
                  </button>

                <button className= "delete-btn"
                onClick={() => handleDeleteTask(task.id)}>
                Eliminar
                </button>
              </div>
            </div>
            ))}

          </section>

        </main>
    </div>
  );
}

export default App;