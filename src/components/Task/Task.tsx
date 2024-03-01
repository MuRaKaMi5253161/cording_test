import React from 'react';
import './Task.css';

function Task() {
  return (
    <div className='Task'>
      <div className='TaskNameBox'>
        <p className='TaskName'>テスト</p>
      </div>
      <div className='TaskDetail'>
        <p>2024/99/99 まで</p>
        <p>説明文</p>
      </div>
    </div>
  );
}

export default Task;
