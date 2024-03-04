import React, { useState } from 'react';
import Profile from '../../img/defaultProfile.jpg';
import './SignUp.css';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ref, uploadBytes  } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(Profile);
  const [profileImageFile, setProfileImageFile] = useState<any>();

  const navigation = useNavigate();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    setProfileImage(window.URL.createObjectURL(fileObject));
    setProfileImageFile(fileObject);
  };

  // ユーザー情報をfireStoreに保存
  const sendUserInfo = (userId : string) => {
    addDoc(collection(db, "users"), {
      id: userId,
      name: name,
      mail: mail,
      pass: pass,
      birthday: birthday,
      gender: gender
    });
    console.log(gender);
    return;
  }

  const sendUserProfile = (userId : string) => {
    const storageRef = ref(storage, "profileImg/" + userId + "/profileName");
    uploadBytes(storageRef, profileImageFile).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    return;
  }

  const signUp = async (event:any) => {
    event.preventDefault();
    console.log(mail,pass);
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth,mail,pass)
    .then((userCredential) => {
      // 認証成功の時にユーザー情報をfireStoreに保存
      sendUserInfo(userCredential.user.uid);
      // プロフィール画像をStorageに保存
      sendUserProfile(userCredential.user.uid);
      alert("ログイン成功");
      navigation("/Login"); 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      console.log(errorCode,errorMessage);
      alert("ログイン失敗");
      navigation("/SignUp");
    });
  }

  return (
    <div className="SignUp">
        <div className='title'>
            <h1 className='titleText'>サインイン</h1>
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
                <p className='inputNameTitle'>お名前</p>
                <input type='text' className='input' placeholder='お名前を入力してください' onChange={(e) => setName(e.target.value)} />
              </div>

              <div className='mail'>
                <p className='inputMailTitle'>メールアドレス</p>
                <input type='mail' className='input' placeholder='メールアドレスを入力してください' onChange={(e) => setMail(e.target.value)} />
              </div>

              <div className='pass'>
                <p className='inputTitle'>パスワード</p>
                <input type='pass' className='input' placeholder='パスワードを設定してください' onChange={(e) => setPass(e.target.value)} />
              </div>

              <div className='birthDay'>
                <p className='inputTitle'>生年月日</p><br/>
                <input type="date" className='inputDate' name="birthday" onChange={(e) => setBirthday(e.target.value)} />
              </div>

              <div className='gender'>
                <p className='inputGenderTitle'>性別</p><br/>
                <select name='inputGender' className='inputGender' onChange={(e) => setGender(e.target.value)}>
                  <option value='men' selected>men</option>
                  <option value='women'>women</option>
                </select>
              </div>

              <div className='terms'>
              <label>
                <input type='checkbox'></input>
                <a href='https://menherasenpai.notion.site/457df49475494671807673a0a3346451'>利用規約に同意する</a>
              </label>
              </div>

              <input type='submit' className='submit' value="signup" />
            </form>
        </div>
    </div>
  );
}

export default SignUp;
