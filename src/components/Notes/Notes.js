import React from 'react'
import classes from './Notes.module.css'
import IndividualNote from './IndividualNote'
import { useSelector } from 'react-redux';

export default function Notes() {
  const notesList = useSelector((state) => state.notes.items);
  // console.log(typeof(notesList));
  // console.log(notesList);
  const pinnedNotes=notesList.filter((item) => item.pinned ==true);
  const unpinnedNotes=notesList.filter((item) => item.pinned == false);
console.log(pinnedNotes,unpinnedNotes);
  return (
      <>
        <div className={classes.div}>
          {pinnedNotes.map((item,index) => (
            
            <IndividualNote
            index={index}
              key={item.id}
              noteDetails={{
                id: item.id,
                title: item.title,
                tagline: item.tagline,
                content:item.content,
                pinned:item.pinned
              }}
            />
          ))}
          {unpinnedNotes.map((item,index) => (
            
            <IndividualNote
            index={index}
              key={item.id}
              noteDetails={{
                id: item.id,
                title: item.title,
                tagline: item.tagline,
                content:item.content,
                pinned:item.pinned
              }}
            />
          ))}
      </div>
      
      </>
      

    
  )
}
