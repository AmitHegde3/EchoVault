import React from "react";

const NoteItem = (props) => {
  let Note = props.note;
  return (
    <div className="col-md-3">
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">{Note.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
          <p class="card-text">{Note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
