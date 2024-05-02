import React from "react";

const NoteList = ({ notes, handleDelete, handleEditClick }) => {
  return (
    <div className="card-container">
      {notes.map((note,index) => (
        <div className="card" key={index}>
          <div className="content">
            <span className="title">{note.title}</span>
            <p className="message">{note.content}</p>
          </div>
          <div className="button">
            <button className="btn edit" onClick={() => handleEditClick(note)}>
              Edit
            </button>
            <button className="btn delete" onClick={() => handleDelete(note._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
