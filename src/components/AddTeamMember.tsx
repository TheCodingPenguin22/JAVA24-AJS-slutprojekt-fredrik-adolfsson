import { useState } from "react";
import { push, ref, update, type DatabaseReference } from "firebase/database";
import { database } from "../util/firebase";

interface AddTeamMemberProps {
  membersRef: DatabaseReference;
}
export default function AddTeamMember({ membersRef }: AddTeamMemberProps) {
  let name = '';
  let category = 'Frontend';
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name) {
      alert("No name given for new team member. Please enter one.");
      return;
    }

    const newTeamMemberId = push(membersRef).key;
    if (newTeamMemberId) {
      const newTeamMember = {
        name: name,
        category: category,
      };

      const newTeamMemberRef = ref(database, 'members/' + newTeamMemberId);
      update(newTeamMemberRef, newTeamMember);
    }

  }
  return (
    <form className="border-r-1 w-1/3 pr-1 h-full flex flex-col" onSubmit={handleSubmit}>
      <p className="font-bold pl-1">Add Teammember:</p>
      <div className="flex flex-col w-3/5 pl-3">
        <label htmlFor="teamMemberName">Name:</label>
        <input type="text" className="border" name="teamMemberName" onChange={e => name = e.target.value} />
        <label htmlFor="teamMemberCategory">Role:</label>
        <select name="teamMemberCategory" className="border mt-2" onChange={e => category = e.target.value}>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="UX">UX</option>
        </select>
      </div>
      <button type="submit" className="border h-fit w-fit items-center justify-center ml-3 mt-1 cursor-pointer">Add member</button>
    </form>
  )
}
