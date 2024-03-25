import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // API Call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlZGRmNjk3YWQ3ZGE0MTE3MjdhNDk4In0sImlhdCI6MTcxMDE0MzQ3M30.dDQkIUk5gy7ZUq5WNuvYhEIWtjkltjdiXwf9EIQSJWc",
      },
    });

    const json = await response.json();
    // console.log(json);

    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // console.log("Adding a new note");

    // API Call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlZGRmNjk3YWQ3ZGE0MTE3MjdhNDk4In0sImlhdCI6MTcxMDE0MzQ3M30.dDQkIUk5gy7ZUq5WNuvYhEIWtjkltjdiXwf9EIQSJWc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
    // console.log(json);

   
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlZGRmNjk3YWQ3ZGE0MTE3MjdhNDk4In0sImlhdCI6MTcxMDE0MzQ3M30.dDQkIUk5gy7ZUq5WNuvYhEIWtjkltjdiXwf9EIQSJWc",
      },
    });

    // const json = response.json();
    // console.log(json);

    // console.log("Deleeting the node with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlZGRmNjk3YWQ3ZGE0MTE3MjdhNDk4In0sImlhdCI6MTcxMDE0MzQ3M30.dDQkIUk5gy7ZUq5WNuvYhEIWtjkltjdiXwf9EIQSJWc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in clinet
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
