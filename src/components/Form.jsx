function Form({
    title,
    setTitle,
    description,
    setDescription,
    date,
    setDate,
    priority,
    setPriority,
    handleAddTask,
  }) {
    return (
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
  
        <button onClick={handleAddTask}>
          Agregar tarea
        </button>
      </section>
    );
  }
  
  export default Form;