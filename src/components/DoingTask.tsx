import { child, ref, update } from "firebase/database";
import type { tasksType, teamMemberType } from "../App";
import { database } from "../util/firebase";

interface DoingTaskProps {
  id: string;
  tasks: tasksType[];
  teamMembers: teamMemberType[];
}

export default function DoingTask({ id, tasks, teamMembers }: DoingTaskProps) {
  const task = tasks.find(t => t.id === id);
  const assignedTeamMember = teamMembers.find(m => m.id === task?.teamMemberId);

  function handleButtonClick() {

    const taskRef = child(ref(database, 'tasks'), id);
    if (taskRef) {
      update(taskRef, { status: 'done' });
    }
    else {
      alert('Opps! Something went wrong! Try Again later!');
    }
  }
  return (
    <div>
      <p>
        {assignedTeamMember
          ? `Assigned to: ${assignedTeamMember.name}`
          : "No team member assigned"}
      </p>
      <button className="border cursor-pointer" onClick={handleButtonClick}>Mark As Done</button>
    </div>
  );
}
