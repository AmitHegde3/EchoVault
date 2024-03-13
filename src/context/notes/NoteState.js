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

    console.log(json);
    setNotes(json)
  };

  // Add a note
  const addNote = async (title, desciption, tag) => {
    console.log("Adding a new note");

    // API Call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlZGRmNjk3YWQ3ZGE0MTE3MjdhNDk4In0sImlhdCI6MTcxMDE0MzQ3M30.dDQkIUk5gy7ZUq5WNuvYhEIWtjkltjdiXwf9EIQSJWc",
      },
      body: JSON.stringify({ title, desciption, tag }),
    });

    // const json = response.json();

    const note = [
      {
        _id: "123",
        user: "65eddf697ad7da411727a498",
        title: title,
        description: desciption,
        tag: tag,
        date: "2024-03-11T08:40:23.815Z",
        __v: 0,
      },
    ];
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = (id) => {
    console.log("Deleeting the node with id: " + id);
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlZGRmNjk3YWQ3ZGE0MTE3MjdhNDk4In0sImlhdCI6MTcxMDE0MzQ3M30.dDQkIUk5gy7ZUq5WNuvYhEIWtjkltjdiXwf9EIQSJWc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = response.json();

    // Logic to edit in clinet
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
