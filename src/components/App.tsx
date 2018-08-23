import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import "../styles/App.css";
import NavMenu from "./NavMenu";

const menuCategory = ["monitor stops", "delays & cancellations"];

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <NavMenu links={menuCategory} />
      </BrowserRouter>
    );
  }
}

export default App;
