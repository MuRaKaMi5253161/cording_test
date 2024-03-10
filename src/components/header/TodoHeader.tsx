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

  const moveTodoPage = () => {
    navigation("/");
  };

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

  const moveUserPage = () => {
    navigation("/User");
  };

  return (
    <div className="header">
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
