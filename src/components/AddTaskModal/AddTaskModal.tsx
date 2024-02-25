import React from "react";
import './AddTaskModal.css';

const AddTaskModal:React.FC<any> = (props) => {

    const closeModal = () => {
        props.setShowModal(false);
    }

  return (
    <>
    {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div className='addTasks'>
          <div>
            <form>
              <div className='TaskTitleBox'>
                  <input type='text' className='TaskTitle' placeholder='タスクを入力してください' />
              </div>
              <div className='dateBox'>
                  <input type='date' className='firstDate'></input>
                  ～
                  <input type='date' className='endDate'></input>
              </div>
              <div className='otherTextBox'>
                  <p><textarea className='otherText' placeholder='その他'></textarea></p>
              </div>
              <input type='button' className='submitBtn' value="add Task" />
              <div className="cancelBtnBox">
                <input type="button" className="cancelBtn" value="cancel" onClick={() => closeModal()} />
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