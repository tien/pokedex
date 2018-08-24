import * as React from "react";
import { Route } from "react-router-dom";
import { GlobalContextProvider } from "../contexts/GlobalContext";
import "../styles/App.css";
import Modal from "./Modal";
import NavMenu from "./NavMenu";
import PokeListPage from "./PokeListPage";

const menuCategory = ["Pokemon List", "delays & cancellations"];

interface IAppState {
  modalContent: React.ReactNode | null;
  modalIsOpen: boolean;
  navMenuIsOpen: boolean;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      modalContent: null,
      modalIsOpen: false,
      navMenuIsOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.toggleNavMenuActiveState = this.toggleNavMenuActiveState.bind(this);
    this.openModalWithReactNode = this.openModalWithReactNode.bind(this);
  }

  public openModalWithReactNode(ReactNode: React.ReactNode) {
    this.setState({
      modalContent: ReactNode,
      modalIsOpen: true
    });
  }

  public closeModal() {
    this.setState({ modalIsOpen: false, modalContent: null });
  }

  public toggleNavMenuActiveState() {
    this.setState((prevState: IAppState) => ({
      navMenuIsOpen: !prevState.navMenuIsOpen
    }));
  }

  public render() {
    return (
      <GlobalContextProvider
        value={{
          closeModal: this.closeModal,
          openModalWithReactNode: this.openModalWithReactNode
        }}>
        <NavMenu
          links={menuCategory}
          active={this.state.navMenuIsOpen}
          toggleNav={this.toggleNavMenuActiveState}
        />
        <Modal active={this.state.modalIsOpen} closeModal={this.closeModal}>
          {this.state.modalContent}
        </Modal>
        <Route path="/Pokemon-List" component={PokeListPage} />
      </GlobalContextProvider>
    );
  }
}

export default App;
