import classes from './Card.module.css';

const Card = (props) => {
    // console.log(props.children);
    // console.log(props.backgroundcolor);
  return (
    <div style={props.backgroundcolor && {backgroundColor:props.backgroundcolor}}
      className={`${classes.card} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </div>
  );
};

export default Card;