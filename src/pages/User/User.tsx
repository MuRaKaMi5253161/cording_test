import React, { useEffect, useState } from "react";
import Profile from "../../img/defaultProfile.jpg";
import "./User.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function User() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(Profile);

  const navigation = useNavigate();

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
      setBirthday(doc.data().birthday);
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
      .catch(() => {});
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
          </div>

          <div className="userName">
            <p className="inputNameTitle">お名前</p>
            <p className="userValue">{name}</p>
          </div>

          <div className="userMail">
            <p className="inputMailTitle">メールアドレス</p>
            <p className="userValue">{mail}</p>
          </div>

          <div className="userBirthDay">
            <p className="inputTitle">生年月日</p>
            <p className="userValue">{birthday}</p>
          </div>

          <div className="userGender">
            <p className="inputGenderTitle">性別</p>
            <p className="userValue">{gender}</p>
          </div>

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
