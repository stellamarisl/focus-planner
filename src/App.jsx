import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Form from './components/Form';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Media');
  const [filter, setFilter] = useState('all');

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

          <Form
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              date={date}
              setDate={setDate}
              priority={priority}
              setPriority={setPriority}
              handleAddTask={handleAddTask}
          /> 

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

              <TodoList
                tasks={filteredTasks}
                handleToggleComplete={handleToggleComplete}
                handleDeleteTask={handleDeleteTask}
              />

          </section>

        </main>
    </div>
  );
}

export default App;