import React, { Fragment } from "react";

const Signup = (props) => {
  return (
    <Fragment>
      <div class="left">
        <video autoplay muted loop id="myvideo">
          <source src="background.mp4" type="video/mp4" />
        </video>
      </div>

      <div class="right">
        <div class="sign" align="center">
          <span id="heading">Sign Up</span>
          
          <form method="POSt" action="/signup">
            <p class="label-tag">FULL NAME</p>

            <input
              required
              placeholder="Enter Your Full Name"
              name="name"
              class="input"
              id="fn"
              type="text"
            />
            <br />
            <br />
            <p class="label-tag">E-MAIL</p>

            <input
              required
              placeholder="Enter Your E-Mail"
              name="email"
              class="input"
              id="user"
              type="email"
            />
            <br />
            <br />
            <p class="label-tag">PASSWORD</p>

            <input
              required
              placeholder="Enter Password"
              name="password"
              class="input"
              id="pw"
              type="password"
            />

<input style={{"display": "none"}} name="btn" type="submit" id="btn"></input>
            
            <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
          </form>
          <div className="submit-panel">
                    <label htmlFor="btn" style={{"fontWeight": "bold"}} className="sub-label" name="submit"  type="submit" id="button">Submit</label>
                    <a style={{"color": "rgb(150, 144, 144)"}} href="/signup">Not A Member?</a>
                </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup