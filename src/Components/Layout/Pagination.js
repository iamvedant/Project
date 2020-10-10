import React from "react";
import {NavLink} from 'react-router-dom'
import Loading from '../../UI/Spinner/Loading'
const Pagination = (props) => {
  console.log(props.load);
  let prevButton = (
    <button disabled className="btn disabled">
        {"<<"} Prev
      </button>)
    if(props.currPage>1){
      prevButton = <NavLink onClick={()=>props.clicked(props.currPage-1)} to={"?page="+(+props.currPage-1)} className="btn">
        {" "}
        {"<<"} Prev
      </NavLink>;
    }
    let load = null;
    if(props.load){
      load = <Loading></Loading>
    }
    let moreAhead = null;
    // if(props.pages>props.nextPage){
    //   moreAhead = <h1 style={{"display": "inline", "margin": "0 10px"}}>...</h1>
    // }
    let buttonOne = <NavLink onClick={()=>props.clicked(1)} to="?page=1" className="btn">
    1
  </NavLink>

if(+props.currPage===1){
      buttonOne = <NavLink onClick={()=>props.clicked(1)} to="?page=1" className="btn Page-Active">1</NavLink>
}

  let buttons = null;
  let pages = [];
  for(let i=props.prevPage; i<=props.nextPage;i++){
    pages.push(i);
  }

  buttons = pages.map(i=>
    <NavLink key={i}
        onClick={()=>props.clicked(i)}
        to={"?page="+i}
        className={+props.currPage===i?'btn Page-Active': 'btn'}>
        {i}
      </NavLink>
  )

  let nextButton = <NavLink onClick={()=>props.clicked(+props.currPage+1)} to={"?page="+(+props.currPage+1)} className="btn">
  Next {">>"}

</NavLink>
  return (
    <div className="pagination">
      {prevButton}
      {buttonOne}
      {buttons}
      {moreAhead}
      {nextButton}
      {load}
    </div>
  );
};

export default Pagination;
