export function Task(props) {
  return (
    <div className="textDiv">
      <div className="firstDiv">
      <input
        className="checkBox"
        type="checkbox"
        checked={props.checked}
        onChange={() => props.toggleCheckbox(props.id)}
      />
      <h2 className="taskName">{props.taskName}</h2>
      </div>
      <div>
      <button className="editBtn" onClick={() => props.editTask(props.id)}>
        Edit
      </button>
      <button className="deleteBtn" onClick={() => props.deleteTask(props.id)}>
        Delete
      </button>
      </div>
    </div>
  );
}
