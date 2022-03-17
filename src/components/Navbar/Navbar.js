import React from 'react'
import Logo from '../Logo/Logo.js'
 import classes from './Navbar.module.css'
import { uiActions } from '../../store/ui-slice.js'
import { useDispatch } from 'react-redux'

export default function Navbar() {
  const dispatch=useDispatch();

  const toggleCreateNoteModalHandler=()=>{
    dispatch(uiActions.toggleCreateNoteModal());
  }
  return (
    <div className={classes.nav}>
      <Logo/>
      <div className={classes.addBar} onClick={toggleCreateNoteModalHandler}>
        <button
          className={classes.addButton}
         
        >
          +
        </button>
      
      </div>
      
    </div>
    
  )
}
