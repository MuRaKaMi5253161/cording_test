import { useEffect, useState } from "react";
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

  // プロフィールの取得
  const getUserProfile = (userId: string) => {
    const storageRef = ref(storage, "profileImg/" + userId + "/profileName");
    getDownloadURL(storageRef)
      .then((url) => {
        setProfileImage(url);
      })
      .catch(() => setProfileImage(Profile));
  };

  // ユーザー情報の取得
  const getUserInfo = async (userId: string) => {
    const users = collection(db, "users");
    const currentUser = query(users, where("id", "==", userId));
    const querySnapshot = await getDocs(currentUser);
    querySnapshot.forEach((doc) => {
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
        getUserProfile(uid);
        getUserInfo(uid);
      } else {
        return;
      }
    });
  }, []);

  // ログアウト処理
  const logout = () => {
    signOut(auth)
      .then(() => {
        alert("ログアウトしました");
      })
      .catch(() => {});
  };

  return (
    <div className="User">
      <div className="userTitle">
        <h1 className="userTitleText">ユーザー情報</h1>
      </div>
      <div className="userMain">
        <form>
          <div className="userProfile">
            <div className="userProfileImgBox">
              <img src={profileImage} className="userProfileImg" alt="" />
            </div>
          </div>

          <div className="userName">
            <p className="userInputTitle">お名前</p>
            <p className="userValue">{name}</p>
          </div>

          <div className="userMail">
            <p className="userInputTitle">メールアドレス</p>
            <p className="userValue">{mail}</p>
          </div>

          <div className="userBirthDay">
            <p className="userInputTitle">生年月日</p>
            <p className="userValue">{birthday}</p>
          </div>

          <div className="userGender">
            <p className="userInputTitle">性別</p>
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
