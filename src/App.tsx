import { useEffect, useState } from 'react'
import './App.css'
import Task from './components/Task';
import AddTask from './components/AddTask';
import AddTeamMember from './components/AddTeamMember';
import TeamMember from './components/TeamMember';

export interface teamMemberType {
  id: string;
  name: string;
  category: string;
  tasks: string[];
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
    id: 'asuh9012', name: 'task 1', timeStamp: new Date(), category: 'Backend', status: 'doing', teamMemberId: ''
  }, { id: 'aioasnj20', name: 'task 2', timeStamp: new Date(), category: 'Frontend', status: 'new', teamMemberId: '' },
  { id: 'aklaioaj2098', name: 'task 3', timeStamp: new Date(), category: 'Frontend', status: 'done', teamMemberId: '' }
  ]);
  const [teamMembers, setTeamMembers] = useState<Array<teamMemberType>>([]);


  useEffect(() => {
    setTeamMembers([{ id: "919123mi", name: 'Kalle', category: 'Frontend', tasks: [] },
    { id: "1912uihh", name: 'Pelle', category: 'Backend', tasks: [] },
    { id: "998asdib", name: 'Hanna', category: 'UX', tasks: [] }]);

  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks])




  return (
    <main className='h-screen flex flex-col bg-gray-300' >
      <header className='w-full h-20 flex flex-row'>
        <div className='text-3xl font-bold w-1/3 flex justify-center items-center border'>To do</div>
        <div className='text-3xl font-bold w-1/3 flex justify-center items-center border '>Doing</div>
        <div className='text-3xl font-bold w-1/3 flex justify-center items-center border'>Done</div>
      </header>
      <div className='h-[75%] flex flex-row'>
        <div className='h-full border w-1/3 flex flex-col justify-between '>
          <ol className='flex flex-col items-center'>
            {tasks.filter(item => item.status === "new").map(item => (
              <Task key={item.id}
                task={item}
                tasks={tasks}
                setTasks={setTasks}
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers} />
            ))}
          </ol>

          <button onClick={() => {
            const id = '989a87asd';
            const newTask: tasksType = { id: id, name: 'Another task', category: 'UX', timeStamp: new Date(), status: 'new', teamMemberId: '' };
            setTasks([...tasks, newTask])
            setTeamMembers((prevState: teamMemberType[]) =>
              prevState.map((member: teamMemberType) =>
                member.id === id ? { ...member, tasks: [...member.tasks, id] } : member));
            console.log(tasks);

          }}>Click me!</button>

          <AddTask />
        </div>
        <div className='h-full border w-1/3'>
          <ol className='flex flex-col items-center'>
            {tasks.filter((item) => item.status === "doing").map(item => (
              <Task key={item.id}
                task={item}
                tasks={tasks}
                setTasks={setTasks}
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers} />

            ))}

          </ol>
        </div>
        <div className='h-full border w-1/3'>
          <ol className='flex flex-col items-center'>
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
        <AddTeamMember />
        <div className='h-full border-l flex flex-col flex-wrap'>
          <p className='font-bold'>Team Members:</p>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} id={member.id} name={member.name} category={member.category} tasks={member.tasks} />
          ))}
        </div>
      </footer>

    </main>
  )
}

export default App
