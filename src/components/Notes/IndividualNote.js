import React from 'react'
import Card from '../UI/Card'
import { BsPinAngle} from "react-icons/bs";
import { BsPinAngleFill} from "react-icons/bs";
import { MdDelete} from "react-icons/md";
import classes from './IndividualNotes.module.css'

const bgcolor=['FFB2A6','EEEDDE','9ADCFF','E3CAA5','FFD365','FFBED8','C1F4C5','FF6464','BB9981','789395'];

export default function IndividualNote(props) {
    const idx=props.index%10;
    
    const colour=bgcolor[idx];
     // console.log(colour);
    const { title, tagline, content,pinned } = props.noteDetails;
    // console.log(title,tagline,content,id);
    
  return (
    <Card backgroundcolor={'#'+colour} className={classes.card}>
        <div className={classes.header}>
          <h2 className={classes.title}>{title}</h2>
          {pinned===true?
            <div className={classes.buttons}>
              <div  className={classes.pinnedIcon}>
                <BsPinAngleFill size={25} />
              </div>
              <div  className={classes.deleteIcon}>
                <MdDelete size={25} color={"red"}/>
              </div>
            </div>  
           
           
            :
            <div className={classes.buttons}>
              <div  className={classes.unpinnedIcon}>
                <BsPinAngle size={25} />
              </div>
              <div  className={classes.deleteIcon}>
                <MdDelete size={25} color={"red"}/>
              </div>
            </div>          
          }
        </div>
        
        <h3 className={classes.tagline}>{tagline}</h3>
        <div className={classes.content}>{content}</div>
    </Card>
  )
}
