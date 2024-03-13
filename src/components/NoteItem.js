import React from "react";

const NoteItem = (props) => {
  let Note = props.note;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{Note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
          <p className="card-text">{Note.description}</p>
          <i className="fa-solid fa-trash mx-2"></i>
          <i className="fa-solid fa-pen-to-square fa-beat mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
