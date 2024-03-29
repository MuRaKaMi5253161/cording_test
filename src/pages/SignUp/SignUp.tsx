import React, { useState } from "react";
import Profile from "../../img/defaultProfile.jpg";
import "./SignUp.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [mailErrorMessage, setMailErrorMessage] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState("");
  const [rePassErrorMessage, setRePassErrorMessage] = useState("");
  const [birthDayErrorMessage, setBirthDayErrorMessage] = useState("");
  const [genderErrorMessage, setGenderErrorMessage] = useState("");
  const [termsErrorMessage, setTermsErrorMessage] = useState("");
  const [errorFlg, setErrorFlag] = useState<boolean>();
  const [condition, setCondition] = useState(false);
  const [profileImage, setProfileImage] = useState(Profile);
  const [profileImageFile, setProfileImageFile] = useState<any>();
  const navigation = useNavigate();
  const regex =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]{5}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

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
    return;
  };

  // プロフィールの送信処理
  const sendUserProfile = (userId: string) => {
    const storageRef = ref(storage, "profileImg/" + userId + "/profileName");
    uploadBytes(storageRef, profileImageFile);
    return;
  };

  // バリデーションチェック
  const validCheck = () => {
    setNameErrorMessage("");
    setMailErrorMessage("");
    setPassErrorMessage("");
    setRePassErrorMessage("");
    setBirthDayErrorMessage("");
    setGenderErrorMessage("");
    setTermsErrorMessage("");
    setErrorFlag(false);

    if (name === (null || undefined || "")) {
      setNameErrorMessage("お名前は1文字以上入力してください");
      setErrorFlag(true);
      return;
    }
    if (name.length > 100) {
      setNameErrorMessage("お名前は100文字以下で入力してください");
      setErrorFlag(true);
      return;
    }
    if (birthday === (null || undefined || "")) {
      setBirthDayErrorMessage("生年月日を設定してください");
      setErrorFlag(true);
      return;
    }
    if (gender === (null || undefined || "")) {
      setGenderErrorMessage("性別を設定してください");
      setErrorFlag(true);
      return;
    }
    if (mail === (null || undefined || "")) {
      setMailErrorMessage("メールは1文字以上入力してください");
      setErrorFlag(true);
      return;
    }
    if (mail.length > 100) {
      setMailErrorMessage("メールは100文字以下で入力してください");
      setErrorFlag(true);
      return;
    }
    if (!regex.test(mail)) {
      setMailErrorMessage(
        "メールは全角半角英数記号(-_.)6文字以上@～の形式で入力してください"
      );
      setErrorFlag(true);
      return;
    }
    if (pass === (null || undefined || "")) {
      setPassErrorMessage("パスワードを入力してください");
      setErrorFlag(true);
      return;
    }
    if (pass.length < 10) {
      setPassErrorMessage("パスワードは10文字以上で入力してください");
      setErrorFlag(true);
      return;
    }
    if (pass.length > 100) {
      setPassErrorMessage("パスワードは100文字以下で入力してください");
      setErrorFlag(true);
      return;
    }
    if (pass !== rePass) {
      setRePassErrorMessage("入力したパスワードが一致していません");
      setErrorFlag(true);
      return;
    }
    if (!condition) {
      setTermsErrorMessage("利用規約に同意しチェックをしてください");
      setErrorFlag(true);
      return;
    }
    return;
  };

  const currentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  // サインアップ処理
  const signUp = async (event: any) => {
    event.preventDefault();

    validCheck();
    if (errorFlg || errorFlg === undefined) {
      navigation("/SignUp");
      return;
    }

    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        // 認証成功の時にユーザー情報をfireStoreに保存
        sendUserInfo(userCredential.user.uid);
        // プロフィール画像をStorageに保存
        if (profileImageFile) {
          sendUserProfile(userCredential.user.uid);
        }
        alert("アカウント登録に成功しました");
        navigation("/Login");
      })
      .catch(() => {
        alert("アカウント登録に失敗しました");
        navigation("/SignUp");
      });
  };

  return (
    <div className="SignUp">
      <div>
        <h1 className="signUpTitleText">サインイン</h1>
      </div>
      <div className="signUpMain">
        <form onSubmit={signUp}>
          <div className="signUpProfile">
            <div className="signUpProfileImgBox">
              <img src={profileImage} className="signUpProfileImg" alt="" />
            </div>
            <label className="signUpProfileLabel">
              プロフィールを設定
              <input
                type="file"
                accept="image/*"
                onChange={onFileInputChange}
                className="signUpProfileInput"
              />
            </label>
          </div>

          <div className="signUpName">
            <p className="signUpInputTitle">お名前(必須)</p>
            <input
              type="text"
              className="input"
              placeholder="お名前を入力してください"
              onChange={(e) => setName(e.target.value)}
            />
            <p className="errorMessage">{nameErrorMessage}</p>
          </div>

          <div className="signUpBirthDay">
            <p className="signUpInputTitle">生年月日(必須)</p>
            <br />
            <input
              type="date"
              className="inputDate"
              name="birthday"
              max={currentDate()}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <p className="errorMessage">{birthDayErrorMessage}</p>

          <div className="signUpGenderBox">
            <p className="signUpInputTitle">性別(必須)</p>
            <br />
            <select
              name="inputGender"
              className="inputGender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" selected>
                ー
              </option>
              <option value="men">men</option>
              <option value="women">women</option>
            </select>
          </div>
          <p className="errorMessage">{genderErrorMessage}</p>

          <div className="signUpMail">
            <p className="signUpInputTitle">メールアドレス(必須)</p>
            <input
              type="mail"
              className="input"
              placeholder="メールアドレスを入力してください"
              onChange={(e) => setMail(e.target.value)}
            />
            <p className="errorMessage">{mailErrorMessage}</p>
          </div>

          <div className="pass">
            <p className="signUpInputTitle">パスワード(必須)</p>
            <input
              type="pass"
              className="input"
              placeholder="パスワードを設定してください"
              onChange={(e) => setPass(e.target.value)}
            />
            <p className="errorMessage">{passErrorMessage}</p>
          </div>

          <div className="pass">
            <p className="signUpInputTitle">パスワード再入力(必須)</p>
            <input
              type="pass"
              className="input"
              placeholder="パスワードを設定してください"
              onChange={(e) => setRePass(e.target.value)}
            />
            <p className="errorMessage">{rePassErrorMessage}</p>
          </div>

          <div className="terms">
            <label>
              <input
                type="checkbox"
                checked={condition}
                onChange={() => setCondition(!condition)}
              ></input>
              <a href="https://menherasenpai.notion.site/457df49475494671807673a0a3346451">
                利用規約に同意する(必須)
              </a>
            </label>
            <p className="termsErrorMessage">{termsErrorMessage}</p>
          </div>

          <input type="submit" className="submit" value="signup" />
        </form>
        <a href="./Login" className="moveLoginPageText">
          ログインページへ
        </a>
      </div>
    </div>
  );
};

export default SignUp;
