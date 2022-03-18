import React,{useState} from 'react'
import classes from './Notes.module.css'
import IndividualNote from './IndividualNote'
import { useSelector } from 'react-redux';
import ReactPaginate from "react-paginate";

export default function Notes() {

  const [pageNumber,setPageNumber]=useState(0);

  const notesList = useSelector((state) => state.notes.items);
  const usersPerPage=6;
  const pagesVisited=pageNumber*usersPerPage;


  const  pageCount=Math.ceil(notesList.length/usersPerPage);
  console.log(pageCount);

  const changePage=({selected})=>{
    setPageNumber(selected);
  }
  return (
      <>
        <div className={classes.div}>
         
          {notesList.slice(pagesVisited, pagesVisited + usersPerPage).map((item,index) => (
            
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
      <div className={classes.cover}>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={classes.paginationBttns}
        previousLinkClassName={classes.previousBttn}
        nextLinkClassName={classes.nextBttn}
        disabledClassName={classes.paginationDisabled}
        activeClassName={classes.paginationActive}
      />
      </div>
    </>
      

    
  )
}
