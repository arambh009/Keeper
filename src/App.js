import { useEffect,useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Notes from './components/Notes/Notes';
import LoadingSpinner from './components/UI/LoadingSpinner';
import NotesModal from './components/Notes/NotesModal';
import CreateNoteModal from './components/Notes/CreateNote';
import Notification from './components/UI/Notification';
import classes from'./styles/App.module.css';
import { sendNotesData, fetchNotesData } from './store/notes-actions';

let isInitial = true;

function App() {
  const  dispatch = useDispatch();

  const showModal= useSelector(state=>state.ui.noteModalIsVisible);
  const showCreateModal= useSelector(state=>state.ui.createNoteModalIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const notesList = useSelector((state) => state.notes);

  // const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState(null);

  // console.log(notesList.items);
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
  
  // useEffect(()=>{
  //   const fetchNotes=async()=>{
      
  //     setIsLoading(true);
  //     const response=await fetch('https://react-http-f1485-default-rtdb.firebaseio.com/notes.json');

  //     if(!response.ok){
  //       throw new Error('Something went wrong!');
  //     }
  //     const responseData=await response.json();
      
  //     const loadedNotes=[];
  //     for(const key in responseData){
  //       loadedNotes.push({
  //         id:key,
  //         title:responseData[key].title,
  //         tagline:responseData[key].tagline,
  //         content:responseData[key].content,
  //         pinned:responseData[key].pinned
  //       })
  //     }
  //     setNotes(loadedNotes);
  //     setIsLoading(false);
  //   }
    
  //     fetchNotes().catch((error)=>{
  //       setIsLoading(false);
  //       setHttpError(error.message);
  //     });
    
  // },[]);

  
  
  var display=<div className={classes.outer}>
                <Navbar/>
                {<Notes/>}
              </div>


  if(httpError){
    display=<section>
      <p>{httpError}</p>
    </section>
  }

  // console.log(DUMMY_DATA);
  return (
    <>
     {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    {display}

    {showModal&&<NotesModal/>}
    {showCreateModal &&<CreateNoteModal/>}
    </>
  );
}

export default App;
