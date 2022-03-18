import { useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Notes from './components/Notes/Notes';

import NotesModal from './components/Notes/NotesModal';
import CreateNoteModal from './components/Notes/CreateNote';
import Notifification from './components/UI/Notification';

import classes from'./styles/App.module.css';
import { sendNotesData, fetchNotesData } from './store/notes-actions';


let isInitial = true;

function App() {
  const  dispatch = useDispatch();

  const showModal= useSelector(state=>state.ui.noteModalIsVisible);
  const showCreateModal= useSelector(state=>state.ui.createNoteModalIsVisible);
  const notification=useSelector(state=>state.ui.notification);
  const notesList = useSelector((state) => state.notes);
  console.log(notification);

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
    {notification && notification.status==='error' ?<Notifification status={notification.status}
          title={notification.title}
          message={notification.message}/>:
    
        <Notes/>
    }
    </div>
    {showModal&&<NotesModal/>}
    {showCreateModal &&<CreateNoteModal />}
    
    </>
  );
}

export default App;
