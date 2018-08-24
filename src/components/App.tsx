import * as React from "react";
import { Route } from "react-router-dom";
import "../styles/App.css";
import NavMenu from "./NavMenu";
import PokeListPage from "./PokeListPage";

const menuCategory = ["Pokemon List", "delays & cancellations"];

class App extends React.Component {
  public render() {
    return (
      <div>
        <NavMenu links={menuCategory} active={false} />
        <Route path="/Pokemon-List" component={PokeListPage} />
      </div>
    );
  }
}

export default App;
