export function Task(props) {
  return (
    <div className="textDiv">
      <input className="checkBox" type="checkbox" />
      <h2 className="taskName">{props.taskName}</h2>
      <button className="deleteBtn" onClick={() => props.deleteTask(props.id)}>
        X
      </button>
    </div>
  );
}
