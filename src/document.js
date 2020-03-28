import React from "react";
import ReactDOM from "react-dom";

import "./document.less";
import Logo from "./assets/logo.png";

const Document = () => (
  <div className="text">
    <p>Document Webpack Hello World</p>
    <p>MITTY IS THERE</p>
    <p className="uppercase">text</p>

    <p lang="en-us">HAO</p>

    <picture>
      <img src={Logo} alt="logo" width={100} size={100} />
    </picture>
  </div>
);

ReactDOM.render(<Document />, document.getElementById("root"));
