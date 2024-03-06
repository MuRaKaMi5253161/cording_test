import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Todo from "./pages/Todo/Todo";
import SignUp from "./pages/SignUp/SignUp";
import TodoHeader from "./components/header/TodoHeader";
import User from "./pages/User/User";
import Header from "./components/header/Header";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TodoHeader />} />
          <Route path="/User" element={<TodoHeader />} />
          <Route path="/Login" element={<Header />} />
          <Route path="/SignUp" element={<Header />} />
        </Routes>
        <div className="App">
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/User" element={<User />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
