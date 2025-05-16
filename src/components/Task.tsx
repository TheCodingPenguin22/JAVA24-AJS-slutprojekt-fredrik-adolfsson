import type { teamMemberType } from "../App";

interface TaskProps {
  id: string;
  name: string;
  timeStamp: number;
  category: string;
  status: string
  teamMember: teamMemberType | undefined;
}

export default function Task({ id, name, timeStamp, category, status, teamMember }: TaskProps) {
  function handleStatusChange() {
    console.log("status change");
  }
  return (
    <li className=" ml-10 list-disc" onClick={handleStatusChange}>
      <p>{name}</p>
    </li>
  )
}
