import { useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Notes from './components/Notes/Notes';

import NotesModal from './components/Notes/NotesModal';
import CreateNoteModal from './components/Notes/CreateNote';

import classes from'./styles/App.module.css';
import { sendNotesData, fetchNotesData } from './store/notes-actions';


let isInitial = true;

function App() {
  const  dispatch = useDispatch();

  const showModal= useSelector(state=>state.ui.noteModalIsVisible);
  const showCreateModal= useSelector(state=>state.ui.createNoteModalIsVisible);
 
  const notesList = useSelector((state) => state.notes);


  useEffect(() => {
    dispatch(fetchNotesData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (notesList.changed) {
      dispatch(sendNotesData(notesList));
    }
  }, [notesList, dispatch]);

  return (
    <>
    <div className={classes.outer}>
        <Navbar/>
        <Notes/>
    </div>
    {showModal&&<NotesModal/>}
    {showCreateModal &&<CreateNoteModal/>}
    
    </>
  );
}

export default App;
