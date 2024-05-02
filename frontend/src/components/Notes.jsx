import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './NotesList';
import NoteForm from './NoteForm';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]); // Array to store notes
  const [newNote, setNewNote] = useState({ title: '', content: '' }); // State for new note
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [selectedNote, setSelectedNote] = useState(null); // Selected note for editing

  const notesUrl = 'http://localhost:8000/notes'; // URL to fetch all notes
  const createNoteUrl = 'http://localhost:8000/notes'; // URL to create a new note
  const updateNoteUrl = (id) => `http://localhost:8000/notes/${id}`; // URL to update a specific note (dynamic based on ID)
  const deleteNoteUrl = (id) => `http://localhost:8000/notes/${id}`; // URL to delete a specific note (dynamic based on ID)

  const navigate = useNavigate();

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(notesUrl);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);

    // Handle create note form submission
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (editMode) { // Update existing note
        if (!selectedNote) return; // Prevent unnecessary request if no note is selected
        try {
          const response = await axios.put(updateNoteUrl(selectedNote._id), newNote);
          const updatedNotes = notes.map((note) => (note._id === selectedNote._id ? response.data : note));
          setNotes(updatedNotes);
          setSelectedNote(null);
          setEditMode(false);
          setNewNote({ title: '', content: '' }); // Clear newNote state after creation
        } catch (error) {
          console.error('Error updating note:', error);
        }
      } else { // Create a new note
        try {
          const response = await axios.post(createNoteUrl, newNote);
          setNotes([...notes, response.data]);
          setNewNote({ title: '', content: '' }); // Clear newNote state after creation
        } catch (error) {
          console.error('Error creating note:', error);
        }
      }
    };


  const handleEditClick = (note) => {
    setSelectedNote(note);
    setEditMode(true);
    setNewNote({ title: note.title, content: note.content });
  };

    // Handle delete note
    const handleDelete = async (id) => {
      try {
        await axios.delete(deleteNoteUrl(id));
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    };
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from local storage
    navigate("/login");
  };

  return (
    <>
    <div className="header">

    <h1>Welcome, {username}!</h1>
    <button className='btn' onClick={handleLogout}>Logout</button>
    </div>
      <div className='notes-container'>
          <NoteForm
            handleSubmit={handleSubmit} // Pass the appropriate function
            newNote={newNote}
            setNewNote={setNewNote}
            editMode={editMode}
            />
          <NoteList notes={notes} handleDelete={handleDelete}  handleEditClick={handleEditClick}/>
      </div>
      </>
  );
};

export default Notes;
