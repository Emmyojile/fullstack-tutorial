import React from "react";

const NoteList = ({ notes, handleDelete, handleEditClick }) => {
  return (
    <div className="card-container">
      {notes.length ? ( // Check if notes array has elements
        notes.map((note, index) => (
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
        ))
      ) : (
        <h2>No notes yet! <br /> Create one above</h2> // Display message if notes is empty
      )}
    </div>
  );
};

export default NoteList;