import React from "react";
import "./Task.css";

const Task: React.FC<{
  title: string;
  limitDate: string;
  otherText: string;
}> = (props) => {
  const limitDateCheck = () => {
    if (props.limitDate === (null || undefined || "")) {
      return;
    } else {
      return <p>{props.limitDate}まで</p>;
    }
  };

  return (
    <div className="Task">
      <div className="TaskNameBox">
        <p className="TaskName">{props.title}</p>
      </div>
      <div className="TaskDetail">
        {limitDateCheck()}
        {props.otherText}
      </div>
    </div>
  );
};

export default Task;
