import classes from './Card.module.css';

const Card = (props) => {
  
  return (
    <div style={props.backgroundcolor && {backgroundColor:props.backgroundcolor}}
      className={`${classes.card} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </div>
  );
};

export default Card;