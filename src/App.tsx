import { useEffect, useState } from 'react';
import './App.css';
import Task from './components/Task';
import AddTask from './components/AddTask';
import AddTeamMember from './components/AddTeamMember';
import TeamMember from './components/TeamMember';
import FilterAndSort from './components/FilterAndSort';
import { ref, set } from 'firebase/database';
import { databse } from './util/firebase';

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
 *
  */
function App() {
  const [tasks, setTasks] = useState<tasksType[]>([{
    id: 'asuh9012', name: 'task 1', timeStamp: new Date(), category: 'Backend', status: 'doing', teamMemberId: '1912uihh'
  }, { id: 'aioasnj20', name: 'task 2', timeStamp: new Date(), category: 'Frontend', status: 'new', teamMemberId: '' },
  { id: 'aklaioaj2098', name: 'task 3', timeStamp: new Date(), category: 'Frontend', status: 'done', teamMemberId: '919123mi' }
  ]);
  const [teamMembers, setTeamMembers] = useState<Array<teamMemberType>>([]);
  const [filteredAndSortedTasks, setFilteredAndSortedTasks] = useState<tasksType[]>(tasks);



  useEffect(() => {
    setTeamMembers([{ id: "919123mi", name: 'Kalle', category: 'Frontend' },
    { id: "1912uihh", name: 'Pelle', category: 'Backend' },
    { id: "998asdib", name: 'Hanna', category: 'UX' }]);

    set(ref(databse, '/' + '123'), {
      test: "testing"
    });
  }, []);

  // Updates FilterAndSortedTasks whenever tasks is updated.
  useEffect(() => {
    setFilteredAndSortedTasks(tasks);
  }, [tasks])

  function applyFilterAndSort(sort: string, filter: string, sortOrder: string, filterValue: string) {
    let tempTasks = [...tasks];
    if (filter === 'category') {
      tempTasks = tempTasks.filter(task => task.category === filterValue);
    }
    else if (filter === 'member') {
      tempTasks = tempTasks.filter(task => task.teamMemberId === filterValue);
    }
    if (sort === 'time' && sortOrder === 'asc') {

      console.log("sorting by time");

      tempTasks.sort(function(x, y) { return x.timeStamp.getTime() - y.timeStamp.getTime() })
    }
    else if (sort === 'time' && sortOrder === 'desc') {
      tempTasks.sort(function(x, y) { return y.timeStamp.getTime() - x.timeStamp.getTime() })
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


          <AddTask tasks={tasks}
            setTasks={setTasks} />
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
          setTeamMembers={setTeamMembers}
          teamMembers={teamMembers}
        />
        <div className='h-full border-l flex flex-col flex-wrap'>
          <p className='font-bold'>Team Members:</p>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} id={member.id} name={member.name} category={member.category} tasks={member.tasks} />
          ))}
        </div>
      </footer>

    </main >
  )
}

export default App
