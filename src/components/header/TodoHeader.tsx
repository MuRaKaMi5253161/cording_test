import React, { useEffect, useState } from "react";
import Profile from "../../img/defaultProfile.jpg";
import "./TodoHeader.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const TodoHeader: React.FC = () => {
  const [profileImage, setProfileImage] = useState(Profile);
  const navigation = useNavigate();

  // TODOページへ遷移
  const moveTodoPage = () => {
    navigation("/");
  };

  // ユーザーページへ遷移
  const moveUserPage = () => {
    navigation("/User");
  };

  // プロフィールを取得
  const getUserProfile = (userId: string) => {
    const storageRef = ref(storage, "profileImg/" + userId + "/profileName");
    getDownloadURL(storageRef)
      .then((url) => {
        setProfileImage(url);
      })
      .catch(() => {
        setProfileImage(Profile);
      });
  };

  // 認証情報を取得
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserProfile(uid);
      } else {
        return;
      }
    });
  }, []);

  return (
    <div className="TodoHeader">
      <div className="header-menu-line">
        <span className="headerTitle" onClick={moveTodoPage}>
          Todo
        </span>
        <span>
          <img
            src={profileImage}
            className="profileIcon"
            alt=""
            onClick={moveUserPage}
          />
        </span>
      </div>
    </div>
  );
};

export default TodoHeader;
