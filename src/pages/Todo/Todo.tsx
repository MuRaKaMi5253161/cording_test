import { useState } from 'react';
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal';
import './Todo.css';
import Task from '../../components/Task/Task';

function Todo() {
  const [showModal, setShowModal] = useState(false);

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
          <div className='TaskBox'>
            <Task />
          </div>
          <div className='TaskBox'>
            <Task />
          </div>
          <div className='TaskBox'>
            <Task />
          </div>
          <div className='TaskBox'>
            <Task />
          </div>
          <div className='TaskBox'>
            <Task />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
