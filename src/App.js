import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <div className="container">
        <Routes>
         
            <Route path="/">
              <Route index element={<Home />} />
              <Route exact path="about" element={<About />} />
            </Route>
         
          </Routes>
          </div>
      </NoteState>
    </>
  );
}

export default App;
