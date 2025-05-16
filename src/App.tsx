import { useEffect, useRef, useState } from 'react'
import './App.css'
import Task from './components/Task';
import AddTask from './components/AddTask';
import AddTeamMember from './components/AddTeamMember';
import TeamMember from './components/TeamMember';
export interface teamMemberType {
  name: string;
  category: string;
  tasks: tasksType[] | undefined;
}
export interface tasksType {
  id: string;
  name: string;
  timeStamp: number;
  catagory: string;
  status: string;
  teamMember: teamMemberType | undefined;
}

function App() {
  let tasks = useRef<tasksType[]>([{
    id: 'asuh9012', name: 'task 1', timeStamp: Date.now(), catagory: 'backend', status: 'doing', teamMember: undefined
  }, { id: 'aioasnj20', name: 'task 2', timeStamp: Date.now(), catagory: 'frontend', status: 'new', teamMember: undefined },
  { id: 'aioasnj20', name: 'task 3', timeStamp: Date.now(), catagory: 'frontend', status: 'done', teamMember: undefined }
  ]);
  const [teamMembers, setTeamMembers] = useState<Array<teamMemberType>>([]);


  useEffect(() => {
    console.log('setting teamMembers');


    setTeamMembers([{ name: 'Kalle', category: 'frontend', tasks: [tasks.current[1]] }, { name: 'Pelle', category: 'backend', tasks: [tasks.current[0]] }, { name: 'Hanna', category: 'UX', tasks: [] }]);

  }, []);



  console.log(teamMembers[2]);
  console.log(tasks.current[0]);



  return (
    <main className='h-screen flex flex-col' >
      <header className='w-full h-20 flex flex-row'>
        <div className='text-3xl font-bold w-1/3 flex justify-center items-center border'>To do</div>
        <div className='text-3xl font-bold w-1/3 flex justify-center items-center border '>Doing</div>
        <div className='text-3xl font-bold w-1/3 flex justify-center items-center border'>Done</div>
      </header>
      <div className='h-[75%] flex flex-row'>
        <div className='h-full border w-1/3 flex flex-col justify-between'>
          <ol>
            {tasks.current.filter((item) => item.status === "new").map(item => (
              <Task key={item.id} id={item.id} name={item.name} timeStamp={item.timeStamp} category={item.catagory} status={item.status} teamMember={item.teamMember} />
            ))}
          </ol>

          <button onClick={() => {
            tasks.current.push({ id: '989a87asd', name: 'Another task', catagory: 'frontend', timeStamp: Date.now(), status: 'new', teamMember: undefined });
            console.log(tasks);
            setTeamMembers(prevState => {
              const newState = [...prevState];
              newState[2].tasks?.push(tasks.current[tasks.current.length - 1]);
              return newState;
            })
          }}>Click me!</button>

          <AddTask />
        </div>
        <div className='h-full border w-1/3'>
          {tasks.current.filter((item) => item.status === "doing").map(item => (
            <Task key={item.id} id={item.id} name={item.name} timeStamp={item.timeStamp} category={item.catagory} status={item.status} teamMember={item.teamMember} />
          ))}
        </div>
        <div className='h-full border w-1/3'>
          {tasks.current.filter((item) => item.status === "done").map(item => (
            <Task key={item.id} id={item.id} name={item.name} timeStamp={item.timeStamp} category={item.catagory} status={item.status} teamMember={item.teamMember} />
          ))}
        </div>
      </div>
      <footer className='h-40 w-full border flex flex-row'>
        <AddTeamMember />
        <div className='h-full border-l flex flex-col flex-wrap'>
          <p className='font-bold'>Team Members:</p>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} name={member.name} category={member.category} tasks={member.tasks} />
          ))}
        </div>
      </footer>

    </main>
  )
}

export default App
