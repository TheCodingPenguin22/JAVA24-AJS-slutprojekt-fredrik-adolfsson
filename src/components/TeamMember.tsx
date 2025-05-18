import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import type { teamMemberType } from "../App";

export default function TeamMember({ name, category }: teamMemberType) {
  return (
    <div className="ml-2 flex flex-row shadow-2xl bg-white p-1 rounded-2xl mt-3">
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
