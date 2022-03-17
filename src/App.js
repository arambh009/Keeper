import classes from'./styles/App.module.css';
import { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Notes from './components/Notes/Notes';
import LoadingSpinner from './components/UI/LoadingSpinner';
import NotesModal from './components/Notes/NotesModal';
import CreateNoteModal from './components/Notes/CreateNote';

function App() {
  const showModal= useSelector(state=>state.ui.noteModalIsVisible);
  const showCreateModal= useSelector(state=>state.ui.createNoteModalIsVisible);
  const[notes,setNotes]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState(null);
  

  useEffect(()=>{
    const fetchNotes=async()=>{
      
      setIsLoading(true);
      const response=await fetch('https://react-http-f1485-default-rtdb.firebaseio.com/notes.json');

      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData=await response.json();
      
      const loadedNotes=[];
      for(const key in responseData){
        loadedNotes.push({
          id:key,
          title:responseData[key].title,
          tagline:responseData[key].tagline,
          content:responseData[key].content,
          pinned:responseData[key].pinned
        })
      }
      setNotes(loadedNotes);
      setIsLoading(false);
    }
    
      fetchNotes().catch((error)=>{
        setIsLoading(false);
        setHttpError(error.message);
      });
    
  },[]);

  
  
  var display=<div className={classes.outer}>
                <Navbar/>
                <Notes notes={notes}/>
              </div>

  if(isLoading){
    display=<LoadingSpinner/>
  }
  if(httpError){
    display=<section>
      <p>{httpError}</p>
    </section>
  }

  // console.log(DUMMY_DATA);
  return (
    <>
    {display}
    {showModal&&<NotesModal/>}
    {showCreateModal &&<CreateNoteModal/>}
    </>
  );
}

export default App;
