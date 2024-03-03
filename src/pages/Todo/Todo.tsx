import { useEffect, useState } from 'react';
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal';
import './Todo.css';
import Task from '../../components/Task/Task';
import { DocumentData, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

function Todo() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<DocumentData>([]);

  type PropsType = {
    title: string;
    endDate: string;
    otherText: string;
  }

  useEffect(() =>{
    const tasks = collection(db,"tasks");
    const taskList = query(tasks,orderBy("endDate","desc"));
    getDocs(taskList).then((QuerySnapshot) => {
    setTasks(QuerySnapshot.docs.map((doc) => doc.data()));
    });
  },[]);

  return (
    <div className="Todo">
      <div className='title'>
        <h1 className='titleText'>タスクを登録</h1>
      </div>
      <input type='button' className='newTaskBtn' onClick={() => setShowModal(true)} value="newTask" />

      <div className='ModalBox'>
        <AddTaskModal showFlag={showModal} setShowModal={setShowModal} />
      </div>

      <div className='taskBox'>
        <div className='taskLineBox'>
          {/* <p className='noTaskTitle'>タスクはありません</p> */}
          {tasks.map((task:PropsType) => (
            <div className='TaskBox'>
              <Task  
              title={task.title}
              endDate={task.endDate}
              otherText={task.otherText}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
