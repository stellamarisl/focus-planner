import { BsTrash, BsCalendar2Date, BsCheckCircle } from "react-icons/bs";
import { FcHighPriority, FcMediumPriority, FcLowPriority } from "react-icons/fc";
//Componente para tareas individuales
function Todo({ task, handleToggleComplete, handleDeleteTask }) {
    const [year, month, day] = task.date.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return (
        <div
            className={`task-card ${task.completed ? "completed" : ""}`}
        >
            <h3>{task.title}</h3>

            <p className="task-date">
                <BsCalendar2Date /> {formattedDate}
            </p>

            <p>{task.description}</p>

            <p>
                {task.priority === "Alta" && <FcHighPriority />}
                {task.priority === "Media" && <FcMediumPriority />}
                {task.priority === "Baja" && <FcLowPriority />}
                {task.priority} Prioridad
            </p>

            <div className="task-actions">
                <button
                    className="complete-btn"
                    onClick={() => handleToggleComplete(task.id)}
                    >
                        <BsCheckCircle /> {task.completed ? "Desmarcar" : "Completar"}
                </button>

                <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task.id)}
                >
                    <BsTrash/>
                </button>
            </div>
        </div>
    );
}

export default Todo;