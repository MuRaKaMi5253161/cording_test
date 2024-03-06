import { useState } from "react";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigate();

  const SignIn = (event: any) => {
    event.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        alert("ログイン成功");
        navigation("/");
      })
      .catch((error) => {
        alert("ログイン失敗");
        navigation("/Login");
      });
    return;
  };

  return (
    <div className="Login">
      <div className="title">
        <h1 className="titleText">ログイン</h1>
      </div>
      <div className="main">
        <form onSubmit={SignIn}>
          <div className="mail">
            <p className="inputTitle">メールアドレス</p>
            <input
              type="mail"
              className="input"
              placeholder="メールアドレスを入力してください"
              onChange={(e) => setMail(e.target.value)}
            />
          </div>

          <div className="password">
            <p className="inputTitle">パスワード</p>
            <input
              type="pass"
              className="input"
              placeholder="パスワードを入力してください"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <input type="submit" className="submit" value="Login" />
        </form>
        <a href="./SignUp">新しいユーザーを追加</a>
      </div>
    </div>
  );
}

export default Login;
