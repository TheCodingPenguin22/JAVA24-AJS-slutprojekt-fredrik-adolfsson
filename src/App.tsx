import { useEffect, useState } from 'react';
import './App.css';
import Task from './components/Task';
import AddTask from './components/AddTask';
import AddTeamMember from './components/AddTeamMember';
import TeamMember from './components/TeamMember';
import FilterAndSort from './components/FilterAndSort';
import { onValue, ref } from 'firebase/database';
import { database } from './util/firebase';

export interface teamMemberType {
  id: string;
  name: string;
  category: string;
}
export interface tasksType {
  id: string;
  name: string;
  timeStamp: Date;
  category: string;
  status: string;
  teamMemberId: string;
}
/*
 * This is the main app function.
 * This is where the main structure of the page is made and all the components are added.
 *
  */
function App() {
  const [tasks, setTasks] = useState<tasksType[]>([]);
  const [teamMembers, setTeamMembers] = useState<Array<teamMemberType>>([]);
  const [filteredAndSortedTasks, setFilteredAndSortedTasks] = useState<tasksType[]>(tasks);

  const membersRef = ref(database, 'members');
  const taskRef = ref(database, 'tasks');



  useEffect(() => {
    try {
      onValue(membersRef, snapshot => {
        const teamMemberstemp: teamMemberType[] = [];
        const members = snapshot.val();

        for (const member in members) {
          teamMemberstemp.push({
            id: member,
            name: members[member].name,
            category: members[member].category
          })
        }
        setTeamMembers(teamMemberstemp);
      })

      onValue(taskRef, snapshot => {
        const tasksTemp: tasksType[] = [];
        const tasksSnapshot = snapshot.val();

        for (const task in tasksSnapshot) {
          tasksTemp.push({
            id: task,
            name: tasksSnapshot[task].name,
            timeStamp: tasksSnapshot[task].timeStamp,
            category: tasksSnapshot[task].category,
            status: tasksSnapshot[task].status,
            teamMemberId: tasksSnapshot[task].teamMemberId,
          })
        }
        setTasks(tasksTemp);
      })
    }
    catch (error) {
      alert('Opps! Something went wrong! Try again later!');
    }
  }, []);

  // Updates FilterAndSortedTasks whenever tasks is updated.
  useEffect(() => {
    setFilteredAndSortedTasks(tasks);
  }, [tasks])

  function applyFilterAndSort(sort: string, filter: string, sortOrder: string, filterValue: string) {
    let tempTasks = [...tasks];
    if ((sort || filter || sortOrder || filterValue) === null) {
      alert("Opps! Something went wrong! Try again later;")
    }
    if (filter === 'category') {
      tempTasks = tempTasks.filter(task => task.category === filterValue);
    }
    else if (filter === 'member') {
      tempTasks = tempTasks.filter(task => task.teamMemberId === filterValue);
    }
    if (sort === 'time' && sortOrder === 'asc') {
      tempTasks.sort(function (x, y) { return Number(x.timeStamp) - Number(y.timeStamp) })
    }
    else if (sort === 'time' && sortOrder === 'desc') {
      tempTasks.sort(function (x, y) { return Number(y.timeStamp) - Number(x.timeStamp) })
    }
    if (sort === 'title' && sortOrder === 'asc') {
      tempTasks.sort((x, y) => y.name.localeCompare(x.name));
    }
    else if (sort === 'title' && sortOrder === 'desc') {
      tempTasks.sort((x, y) => x.name.localeCompare(y.name));
    }

    setFilteredAndSortedTasks(tempTasks);
  }





  return (
    <main className='max-h-screen h-screen flex flex-col bg-gray-300' >
      <header className='w-full h-20 flex flex-row'>
        <div className='text-3xl font-bold w-1/3 flex justify-center items-center border'>To do</div>
        <div className='text-3xl font-bold w-1/3 flex justify-center items-center border '>Doing</div>
        <div className='text-3xl font-bold w-1/3 flex justify-center items-center border'>Done</div>
      </header>
      <div className='h-[75%] flex flex-row'>
        <div className='h-full border w-1/3 flex flex-col justify-between '>
          <ol className='flex flex-col items-center  overflow-scroll'>
            {tasks.filter(item => item.status === "new").map(item => (
              <Task key={item.id}
                task={item}
                tasks={tasks}
                setTasks={setTasks}
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers} />
            ))}
          </ol>


          <AddTask tasksRef={taskRef} />
        </div>
        <div className='h-full border w-1/3 flex flex-col justify-between'>
          <ol className='flex flex-col items-center overflow-scroll'>
            {filteredAndSortedTasks.filter((item) => item.status === "doing").map(item => (
              <Task key={item.id}
                task={item}
                tasks={tasks}
                setTasks={setTasks}
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers} />

            ))}

          </ol>

          <FilterAndSort teamMembers={teamMembers}
            applyFilterAndSort={applyFilterAndSort}
          />
        </div>
        <div className='h-full border w-1/3'>
          <ol className='flex flex-col items-center overflow-scroll'>
            {tasks.filter((item) => item.status === "done").map(item => (
              <Task key={item.id}
                task={item}
                tasks={tasks}
                setTasks={setTasks}
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers} />
            ))}

          </ol>
        </div>
      </div>
      <footer className='h-50 w-full border flex flex-row'>
        <AddTeamMember
          membersRef={membersRef}
        />
        <div className='h-full border-l flex flex-col flex-wrap'>
          <p className='font-bold'>Team Members:</p>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} id={member.id} name={member.name} category={member.category} />
          ))}
        </div>
      </footer>

    </main >
  )
}

export default App
