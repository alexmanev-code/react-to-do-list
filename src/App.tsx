import React,{FC, ChangeEvent, useState} from 'react';
import './App.css';
import { ITask } from './interfaces';
import TodoTask from './Components/TodoTask';

const App :FC = () =>  {

  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);


  const handleChange = (event: ChangeEvent<HTMLInputElement>):void => {
    if (event.target.name === 'task') {
    setTask(event.target.value);
    }
    else{
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {taskName:task, deadline: deadline};
    setTodoList([...todoList,newTask]);
    setTask('');
    setDeadline(0);
    console.log(todoList);
  }

  const completeTask = (taskNameToDel:string): void =>{
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDel;
    }));


  }

  return (
    <div className="App">
      <header> 
        <div className='inputContainer'>
          <input
          type='text' 
          placeholder='Task...' 
          name='task' 
          value={task}
          onChange={handleChange}/>
          <input
          type='number'
          placeholder='Deadline (in Days)...'
          name='deadline'
          value={deadline}
          onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </header>
      <div className='toDoList'>
        {todoList.map((task:ITask,key:number) =>{
          return <TodoTask key={key} task={task} completeTask={completeTask}/>
        })}
      </div>
    </div>
  );
}

export default App;
