import { useEffect, useState } from "react";
import type { teamMemberType } from "../App";
import { child, ref, update } from "firebase/database";
import { database } from "../util/firebase";

interface newTaskProps {
  teamMembersFiltered: teamMemberType[];
  id: string;
}

/*
 * This component is rendered when the task has the status new.
 *
 * The purpose of this component is the assign a team member to the task and change the status to 'doing'
 */
export default function NewTask({ id, teamMembersFiltered }: newTaskProps) {

  const [selectedTeamMember, setSelectedTeamMember] = useState<string>(() =>
    teamMembersFiltered.length > 0 ? teamMembersFiltered[0].id : '');

  useEffect(() => {
    if (teamMembersFiltered.length > 0) {
      setSelectedTeamMember(teamMembersFiltered[0].id);
    }
  }, [teamMembersFiltered])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Makes sure that there is some value in the selectedTeamMember variable.
    if (!selectedTeamMember) return;

    const taskRef = child(ref(database, 'tasks'), id);
    if (taskRef) {
      update(taskRef, {
        status: 'doing',
        teamMemberId: selectedTeamMember
      });
    }
    else {
      alert('Opps! Something went wrong! Try again later!');
    }

  }
  return (
    <form className="flex flex-row justify-between mr-4" onSubmit={handleSubmit}>
      <select className="border rounded-md p-1" onChange={(event) => setSelectedTeamMember(event.target.value)} >

        {teamMembersFiltered.map((member) => (
          <option key={member.id} value={member.id}>{member.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-purple-600 text-white px-2 rounded-2xl">Add</button>
    </form >
  )
}
