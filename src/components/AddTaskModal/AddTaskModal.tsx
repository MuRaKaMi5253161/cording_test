import React, { useState } from "react";
import "./AddTaskModal.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const AddTaskModal: React.FC<any> = (props) => {
  const [title, setTaskTitle] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [otherText, setOtherText] = useState("");

  const addNewTask = () => {
    console.log(title, limitDate, otherText);

    addDoc(collection(db, "tasks"), {
      title: title,
      limitDate: limitDate,
      otherText: otherText,
      userId: props.userId,
    });
    props.setShowModal(false);
    return;
  };

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
              </div>
              <div className="dateBox">
                <p className="itemTitle">期限</p>
                <input
                  type="date"
                  className="limitDate"
                  onChange={(e) => setLimitDate(e.target.value)}
                ></input>
              </div>
              <div className="otherTextBox">
                <p className="itemTitle">メモなど</p>
                <textarea
                  className="otherText"
                  placeholder="その他"
                  maxLength={30}
                  onChange={(e) => setOtherText(e.target.value)}
                ></textarea>
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
