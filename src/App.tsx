import React from 'react';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login/Login';
import Todo from './pages/Todo/Todo';
import SignUp from './pages/SignUp/SignUp';
import TodoHeader from './components/header/TodoHeader';

function App() {
  return (
    <div>
      <TodoHeader />
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Todo/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/SignUp' element={<SignUp/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
