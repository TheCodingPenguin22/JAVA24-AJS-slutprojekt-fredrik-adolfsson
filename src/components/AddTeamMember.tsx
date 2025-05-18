import { useState } from "react";
import type { teamMemberType } from "../App";

interface AddTeamMemberProps {
  setTeamMembers: Function;
  teamMembers: teamMemberType[];
}
export default function AddTeamMember({ setTeamMembers, teamMembers }: AddTeamMemberProps) {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('Frontend');
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newTeamMember: teamMemberType = { id: String(Math.random()), name: name, category: category, tasks: [] };
    setTeamMembers([
      ...teamMembers,
      newTeamMember
    ])
  }
  return (
    <form className="border-r-1 w-1/3 pr-1 h-full flex flex-col" onSubmit={handleSubmit}>
      <p className="font-bold pl-1">Add Teammember:</p>
      <div className="flex flex-col w-3/5 pl-3">
        <label htmlFor="teamMemberName">Name:</label>
        <input type="text" className="border" name="teamMemberName" onChange={e => setName(e.target.value)} />
        <label htmlFor="teamMemberCategory">Role:</label>
        <select name="teamMemberCategory" className="border mt-2" onChange={e => setCategory(e.target.value)}>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="UX">UX</option>
        </select>
      </div>
      <button type="submit" className="border h-fit w-fit items-center justify-center ml-3 mt-1">Add member</button>
    </form>
  )
}
