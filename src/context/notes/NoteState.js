import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "65eebc99a60453caa22be944",
      "user": "65eddf697ad7da411727a498",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-03-11T08:11:05.700Z",
      "__v": 0
    },
    {
      "_id": "65eec377e25ab0f86a3a373c",
      "user": "65eddf697ad7da411727a498",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-03-11T08:40:23.815Z",
      "__v": 0
    },
    {
      "_id": "65eec377e25ab0f86a3a373c",
      "user": "65eddf697ad7da411727a498",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-03-11T08:40:23.815Z",
      "__v": 0
    },
    {
      "_id": "65eec377e25ab0f86a3a373c",
      "user": "65eddf697ad7da411727a498",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-03-11T08:40:23.815Z",
      "__v": 0
    },
    {
      "_id": "65eec377e25ab0f86a3a373c",
      "user": "65eddf697ad7da411727a498",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-03-11T08:40:23.815Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)
  
  return (
    <NoteContext.Provider value={{notes,setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
