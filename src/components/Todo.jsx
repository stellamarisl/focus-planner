//Componente para tareas individuales
function Todo({ task, handleToggleComplete, handleDeleteTask }) {
    return (
        <div
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
                    {task.completed ? "Desmarcar" : "Completar"}
                </button>

                <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default Todo;