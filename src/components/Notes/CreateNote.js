import React,{useRef,useState} from 'react'
import Card from '../UI/Card'
import classes from './NotesModal.module.css'
import { uiActions } from '../../store/ui-slice.js'
import { useDispatch } from 'react-redux'
import { notesActions } from '../../store/notes-slice'
import { v4 as uuid } from 'uuid';

const isEmpty=value=>value.trim()==='';

export default function CreateNote() {
  
  const [formInputsValidity, setFormInputsValidity] = useState(true);


  const titleInputRef=useRef();
  const taglineInputRef=useRef();
  const contentInputRef=useRef();

  const dispatch=useDispatch();

  const addItemHandler = () => {
    dispatch(
      notesActions.addItemToNotesList({
        id:uuid(),
        title:titleInputRef.current.value,
        content:contentInputRef.current.value,
        tagline:taglineInputRef.current.value,
        pinned:false
      })
    );
  };
 

  const onCancelHandler=(e)=>{
    
    console.log('create');
    dispatch(uiActions.toggleCreateNoteModal());
  }
  
  
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const enteredTitle=titleInputRef.current.value;
    const enteredTitleIsValid=!isEmpty(enteredTitle);
    setFormInputsValidity(enteredTitleIsValid);
    if(enteredTitleIsValid===false)return;
    addItemHandler();
    dispatch(uiActions.toggleCreateNoteModal());
  }
  return (
    <form className={classes.backdrop}>
      <Card className={classes.card}>
        <div className={classes.forms}>
          <input className={classes.title} type='text' placeholder='Enter Title' maxLength="20" ref={titleInputRef}/>
          <p className={!formInputsValidity?classes.error:classes.noerror}>*title is required</p>
          <input className={classes.tagline} type='text' placeholder='Enter Tagline'maxLength="50" ref={taglineInputRef} />
          <textarea className={classes.content} type='text' placeholder='Your content goes here...' maxLength="350" ref={contentInputRef}/>
          
          <div className={classes.buttons}>
            <button onClick={onCancelHandler} className={classes.cancel}>Cancel</button>
            <button onClick={onSubmitHandler} className={classes.save}>Create</button>
          </div>
        </div>
      </Card>
    </form>
  )
}
