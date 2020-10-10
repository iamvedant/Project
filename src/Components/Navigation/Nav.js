import React from "react";
import "./Nav.css";
import classes from './Nav.module.css'
import {NavLink} from 'react-router-dom'


const Nav = (props) => {
  console.log(props);
  const listItems = [
    ["shop", "/", "fas fa-store icon", false],
    ["cart", "/cart", "fas fa-shopping-cart icon", true],
    ["products", "/products", "fas fa-list icon", false],
    ["orders", "/order", "fas fa-receipt icon", true],
    ["add product", "/admin/add-product", "fas fa-plus icon", true],
    ["admin products", "/admin/products", "fas fa-user-shield icon", true],
  ];

  const NavItems = listItems.filter(item=>item[3]===false||props.isAuth).map((item) => {

    let itemArr = item[0].split(' ').map(eachItem=>{
      eachItem = eachItem.split('');
      eachItem[0] = eachItem[0].toUpperCase();
      return(
        
        eachItem.join('')
      )
    });

    item[0] = itemArr.join(' ')
    
    return (
      <li key={item[0]} className="main-header__item">
        <i className={item[2]}></i>
        <NavLink exact to={item[1]}>{item[0]}</NavLink>
      </li>
    );
  });
  let search = null;

  if(props.searchResults){
  search = props.searchResults.map(product=>{
    return(
      <li>{product.title}</li>
    )
  })}
  let searchBar = null;
  if(props.location.pathname!=="/login" && props.location.pathname!=="/signup")
  {searchBar = (
    <div className={classes.formWrapper}>
      <form method="GET" action="/products">
        <input
          className="main-search-bar"
          name="search"
          placeholder="Search"
          onChange={props.changed}
        ></input>
        <button className="search-label" type="submit">
          <label>
            <i
              style={{ "fontSize": "17px", "marginRight": "10px" }}
              className="icon-app icon fas fa-search"
            ></i>
          </label>
        </button>
      </form>
      {props.searchResults?<div className={classes.result}>
        {search}
      </div>:null}
    </div>

  );}

  let authPanel = null;
  authPanel = (
    <div className="main-header-div">
      <ul className="main-header__item-list loggedOne">
        <li className="main-header__item logged">
          <NavLink to="/login">Login</NavLink>
        </li>

        <li className="main-header__item logged">
          <NavLink to="/signup">Signup</NavLink>
        </li>
      </ul>
    </div>
  );

  if(props.isAuth){
    authPanel = <div className="main-header-div">
    <ul className="main-header__item-list loggedOne">
      <li className="main-header__item logged">
        <NavLink to="#">Hello, {localStorage.name}</NavLink>
      </li>
    </ul>
  </div>
  }

  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <div>
          <ul className="main-header__item-list">
            <li>
              <i
                style={{ "fontSize": "30px" }}
                className="icon-app icon fas fa-book-open"
              ></i>
            </li>
            {NavItems}
          </ul>
        </div>
        <div>{searchBar}</div>

        {authPanel}
      </nav>
    </header>
  );
};

export default Nav;
