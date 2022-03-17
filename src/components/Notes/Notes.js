import React from 'react'
import classes from './Notes.module.css'
import IndividualNote from './IndividualNote'
export default function Notes(props) {

  return (
      
      <div className={classes.div}>
        {props.notes.map((item,index) => (
        
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

    
  )
}
