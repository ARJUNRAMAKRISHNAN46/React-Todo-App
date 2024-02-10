import "./App.css";
import { useState, useEffect } from "react";
import { Task } from "./Task";
import Modal from "react-modal";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("todoList"));
    return storedTasks || [];
  });

  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("useEffect is running");
    const storedTasks = JSON.parse(localStorage.getItem("todoList"));
    console.log("Stored Tasks:", storedTasks);
    if (storedTasks) {
      setTodoList(storedTasks);
    }
    //   return () => {
    //     console.log('cleaned up');
    //     alert('cleaned up')
    // };
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {

    const isTaskUnique = todoList.every((task) => task.taskName !== newTask);

    if (!isTaskUnique) {
      alert('Task already exists!');
      return;
    }

    if (editTaskId !== null) {
      setTodoList((prevList) =>
        prevList.map((task) =>
          task.id === editTaskId ? { ...task, taskName: newTask } : task
        )
      );
      setEditTaskId(null);
    } else {
      const task = {
        id: todoList.length === 0 ? 0 : todoList[todoList.length - 1].id + 1,
        taskName: newTask,
        checked: false,
      };
      if (newTask.trim().length > 0) {
        setTodoList([...todoList, task]);
      }
    }
    setNewTask("");
    closeEditModal();
  }

  function toggleCheckbox(id) {
    setTodoList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  }

  function deleteTask(id) {
    setTodoList(todoList.filter((name) => name.id !== id));
  }

  function editTask(id) {
    
    const taskToEdit = todoList.find((task) => task.id === id);
    setNewTask(taskToEdit.taskName);
    setEditTaskId(id);
    openEditModal();
  }

  function openEditModal() {
    setIsModalOpen(true);
  }

  function closeEditModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="headDiv">
      <div className="addTask">
        <input
          className="inputBox"
          onChange={handleChange}
          value={newTask}
          type="text"
          placeholder="Add new Task"
        />
        <button className="enterBtn" onClick={addTask}>
          {editTaskId !== null ? "Edit Task" : "Add Task"}
        </button>
      </div>
      <div className="taskList">
        {todoList.map((task, key) => {
          return (
            <Task
              key={key}
              taskName={task.taskName}
              id={task.id}
              checked={task.checked}
              editTask={editTask}
              toggleCheckbox={toggleCheckbox}
              deleteTask={deleteTask}
            />
          );
          // console.log(task.id)
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Task Modal"
      >
        <h2 className="modalName">Edit Task</h2>
        <input
          className="inputBox"
          onChange={handleChange}
          type="text"
          value={newTask}
        />
        <button className="entBtn" onClick={addTask}>
          Edit Task
        </button>
        <button className="canBtn" onClick={closeEditModal}>
          cancel
        </button>
      </Modal>
    </div>
  );
}

export default App;
