import React, { Fragment } from "react";
import classes from "./Loading.module.css";
const Loading = (props) => {
  return (
    <Fragment>
      <div style={props.login===true?props.sty:{}} className={classes.spinner}>
        <div className={classes.doubleBounce1}></div>
        <div className={classes.doubleBounce2}></div>
      </div>
      
    </Fragment>
  );
};

export default Loading;
