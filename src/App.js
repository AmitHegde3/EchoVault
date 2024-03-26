import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert message={"This is Amazing"} />
        <div className="container">
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route exact path="about" element={<About />} />
              <Route exact path="login" element={<Login/>} />
              <Route exact path="signup" element={<Signup/>} />
            </Route>
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
