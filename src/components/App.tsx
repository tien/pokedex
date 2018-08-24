import * as React from "react";
import { Route } from "react-router-dom";
import "../styles/App.css";
import Modal from "./Modal";
import NavMenu from "./NavMenu";
import PokeListPage from "./PokeListPage";

const menuCategory = ["Pokemon List", "delays & cancellations"];

interface IAppState {
  modalIsOpen: boolean;
  navMenuIsOpen: boolean;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      modalIsOpen: false,
      navMenuIsOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.toggleNavMenuActiveState = this.toggleNavMenuActiveState.bind(this);
  }

  public closeModal() {
    this.setState({ modalIsOpen: false });
  }

  public toggleNavMenuActiveState() {
    this.setState((prevState: IAppState) => ({
      navMenuIsOpen: !prevState.navMenuIsOpen
    }));
  }

  public render() {
    return (
      <div>
        <NavMenu
          links={menuCategory}
          active={this.state.navMenuIsOpen}
          toggleNav={this.toggleNavMenuActiveState}
        />
        <Modal active={this.state.modalIsOpen} closeModal={this.closeModal} />
        <Route path="/Pokemon-List" component={PokeListPage} />
      </div>
    );
  }
}

export default App;
