import React, { useEffect, useState } from "react";
import Profile from "../../img/defaultProfile.jpg";
import "./User.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function User() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
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
  const sendUserInfo = (userId: string) => {
    addDoc(collection(db, "users"), {
      id: userId,
      name: name,
      mail: mail,
      birthday: birthday,
      gender: gender,
    });
    console.log(gender);
    return;
  };

  const sendUserProfile = (userId: string) => {
    const storageRef = ref(storage, "profileImg/" + userId + "/profileName");
    uploadBytes(storageRef, profileImageFile).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    return;
  };

  const getUserProfile = (userId: string) => {
    const storageRef = ref(storage, "profileImg/" + userId + "/profileName");
    getDownloadURL(storageRef)
      .then((url) => {
        setProfileImage(url);
        console.log("成功");
      })
      .catch((err) => console.log(err));
  };

  const getUserInfo = async (userId: string) => {
    const users = collection(db, "users");
    const currentUser = query(users, where("id", "==", userId));
    const querySnapshot = await getDocs(currentUser);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().name);
      setName(doc.data().name);
      setMail(doc.data().mail);
      setBirthday(doc.data().birthDay);
      setGender(doc.data().gender);
    });
    return;
  };

  // ログイン情報の確認
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return;
      } else {
        navigation("/Login");
      }
    });
  }, [navigation]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        getUserProfile(uid);
        getUserInfo(uid);
      } else {
        return;
      }
    });
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        alert("ログアウトしました");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="SignUp">
      <div className="title">
        <h1 className="titleText">ユーザー情報</h1>
      </div>
      <div className="main">
        <form>
          <div className="profile">
            <div className="profileImgBox">
              <img src={profileImage} className="profileImg" alt="" />
            </div>
            <label className="profileLabel">
              プロフィールを変更
              <input
                type="file"
                accept="image/*"
                onChange={onFileInputChange}
                className="profileInput"
              />
            </label>
          </div>

          <div className="name">
            <p className="inputNameTitle">お名前</p>
            <input
              type="text"
              className="input"
              placeholder="お名前を入力してください"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mail">
            <p className="inputMailTitle">メールアドレス</p>
            <input
              type="mail"
              className="input"
              placeholder="メールアドレスを入力してください"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>

          <div className="birthDay">
            <p className="inputTitle">生年月日</p>
            <br />
            <input
              type="date"
              className="inputDate"
              name="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>

          <div className="gender">
            <p className="inputGenderTitle">性別</p>
            <br />
            <select
              name="inputGender"
              className="inputGender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="men" selected>
                men
              </option>
              <option value="women">women</option>
            </select>
          </div>

          <input type="submit" className="submit" value="update" />
          <input
            type="button"
            className="logoutBtn"
            value="logout"
            onClick={logout}
          />
        </form>
      </div>
    </div>
  );
}

export default User;
