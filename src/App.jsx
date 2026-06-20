import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Form from './components/Form';
import {BsTrash, BsCalendar2Date} from "react-icons/bs";
import Swal from "sweetalert2";
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

  //Persistencia en Local Storage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  //Agregar tarea
  function handleAddTask() {
    if(!title.trim() || !description.trim() || !date){
      Swal.fire ({
        icon: "warning",
        title: "Campos incompletos",
        text: "Completa todos los campos para agregar una tarea"
      });
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
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Tarea agregada",
      showConfirmButton: false,
      timer: 1500
    });
    setTitle('');
    setDescription('');
    setDate('');
    setPriority('Media');
  }

  //Eliminar tarea
  function handleDeleteTask(id) {
    Swal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTasks = tasks.filter(
            (task) => task.id !== id
          );
    
          setTasks(updatedTasks);
    
          Swal.fire({
            title: "Eliminada",
            text: "La tarea fue eliminada correctamente",
            icon: "success",
          });
        }
      });
    }
  //Completar tarea  
  function handleToggleComplete(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  //Fecha actual  
  const today = new Date().toISOString().split("T")[0];
  //Tareas de hoy
  const todayTasks = tasks.filter(
    (task) => task.date === today  
  );
  //Tareas futuras 
  const futureTasks = tasks.filter(
    (task) => task.date > today && !task.completed
  );
  //Agrupar tareas futuras por fecha
  const groupedTasks = {};
  futureTasks.forEach((task) => {
    if (!groupedTasks[task.date]) {
      groupedTasks[task.date] = [];
    }
    groupedTasks[task.date].push(task);
  });
  
  //Filtrar tareas por estado
  const filteredTasks = todayTasks.filter((task) => {
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

              {Object.entries(groupedTasks).map(([date, tasks])  => {
                const [year, month, day] = date.split("-");
                const formattedDate = `${day}/${month}/${year}`;
                return(
              <div key={date} className="upcoming-card">
                <p>
                  <BsCalendar2Date />
                  {formattedDate} ({tasks.length})
                </p>

                  {tasks.map((task) => (
                    <div key={task.id} className="upcoming-task">
                      <span>{task.title}</span>

                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                        <BsTrash/>
                        </button>
                    </div>
              ))}
              </div>
              );
        })}
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