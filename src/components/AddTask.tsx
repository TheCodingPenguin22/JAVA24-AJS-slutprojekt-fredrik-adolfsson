import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { useState } from "react";
import { push, ref, update, type DatabaseReference } from "firebase/database";
import { database } from "../util/firebase";

interface AddTaskProps {
  tasksRef: DatabaseReference;
}
/*
 * The purpose of this component is to add a task.
 *
 * This is done through a form element.
 * The form is hidden with a details tag. 
 * Very nice! 
 * No js(ts) needed!
 */
export default function AddTask({ tasksRef }: AddTaskProps) {
  const [taskName, setTaskName] = useState<string>('')
  const [taskCategory, setTaskCategory] = useState<string>('Frontend');

  // Handles the adding of a new task
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!taskName) {
      alert("No task name given. Please enter a name for the new task.");
      return;
    }

    const newTaskId = push(tasksRef).key;

    if (newTaskId) {
      const newTask = {
        name: taskName,
        category: taskCategory,
        timeStamp: Date.now(),
        status: 'new',
        TeamMemberId: ''
      };

      const newTaskRef = ref(database, 'tasks/' + newTaskId);
      update(newTaskRef, newTask);
    }



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
          <button type="submit" className="border w-fit self-center my-3 cursor-pointer">Add Task</button>
        </div>
      </form>
    </details>
  );
}
