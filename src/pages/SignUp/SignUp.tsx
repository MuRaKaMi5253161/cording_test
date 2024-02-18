import React, { useState } from 'react';
import Profile from '../../img/defaultProfile.jpg';
import './SignUp.css';

function SignUp() {

  const [profileImage, setProfileImage] = useState(Profile);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    setProfileImage(window.URL.createObjectURL(fileObject));
  };

  const signUp = () => {
    console.log("新規登録成功");
    return;
  }
  return (
    <div className="SignUp">
        <div className='title'>
            <h1>SignUp</h1>
        </div>
        <div className='main'>
            <form onSubmit={signUp}>
              <div className='profile'>
                <div className='profileImgBox'>
                  <img src={profileImage} className="profileImg" alt='' />
                </div>
                <label className='profileLabel'>
                  プロフィールを設定
                  <input type="file" accept="image/*" onChange={onFileInputChange} className="profileInput" />
                </label>
              </div>

              <div className='name'>
                <p className='inputNameTitle'>Name</p>
                <input type='text' className='input' placeholder='お名前を入力してください' />
              </div>

              <div className='mail'>
                <p className='inputMailTitle'>Mail</p>
                <input type='mail' className='input' placeholder='メールアドレスを入力してください' />
              </div>

              <div className='pass'>
                <p className='inputTitle'>Password</p>
                <input type='pass' className='input' placeholder='パスワードを設定してください' />
              </div>

              <div className='birthDay'>
                <p className='inputTitle'>BirthDay</p>
                <input type="date" className='inputDate' name="birthday" />
              </div>

              <div className='gender'>
                <p className='inputGenderTitle'>Gender</p>
                <select className='inputGender'>
                  <option value='men'>men</option>
                  <option value='women'>women</option>
                </select>
              </div>

              <input type='submit' className='submit' value="SignUp" />
            </form>
        </div>
    </div>
  );
}

export default SignUp;
