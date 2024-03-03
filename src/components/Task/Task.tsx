import React from 'react';
import './Task.css';

const Task: React.FC<{ title: string; limitDate: string; otherText: string }> = (props) => {
  return (
    <div className='Task'>
      <div className='TaskNameBox'>
        <p className='TaskName'>{props.title}</p>
      </div>
      <div className='TaskDetail'>
        <p>{props.limitDate}まで</p>
        <p>{props.otherText}</p>
      </div>
    </div>
  );
}

export default Task;
