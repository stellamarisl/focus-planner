//Componente para tareas individuales
function Todo({ task, handleToggleComplete, handleDeleteTask }) {
    const formattedDate = new Date(task.date).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
    return (
        <div
            className={`task-card ${task.completed ? "completed" : ""}`}
        >
            <h3>{task.title}</h3>

            <p className="task-date">
                📅 {formattedDate}
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