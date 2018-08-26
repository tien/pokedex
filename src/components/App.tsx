import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { GlobalContextProvider } from "../contexts/GlobalContext";
import "../styles/App.css";
import About from "./About";
import NavMenu from "./menu/NavMenu";
import Modal from "./Modal";
import PokeListPage from "./pokemonListPage/PokeListPage";

const menuCategory = ["pokemon list", "about"];

interface IAppState {
  loading: boolean;
  modalColor?: string;
  modalContent: React.ReactNode | null;
  modalIsOpen: boolean;
  navMenuIsOpen: boolean;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false,
      modalContent: null,
      modalIsOpen: false,
      navMenuIsOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleNavMenuActiveState = this.toggleNavMenuActiveState.bind(this);
    this.openModalWithReactNode = this.openModalWithReactNode.bind(this);
  }

  public openModalWithReactNode(ReactNode: React.ReactNode, color?: string) {
    document.body.style.overflow = "hidden";
    this.setState({
      modalColor: color || "grey",
      modalContent: ReactNode,
      modalIsOpen: true
    });
  }

  public toggleLoading() {
    this.setState((prevState: any) => ({ loading: !prevState.loading }));
  }

  public closeModal() {
    this.setState({ modalIsOpen: false, modalContent: null });
    document.body.style.overflow = "auto";
  }

  public toggleNavMenuActiveState() {
    this.setState((prevState: IAppState) => ({
      navMenuIsOpen: !prevState.navMenuIsOpen
    }));
  }

  public render() {
    const pokesListPage = () => (
      <PokeListPage toggleLoading={this.toggleLoading} />
    );
    return (
      <GlobalContextProvider
        value={{
          closeModal: this.closeModal,
          openModalWithReactNode: this.openModalWithReactNode,
          toggleLoading: this.toggleLoading
        }}>
        <NavMenu
          links={menuCategory}
          active={this.state.navMenuIsOpen}
          toggleNav={this.toggleNavMenuActiveState}
        />
        <Redirect exact={true} path="/"  to="/pokemon-list"/>
        <Route path="/pokemon-list" render={pokesListPage} />
        <Route path="/about" component={About} />
        <div
          id="spinner-container"
          style={{ display: this.state.loading ? "block" : "none" }}>
          <div id="spinner" />
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
