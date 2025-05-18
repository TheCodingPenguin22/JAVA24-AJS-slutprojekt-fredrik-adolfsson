import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import type { tasksType } from "../App";
import { useState } from "react";

interface AddTaskProps {
  setTasks: Function;
  tasks: tasksType[];
}
/*
 * The purpose of this component is to add a task.
 *
 * This is done through a form element.
 * The form is hidden with a details tag. 
 * Very nice! 
 * No js(ts) needed!
 */
export default function AddTask({ setTasks, tasks }: AddTaskProps) {
  const [taskName, setTaskName] = useState<string>('')
  const [taskCategory, setTaskCategory] = useState<string>('Frontend');

  // Handles the adding of a new task
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("submit");

    if (!taskCategory) {

    }
    const newTask: tasksType = { id: String(Math.random()), name: taskName, category: taskCategory, timeStamp: new Date(), status: 'new', teamMemberId: '' };

    setTasks([...tasks, newTask]);

    console.log(tasks);

  }
  return (
    <details className="border-t-2">
      <summary className="flex flex-row justify-between cursor-pointer">
        <p className="font-bold pl-1">Add Task</p>
        <span className="mr-4 size-0.5">
          <FontAwesomeIcon id="icon" icon={faCaretLeft} className="fa-lg" />
        </span>
      </summary>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col mr-3 ml-3">
          <label htmlFor="taskName">Name of Task:</label>
          <input type="text" className="border" name="taskName" onChange={e => setTaskName(e.target.value)} />

          <label htmlFor="taskCategory">Category:</label>
          <select name="taskCategory"
            className="border"
            defaultValue={'Frontend'} onChange={e => setTaskCategory(e.target.value)}>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="UX">UX</option>
          </select>
          <button type="submit" className="border w-fit self-center my-3">Add Task</button>
        </div>
      </form>
    </details>
  );
}
