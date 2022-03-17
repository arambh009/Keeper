import './App.css';
import { useEffect,useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Notes from './components/Notes/Notes';

function App() {
  const[notes,setNotes]=useState([]);

  useEffect(()=>{
    const fetchNotes=async()=>{
      const response=await fetch('https://react-http-f1485-default-rtdb.firebaseio.com/notes.json');
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
    }
    fetchNotes();
  },[]);

  // console.log(DUMMY_DATA);
  return (
    <>
      <Navbar/>
      <Notes notes={notes}/>
    </>
  );
}

export default App;
// const DUMMY_DATA=[
//   {
//     id:0,
//     title:"Title 0",
//     tagline:"tagline0",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus eget. Nibh tellus molestie nunc non. Donec enim diam vulputate ut. Convallis aenean et tortor at risus viverra adipiscing.",
//     pinned:true
//   },
//   {
//     id:1,
//     title:"Title 1",
//     tagline:"Some random tagline1",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus eget. Nibh tellus molestie nunc non. Donec enim diam vulputate ut. Convallis aenean et tortor at risus viverra adipiscing.",
//     pinned:false
//   },
//   {
//     id:2,
//     title:"Title 2",
//     tagline:"tagline2",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus eget. Nibh tellus molestie nunc non. Donec enim diam vulputate ut. Convallis aenean et tortor at risus viverra adipiscing.",
//     pinned:true
//   },
//   {
//     id:3,
//     title:"Title 3",
//     tagline:"tagline3",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus eget. Nibh tellus molestie nunc non. Donec enim diam vulputate ut. Convallis aenean et tortor at risus viverra adipiscing.",
//     pinned:false
//   },
//   {
//     id:4,
//     pinned:false,
//     title:"Title 4",
//     tagline:"tagline4",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus eget. Nibh tellus molestie nunc non. Donec enim diam vulputate ut. Convallis aenean et tortor at risus viverra adipiscing.",
//   },
//   {
//     id:5,
//     title:"Title 5",
//     tagline:"tagline5",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus eget. Nibh tellus molestie nunc non. Donec enim diam vulputate ut. Convallis aenean et tortor at risus viverra adipiscing.",
//     pinned:false
//   }
// ]