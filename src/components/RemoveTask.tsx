import { child, ref, remove } from "firebase/database";
import type { tasksType, teamMemberType } from "../App";
import { database } from "../util/firebase";

interface DoneTaskProps {
  id: string;
  tasks: tasksType[];
  teamMembers: teamMemberType[];
}
export default function DoneTask({ id, tasks, teamMembers }: DoneTaskProps) {
  // Finds the current task with the id.
  const task = tasks.find(t => t.id === id);
  // Finds the assigned team member.
  const assignedTeamMember = teamMembers.find(m => m.id === task?.teamMemberId);

  function handleButtonClick() {
    // Find the child with the given id in the tasks array.
    const taskRef = child(ref(database, 'tasks'), id);
    if (taskRef) {
      remove(taskRef);
    }
    else {
      alert('Opps! Something went wrong! Try again later!');
    }
  }
  return (
    <div>
      <p>
        {assignedTeamMember
          ? `Assigned to: ${assignedTeamMember.name}`
          : "No team member assigned"}
      </p>
      <button className="border cursor-pointer" onClick={handleButtonClick}>Remove task</button>
    </div>
  )
}
