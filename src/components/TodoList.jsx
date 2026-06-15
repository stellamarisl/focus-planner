import Todo from "./Todo";

function TodoList({ tasks, handleToggleComplete, handleDeleteTask }) {
        return (
        <>
            {tasks.map((task) => (
                <Todo
                    key={task.id}
                    task={task}
                    handleToggleComplete={handleToggleComplete}
                    handleDeleteTask={handleDeleteTask}
                />
            ))}
        </>
        );
}

export default TodoList;
