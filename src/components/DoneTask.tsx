import type { tasksType, teamMemberType } from "../App";

interface DoneTaskProps {
  id: string;
  tasks: tasksType[];
  teamMembers: teamMemberType[];
  removeTask: Function;
}
export default function DoneTask({ id, tasks, teamMembers, removeTask }: DoneTaskProps) {
  const task = tasks.find(t => t.id === id);
  const assignedTeamMember = teamMembers.find(m => m.id === task?.teamMemberId);

  function handleButtonClick() {
    removeTask();
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
