import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";

/*
 * The purpose of this component is to add a task.
 *
 * This is done through a form element.
 * The form is hidden with a details tag. 
 * Very nice! 
 * No js(ts) needed!
 */
export default function AddTask() {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("submit");

  }
  return (
    <details className="border-t-2">
      <summary className="flex flex-row justify-between">
        <p className="font-bold pl-1">Add Task</p>
        <span className="mr-4 size-0.5">
          <FontAwesomeIcon id="icon" icon={faCaretLeft} className="fa-lg" />
        </span>
      </summary>
      <form className=" " onSubmit={handleSubmit}>
        <div className="flex flex-col mr-3 ml-3">
          <label htmlFor="taskName">Name of Task:</label>
          <input type="text" className="border" name="taskName" />

          <label htmlFor="taskCategory">Category:</label>
          <select name="taskCategory" className="border">
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
