import React from "react";
import ReactDOM from "react-dom";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    <aside onClick={props.onclick} className="side-drawer">
      {props.children}
    </aside>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
