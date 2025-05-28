import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { child, ref, remove } from "firebase/database";
import { database } from "../util/firebase";

interface TeamMemberProps {
  id: string;
  name: string;
  category: string;
}

export default function TeamMember({ id, name, category }: TeamMemberProps) {
  function handleOnClick() {
    // Gets the child with the given id in the members array.
    const memberRef = child((ref(database, 'members')), id);
    if (memberRef) {
      remove(memberRef);
    }
    else {
      alert("Something went wrong! Try again later!");
    }
  }
  return (
    <div className="ml-2 flex flex-row shadow-2xl bg-white p-1 rounded-2xl mt-3 justify-center items-center">
      <span className="text-[8px] p-4">
        <FontAwesomeIcon icon={faCircle} />
      </span>
      <div className="flex flex-col">
        <p>Name: {name}</p>
        <p>Role: {category}</p>
      </div>

      <span className="pl-2 cursor-pointer" onClick={handleOnClick}>
        <FontAwesomeIcon icon={faXmark} />
      </span>
    </div>
  )

}
