import React, {Fragment} from 'react'
import './Login.css'
import {Redirect} from 'react-router-dom'
import Loading from '../../../UI/Spinner/Loading'
const loginHandler = (event,props) =>{
  event.preventDefault();
  props.toTrue();
  let email = document.getElementById('user').value;
  let pass = document.getElementById('pw').value;
  const url = 'http://localhost:3002/login';
  fetch(url, {
    method: 'POST',
    headers:{"Content-Type": 'application/json'},
    body: JSON.stringify({
    email: email,
    password: pass})
  }).then(res=>{
      return res.json();
  }).then(resData=>{
    localStorage.token=resData.token;
    localStorage.name=resData.userName;
    localStorage.userId = resData.userId;
    props.auth();
    props.history.push('/');
    props.toFalse();
  }).catch(err=>{
    console.log(err);
  })
}

const Login = (props) =>{
  let loggButt = <label htmlFor="btn" style={{"fontWeight": "bold"}} className="sub-label" name="submit"  type="submit" id="button">Submit</label>;
  if(props.isLogging){
    loggButt = <label style={{"fontWeight": "bold"}} className="sub-label grayed" name="submit"  type="submit" id="button">Submitting <Loading login={true} sty={{"position": "relative", "transform": "translate(7px, 0)"}}></Loading></label>;
  }
    let right = <div class="right">
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
    if(props.login===true){
        right = <div className="right">
        <div className="sign" align="center">
           
            <span id="heading">Login</span>
            
            <form method="POST" action="/login">
            <p className="label-tag">E-MAIL</p>
            
            <input required placeholder="Enter Your E-Mail" name="email" className="input" id="user" type="email"/>
            <br/><br/>
            <p className="label-tag">PASSWORD</p>
    
            <input required placeholder="Enter Password" name="password" className="input" id="pw" type="password"/>
            
            
            <input onClick={(event)=>loginHandler(event, props)} style={{"display": "none"}} name="btn" type="submit" id="btn"></input>
           
            <input  type="hidden" name="_csrf" value="<%= csrfToken %>"/>
        </form>
        
            <div className="submit-panel">
                    {loggButt}
                    <a style={{"color": "rgb(150, 144, 144)"}} href="/signup">Not A Member?</a>
              </div>
        
        </div>
    </div>
    }
    return(
    <Fragment>
    
    <div className="left">
    
        <video autoplay="true" muted loop id="myvideo">
            <source src="background.mp4" type="video/mp4"></source>
        </video>
    </div>
    {right}
    </Fragment>
    );
    
}

export default Login;