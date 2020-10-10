import React from "react";
import Navigation from "../Navigation/Nav";
const Layout = (props) => {
  return (
    <div>
      <Navigation {...props} searchResults={props.searchResults} changed={props.changed}></Navigation>
      {props.children}
    </div>
  );
};

export default Layout;
