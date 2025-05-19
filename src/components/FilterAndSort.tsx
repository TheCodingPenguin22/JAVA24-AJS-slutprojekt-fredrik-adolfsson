import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import type { teamMemberType } from "../App";

interface FlterAndSortProps {
  applyFilterAndSort: Function;
  teamMembers: teamMemberType[];
}

export default function FilterAndSort({ applyFilterAndSort, teamMembers }: FlterAndSortProps) {
  const [filter, setFilter] = useState<string>('none')
  const [filterValue, setFilterValue] = useState<string>('frontend');
  const [sort, setSort] = useState<string>('none');
  const [sortOder, setSortOrder] = useState<string>('asc')

  // Handles the submit from the form
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    applyFilterAndSort(sort, filter, sortOder, filterValue);
  }

  // Sets the filterValue to a default value when swhitching the filter category 
  useEffect(() => {
    if (filter === 'member') {
      if (teamMembers.length > 0) {
        setFilterValue(teamMembers[0].id);
      }
    }
    else if (filter === 'category') {
      setFilterValue('Frontend');
    }
  }, [filter])

  return (
    <details className="border-t-2">
      <summary className="flex flex-row justify-between cursor-pointer">
        <p className="font-bold pl-1">Filter And Sort</p>
        <span className="mr-4 size-0.5">
          <FontAwesomeIcon id="icon" icon={faCaretLeft} className="fa-lg" />
        </span>
      </summary>

      <form className="flex flex-col justify-center pl-3" onSubmit={handleSubmit}>
        <div className="flex flex-row mb-2">
          <label htmlFor="filter" className="font-bold ">Filter:</label>
          <select name="filter"
            className="border ml-2"
            onChange={e => setFilter(e.target.value)}
          >
            <option value="none">None</option>
            <option value="member">Member</option>
            <option value="category">Category</option>
          </select>
          {
            filter === 'member' &&

            <div>
              <label htmlFor="member" className="font-bold ml-2">Member: </label>
              <select name="member" className="border ml-2" onChange={e => setFilterValue(e.target.value)}>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>
          }
          {filter === 'category' &&
            <div>
              <label htmlFor="category" className="font-bold ml-2">Category: </label>
              <select name="category" className="border ml-2" onChange={e => setFilterValue(e.target.value)}>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="UX">UX</option>
              </select>
            </div>
          }
        </div>
        <div className="mb-2 flex flex-row">
          <label htmlFor="sort" className="font-bold">Sort:</label>
          <select name="sort"
            className="border ml-2"
            onChange={e => setSort(e.target.value)}
          >
            <option value="none">None</option>
            <option value="time">Time</option>
            <option value="title">Title</option>
          </select>
          {sort !== 'none' &&
            <div>
              <label htmlFor="order" className="font-bold ml-2">Order:</label>
              <select name="order" className="border ml-2" onChange={e => setSortOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          }

        </div>
        <button type="submit" className="border cursor-pointer">Apply Filter</button>
      </form >
    </details>
  )
}
