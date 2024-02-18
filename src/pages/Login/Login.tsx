import React from 'react';
import './Login.css';

function Login() {

  const login = () => {
    console.log("ログイン成功");
    return;
  }

  return (
    <div className="Login">
      <div className='title'>
            <h1>Login</h1>
        </div>
        <div className='main'>
            <form onSubmit={login}>
                <div className='mail'>
                  <input type='mail' className='input' placeholder='メールアドレスを入力してください' />
                </div>

                <div className='password'>
                  <input type='pass' className='input' placeholder='パスワードを入力してください' />
                </div>

                <input type='submit' className='submit' value="Login" />
            </form>
        </div>
    </div>
  );
}

export default Login;
