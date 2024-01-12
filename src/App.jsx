import "./App.css";
import { useState } from "react";
import { Task } from "./Task";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    const task = {
      id: todoList.length === 0 ? 0 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
    };
    setTodoList([...todoList, task]);
  }

  function deleteTask(id) {
    setTodoList(todoList.filter((name) => name.id !== id));
  }

  return (
    <div>
      <div className="addTask">
        <input className="inputBox" onChange={handleChange} type="text" />
        <button className="enterBtn" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className="taskList">
        {todoList.map((task, key) => {
          return (
            <Task
              key={key}
              taskName={task.taskName}
              id={task.id}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
