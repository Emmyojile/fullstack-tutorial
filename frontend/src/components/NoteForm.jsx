import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const NoteForm = ({ handleSubmit, newNote, setNewNote, editMode, }) => {
  const handleInputChange = (event) => {
    setNewNote({ ...newNote, [event.target.name]: event.target.value });
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <input
      placeholder='Title'
      value={newNote.title}
      onChange={handleInputChange}
      name="title"
      required
      />
      <textarea
      placeholder='Content'
      multiline
      rows={4}
      value={newNote.content}
      onChange={handleInputChange}
      name="content"
      required
      />
      <button type="submit" variant="contained" color="primary">
        {editMode ? 'Update Note' : 'Create Note'}
      </button>
    </form>
      </div>
  );
};

export default NoteForm;
