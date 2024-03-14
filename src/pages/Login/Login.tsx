import { useState } from "react";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [errorFlg, setErrorFlag] = useState<boolean>();
  const [mailErrorMessage, setMailErrorMessage] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState("");
  const navigation = useNavigate();
  const regex =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]{5}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

  // バリデーションチェック
  const validCheck = () => {
    setMailErrorMessage("");
    setPassErrorMessage("");
    setErrorFlag(false);

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
    return;
  };

  // ログイン処理
  const SignIn = (event: any) => {
    event.preventDefault();

    validCheck();
    if (errorFlg || errorFlg === undefined) {
      navigation("/Login");
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, mail, pass)
      .then(() => {
        alert("ログイン成功");
        navigation("/");
      })
      .catch(() => {
        alert("ログイン失敗");
        navigation("/Login");
      });
    return;
  };

  return (
    <div className="Login">
      <div className="loginTitle">
        <h1 className="loginTitleText">ログイン</h1>
      </div>
      <div className="loginMain">
        <form onSubmit={SignIn}>
          <div className="loginMail">
            <p className="inputTitle">メールアドレス</p>
            <input
              type="mail"
              className="input"
              placeholder="メールアドレスを入力してください"
              onChange={(e) => setMail(e.target.value)}
            />
            <p className="errorMessage">{mailErrorMessage}</p>
          </div>

          <div className="loginPassword">
            <p className="inputTitle">パスワード</p>
            <input
              type="pass"
              className="input"
              placeholder="パスワードを入力してください"
              onChange={(e) => setPass(e.target.value)}
            />
            <p className="errorMessage">{passErrorMessage}</p>
          </div>

          <input type="submit" className="submit" value="Login" />
        </form>
        <a href="./SignUp">新しいユーザーを追加</a>
      </div>
    </div>
  );
}

export default Login;
