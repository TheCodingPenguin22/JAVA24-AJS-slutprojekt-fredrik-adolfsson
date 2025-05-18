import type { tasksType, teamMemberType } from "../App";

interface DoingTaskProps {
  id: string;
  tasks: tasksType[];
  teamMembers: teamMemberType[];
  handleStatusChange: Function;
}

export default function DoingTask({ id, tasks, teamMembers, handleStatusChange }: DoingTaskProps) {
  const task = tasks.find(t => t.id === id);
  const assignedTeamMember = teamMembers.find(m => m.id === task?.teamMemberId);

  function handleButtonClick() {
    handleStatusChange('done');
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
