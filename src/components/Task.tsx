import { faCaretLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AssignTask from "./AssignTask";
import type { tasksType, teamMemberType } from "../App";
import MarkTaskAsDone from "./MarkTaskAsDone";
import RemoveTask from "./RemoveTask";

interface TaskProps {
  task: tasksType;
  tasks: tasksType[];
  setTasks: Function;
  teamMembers: teamMemberType[];
  setTeamMembers: Function;
}
/*
 * This component is responsible for rendering a given task.
 *
 * If status of task is 'new' it renders the AssignTask component.
 * If status is 'doing' it renders MarkAsDoneTask component.
 * If statis is 'done' it renders RemoveTask component.
 */
export default function Task({ task, tasks, teamMembers }: TaskProps) {
  // Tries to find the latest version of the task and if it does not find it it uses the given task.
  const latesetTask = tasks.find(t => t.id === task.id) ?? task;
  const { id, name, timeStamp, category, status } = latesetTask;
  // Format Date
  const timeStampString = new Date(timeStamp).toString().substring(4, 21);
  const formatedDateString = timeStampString.slice(3, 6) + '/' + timeStampString.slice(0, 3) + '/' + timeStampString.slice(7);

  return (
    <li className=" ml-10 flex flex-row w-fit items-center shadow-2xl mt-3 bg-white p-1 rounded-2xl px-4 min-w-50" >
      <span className="text-[8px] pr-4">
        <FontAwesomeIcon icon={faCircle} />
      </span>
      <details className="w-full">
        <summary className="flex flex-row justify-between w-full cursor-pointer">
          <p className="font-bold">{name}</p>

          <span className="mr-4 size-0.5">
            <FontAwesomeIcon id="icon" icon={faCaretLeft} className="fa-lg" />
          </span>
        </summary>
        <div className="flex flex-col">
          <p>{formatedDateString}</p>
          <div>
            <p>{category}</p>
          </div>
          <div>
            {status === 'new' && <AssignTask id={id}
              // This filter filters out all the team members that do not have the same category as the task.
              teamMembersFiltered={teamMembers.filter(member => member.category === category)}
            />}
            {status === 'doing' && <MarkTaskAsDone id={id}
              tasks={tasks}
              teamMembers={teamMembers}
            />}
            {status === 'done' && <RemoveTask id={id}
              tasks={tasks}
              teamMembers={teamMembers}
            />}

          </div>
        </div>
      </details>
    </li>
  )
}
