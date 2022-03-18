import React,from 'react'
import Card from '../UI/Card'
import { BsPinAngle} from "react-icons/bs";
import { BsPinAngleFill} from "react-icons/bs";
import { MdDelete} from "react-icons/md";
import { uiActions } from '../../store/ui-slice.js'
import { useDispatch } from 'react-redux'
import { notesActions } from '../../store/notes-slice';
import classes from './IndividualNotes.module.css'

const bgcolor=['EEEDDE','FFF9B6','85F4FF',
'E3BEC6','F0D9FF','FFBED8','C1F4C5','C8F2EF','CEE5D0','9ADCFF'];



export default function IndividualNote(props) {
  const dispatch=useDispatch();
  const { title, tagline, content,pinned ,id} = props.noteDetails;
      
  const togglenNoteModalHandler=(e)=>{
      
        dispatch(uiActions.toggleNoteModal(props.noteDetails.id));
      }
    
  const removeItemHandler = (e) => {
       
        dispatch(notesActions.removeItemFromNotesList(id));
      };

    
  const pinHandler=(e)=>{
    
    dispatch(notesActions.updatePin(id));

  }
  
  const idx=props.index%10;
  const colour=bgcolor[idx];  
    
  return (
    <Card backgroundcolor={'#'+colour} className={classes.card}>
     
      {pinned===true?
                <div className={classes.buttons}>
                  <div onClick={e=> pinHandler(e)} className={classes.pinnedIcon}>
                    <BsPinAngleFill size={25} />
                  </div>
                  <div onClick={e=> removeItemHandler(e)} id="delete" className={classes.deleteIcon}>
                    <MdDelete size={25} color={"red"}/>
                  </div>
                </div>  
              
            
              :
              <div className={classes.buttons}>
                <div  onClick={e=> pinHandler(e)} className={classes.unpinnedIcon}>
                  <BsPinAngle size={25} />
                </div>
                <div  onClick={e=> removeItemHandler(e)} className={classes.deleteIcon}>
                  <MdDelete size={25} color={"red"}/>
                </div>
              </div>          
            }
        <div id="parent"className={classes.outer} onClick={e=>togglenNoteModalHandler(e)}>
        <div className={classes.header}>

            <h2 className={classes.title}>{title}</h2>
            
        </div>
        
        <h3 className={classes.tagline}>{tagline}</h3>
        <div className={classes.content}>{content.length>150?content.substring(1, 200)+'....':content}</div>
       
      </div>
        
    </Card>
  )
}
