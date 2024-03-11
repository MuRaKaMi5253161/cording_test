import React from "react";
import "./Task.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Task: React.FC<{
  id: string;
  title: string;
  limitDate: string;
}> = (props) => {
  const navigation = useNavigate();

  const deleteTask = async () => {
    await deleteDoc(doc(db, "tasks", props.id));
    navigation("/");
    return;
  };

  return (
    <div className="Task">
      <div className="TaskNameBox">
        <p className="TaskName">{props.title}</p>
      </div>
      <div className="TaskDetail">
        <p>期限：{props.limitDate}</p>
      </div>
      <div>
        <button type="button" className="taskDeleteBtn" onClick={deleteTask}>
          完了
        </button>
      </div>
    </div>
  );
};

export default Task;
