import * as React from "react";
import { Route } from "react-router-dom";
import { GlobalContextProvider } from "../contexts/GlobalContext";
import "../styles/App.css";
import NavMenu from "./menu/NavMenu";
import Modal from "./Modal";
import PokeListPage from "./pokemonListPage/PokeListPage";

const menuCategory = ["Pokemon List", "delays & cancellations"];

interface IAppState {
  modalColor?: string;
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

  public openModalWithReactNode(ReactNode: React.ReactNode, color?: string) {
    this.setState({
      modalColor: color,
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
        <div
          style={{
            height: "100vh",
            overflowY: this.state.modalIsOpen ? "hidden" : "auto"
          }}>
          <Route path="/Pokemon-List" component={PokeListPage} />
        </div>
        <Modal
          style={{
            backgroundColor: this.state.modalColor
              ? this.state.modalColor
              : "white"
          }}
          active={this.state.modalIsOpen}
          closeModal={this.closeModal}>
          {this.state.modalContent}
        </Modal>
      </GlobalContextProvider>
    );
  }
}

export default App;
