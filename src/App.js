import React, { useState, useEffect, useCallback } from 'react';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';
import Modal from './components/Modal';

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [noteAddedCloseModal, setnoteAddedCloseModal] = useState(false);


  const fetchNotesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://todolist-anaadi-default-rtdb.firebaseio.com/list.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedNotes = [];

      for (const key in data) {
        loadedNotes.push({
          id: key,
          heading: data[key].heading,
          text: data[key].text,
          dateTime: data[key].dateTime,
        });
      }

      setNotes(loadedNotes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNotesHandler();
  }, [fetchNotesHandler]);

  async function addNoteHandler(note) {
    const response = await fetch('https://todolist-anaadi-default-rtdb.firebaseio.com/list.json', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    
    // Create a new note object with the received data
    const newNote = {
      id: data.name,
      heading: note.heading,
      text: note.text,
      dateTime: note.dateTime
    };
    
    // Prepend the new note to the existing notes array
    setNotes(prevNotes => [newNote, ...prevNotes]);
  }
  

  const deleteNoteHandler = async (noteId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://todolist-anaadi-default-rtdb.firebaseio.com/list/${noteId}.json`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete note!');
      }
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  const openModalHandler = () => {
    setnoteAddedCloseModal(false);
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    
  };

  let content = <div className=' h-screen p-12 text-xl text-center'><p>Found No Notes!!</p></div>;

  if (notes.length > 0) {
    content = <NotesList notes={notes} onDeleteNote={deleteNoteHandler} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <div className='text-xl h-screen p-12 text-center'><p>Loading...</p></div>;
  }

  const noteAddedCloseModalHandler = () => {
    setnoteAddedCloseModal(true);
  };

  return (
    <div className="bg-black h-full">
      <div className='font-sans w-full text-white p-8 bg-transparent'>
        <div className='text-4xl font-bold tracking-wide text-left'>Hello Anaadi,<br></br> Here are your latest notes  </div>
        <button onClick={openModalHandler} className='bg-white text-black rounded-full p-4 mt-8 flex font-bold text-xl'>+ Add Note</button>
        {isModalOpen && (
            <Modal onClose={closeModalHandler} onNoteAdded= {noteAddedCloseModal}>
              <div className='rounded-3xl w-full bg-gray-200 p-4 mt-8'>
                <AddNote onAddNote={addNoteHandler} onClose={noteAddedCloseModalHandler} />
              </div>
            </Modal>
          )}
        
        <div className='h-full'>{content}</div>
      </div>
    </div>
  );
}

export default App;
