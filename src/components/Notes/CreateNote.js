import React,{useRef,useState} from 'react'
import Card from '../UI/Card'
import classes from './NotesModal.module.css'
import { uiActions } from '../../store/ui-slice.js'
import { useDispatch } from 'react-redux'

const isEmpty=value=>value.trim()==='';

export default function CreateNote() {
  const [formInputsValidity, setFormInputsValidity] = useState(true);


  const titleInputRef=useRef();
  const taglineInputRef=useRef();
  const contentInputRef=useRef();

  const dispatch=useDispatch();

 

  const onCancelHandler=(e)=>{
    e.preventDefault();
    console.log('create');
    dispatch(uiActions.toggleCreateNoteModal());
  }
  
  
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const enteredTitle=titleInputRef.current.value;
    const enteredTagline=taglineInputRef.current.value;
    const enteredContent=contentInputRef.current.value;

    const enteredTitleIsValid=!isEmpty(enteredTitle);
    setFormInputsValidity(enteredTitleIsValid);
    if(enteredTitleIsValid===false)return;
    
  }
  return (
    <form className={classes.backdrop}>
      <Card className={classes.card}>
        <div className={classes.forms}>
          <input className={classes.title} type='text' placeholder='Enter Title' maxLength="50" ref={titleInputRef}/>
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
