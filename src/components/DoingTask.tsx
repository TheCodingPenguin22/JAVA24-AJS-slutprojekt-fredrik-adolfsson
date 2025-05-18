import { useEffect } from "react";
import type { tasksType, teamMemberType } from "../App";

interface DoingTaskProps {
  id: string;
  handleStatusChange: Function;
  tasks: tasksType[];
  setTasks: Function;
  teamMembers: teamMemberType[];
}

export default function DoingTask({ id, handleStatusChange, tasks, setTasks, teamMembers }: DoingTaskProps) {
  const task = tasks.find(t => t.id === id);
  const assignedTeamMember = teamMembers.find(m => m.id === task?.teamMemberId);
  useEffect(() => {
    console.log("🔥 task.teamMemberId:", task?.teamMemberId);
    console.log("🔥 assignedTeamMember:", assignedTeamMember);
  }, [tasks])
  return (
    <div>
      <p>
        {assignedTeamMember
          ? `Assigned to: ${assignedTeamMember.name}`
          : "No team member assigned"}
      </p>
      <button className="border ">Mark As Done</button>
    </div>
  );
}
