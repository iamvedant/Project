import React, { Component } from "react";
import Layout from "./Components/Layout/Layout";
import "./App.css";
import Index from "./Components/Pages/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Pages/Auth/Login";
import Cart from './Components/Pages/Cart'

import Orders from './Components/Pages/Auth/Orders'
class App extends Component {
  state = {
    searchResult: null,
    isAuth: false,
    isLoggingIn: false
  };

  componentDidMount() {
    if (localStorage.token && localStorage.name && localStorage.userId) {
      
      this.setState({ isAuth: true });
      
    }
  }

  setFalseLoggingIn = ()=>{
    this.setState({
      isLoggingIn: false
    })
  }

  setTrueLoggingIn = () =>{
    this.setState({
      isLoggingIn: true
    })
  }

  authStateChange = () =>{
    this.setState({
      isAuth: true
    })
  }
  inputChangeHandler = (e) => {
    const inputVal = e.target.value.trim();
    const url = "http://localhost:3002/products?page=1&search=" + inputVal;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (inputVal === "") {
          this.setState({ searchResult: null });
        } else {
          this.setState({ searchResult: resData.products });
        }
      });
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => {
                return (
                  <Layout
                    isAuth={this.state.isAuth}
                    changed={this.inputChangeHandler}
                    searchResults={this.state.searchResult}
                    
                    {...props}
                  >
                    <Index {...props} />
                  </Layout>
                );
              }}
            ></Route>
            <Route
              path="/login"
              exact
              render={(props) => {
                return (
                  <Layout
                    isAuth={this.state.isAuth}
                    changed={this.inputChangeHandler}
                    searchResults={this.state.searchResult}
                    {...props}
                  >
                    <Login isLogging={this.state.isLoggingIn} toFalse={this.setFalseLoggingIn} toTrue={this.setTrueLoggingIn}  auth={this.authStateChange}  login={true} {...props}></Login>
                  </Layout>
                );
              }}
            ></Route>
            <Route
              path="/signup"
              exact
              render={(props) => {
                return (
                  <Layout
                    isAuth={this.state.isAuth}
                    changed={this.inputChangeHandler}
                    searchResults={this.state.searchResult}
                    {...props}
                  >
                    <Login {...props}></Login>
                  </Layout>
                );
              }}
            ></Route>

            <Route
              path="/cart"
              exact
              render={(props) => {
                return (
                  <Layout
                    isAuth={this.state.isAuth}
                    changed={this.inputChangeHandler}
                    searchResults={this.state.searchResult}
                    {...props}
                  >
                    <Cart></Cart>
                  </Layout>
                );
              }}
            ></Route>

<Route
              path="/order"
              exact
              render={(props) => {
                return (
                  <Layout
                    isAuth={this.state.isAuth}
                    changed={this.inputChangeHandler}
                    searchResults={this.state.searchResult}
                    {...props}
                  >
                    <Orders></Orders>
                  </Layout>
                );
              }}
            ></Route>
            <Route
              path="/"
              render={(props) => {
                return (
                  <Layout
                    isAuth={this.state.isAuth}
                    changed={this.inputChangeHandler}
                    searchResults={this.state.searchResult}
                    {...props}
                  >
                    <h1>Page Not Found</h1>
                  </Layout>
                );
              }}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
