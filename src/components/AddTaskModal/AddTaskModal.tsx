import React, { useState } from "react";
import "./AddTaskModal.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const AddTaskModal: React.FC<any> = (props) => {
  const [title, setTaskTitle] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [taskNameErrorMessage, setTaskNameErrorMessage] = useState("");

  // バリデーションチェック
  const validCheck = () => {
    setTaskNameErrorMessage("");

    if (title === (null || undefined || "")) {
      setTaskNameErrorMessage("タスクを入力してください");
      return 1;
    }
    if (limitDate === (null || undefined || "")) {
      return 2;
    }
    return 3;
  };

  // タスクの登録処理
  const addNewTask = async (event: any) => {
    event.preventDefault();
    let noLimitDate = "なし";

    let pattern = validCheck();
    switch (pattern) {
      case 1:
        props.setShowModal(true);
        break;
      case 2:
        addDoc(collection(db, "tasks"), {
          title: title,
          limitDate: noLimitDate,
          userId: props.userId,
        });
        setTaskTitle("");
        setLimitDate("");
        props.setShowModal(false);
        break;
      case 3:
        addDoc(collection(db, "tasks"), {
          title: title,
          limitDate: limitDate,
          userId: props.userId,
        });
        setTaskTitle("");
        setLimitDate("");
        props.setShowModal(false);
        break;
      default:
        break;
    }
    return;
  };

  // モーダルを閉じる
  const closeModal = () => {
    props.setShowModal(false);
  };

  return (
    <>
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div className="addTasks">
          <div>
            <div>
              <h1 className="addTasksTitle">タスクの内容を入力しましょう</h1>
            </div>
            <form onSubmit={addNewTask}>
              <div className="TaskTitleBox">
                <p className="itemTitle">タスク名</p>
                <input
                  type="text"
                  className="TaskTitle"
                  placeholder="タスクを入力してください"
                  maxLength={10}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <p className="errorMessage">{taskNameErrorMessage}</p>
              </div>
              <div className="dateBox">
                <p className="itemTitle">期限</p>
                <input
                  type="date"
                  className="limitDate"
                  onChange={(e) => setLimitDate(e.target.value)}
                ></input>
              </div>
              <input type="submit" className="submitBtn" value="add Task" />
              <div className="cancelBtnBox">
                <input
                  type="button"
                  className="cancelBtn"
                  value="cancel"
                  onClick={() => closeModal()}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddTaskModal;
