import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import type { teamMemberType } from "../App";

export default function TeamMember({ name, category, tasks }: teamMemberType) {
  return (
    <div className="list-disc ml-2 flex flex-row">
      <span className="text-[8px] p-4">
        <FontAwesomeIcon icon={faCircle} />
      </span>
      <div className="flex flex-col">
        <p>Name: {name}</p>
        <p>Role: {category}</p>
      </div>
    </div>
  )

}
