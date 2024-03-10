import { useEffect, useState } from "react";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
import "./Todo.css";
import Task from "../../components/Task/Task";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Todo() {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [tasks, setTasks] = useState<DocumentData>([]);
  const navigation = useNavigate();

  type PropsType = {
    title: string;
    limitDate: string;
    otherText: string;
  };

  // ログイン情報の確認
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        return;
      } else {
        navigation("/Login");
      }
    });
  }, [navigation]);

  useEffect(() => {
    const tasks = collection(db, "tasks");
    const taskList = query(
      tasks,
      where("userId", "==", userId),
      orderBy("limitDate", "asc")
    );
    onSnapshot(taskList, (taskSnapShot) => {
      setTasks(taskSnapShot.docs.map((doc) => doc.data()));
    });
  }, [userId]);

  return (
    <div className="Todo">
      <div className="title">
        <h1 className="titleText">タスクを登録</h1>
      </div>
      <input
        type="button"
        className="newTaskBtn"
        onClick={() => setShowModal(true)}
        value="newTask"
      />

      <div className="ModalBox">
        <AddTaskModal
          showFlag={showModal}
          userId={userId}
          setShowModal={setShowModal}
        />
      </div>

      <div className="taskBox">
        <div className="taskLineBox">
          {/* <p className='noTaskTitle'>タスクはありません</p> */}
          {tasks.map((task: PropsType) => (
            <div className="TaskBox">
              <Task
                title={task.title}
                limitDate={task.limitDate}
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
