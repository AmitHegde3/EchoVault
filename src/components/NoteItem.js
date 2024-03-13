import {  useContext,useState } from "react";
import React from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const Note = props.note;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseOverTrash, setIsMouseOverTrash] = useState(false);
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{Note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Card subtitle
          </h6>
          <p className="card-text">{Note.description}</p>
          {/* Transh Button */}
          <i
            className={`fa-solid fa-trash${
              isMouseOverTrash ? " fa-shake" : ""
            } mx-2`}
            onMouseOver={() => setIsMouseOverTrash(true)}
            onMouseOut={() => setIsMouseOverTrash(false)}
            onClick={() => {
              deleteNote(Note._id)
            }}
          ></i>
          {/* Edit button */}
          <i
            className={`fa-solid fa-pen-to-square${
              isMouseOver ? " fa-beat" : ""
            } mx-2`}
            onMouseOver={() => setIsMouseOver(true)}
            onMouseOut={() => setIsMouseOver(false)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
