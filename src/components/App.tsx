import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { GlobalContextProvider } from "../contexts/GlobalContext";
import "../styles/App.css";
import About from "./About";
import NavMenu from "./menu/NavMenu";
import Modal from "./Modal";
import PokeListPage from "./pokemonListPage/PokeListPage";

const menuCategory = ["pokedex", "about"];

interface IAppState {
  loading: boolean;
  modalColor?: string;
  modalContent: React.ReactNode | null;
  modalIsOpen: boolean;
  navMenuIsOpen: boolean;
  scrollPos: number;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false,
      modalContent: null,
      modalIsOpen: false,
      navMenuIsOpen: false,
      scrollPos: 0
    };
    this.closeModal = this.closeModal.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleNavMenuActiveState = this.toggleNavMenuActiveState.bind(this);
    this.openModalWithReactNode = this.openModalWithReactNode.bind(this);
    this.pokesListPage = this.pokesListPage.bind(this);
  }

  public openModalWithReactNode(ReactNode: React.ReactNode, color?: string) {
    this.setState({
      modalColor: color || "grey",
      modalContent: ReactNode,
      modalIsOpen: true,
      scrollPos: document.documentElement.scrollTop + document.body.scrollTop
    });
    document.body.classList.add("freeze-page");
    document.documentElement.classList.add("freeze-page");
  }

  public toggleLoading() {
    this.setState((prevState: any) => ({ loading: !prevState.loading }));
  }

  public closeModal() {
    document.body.classList.remove("freeze-page");
    document.documentElement.classList.remove("freeze-page");
    document.documentElement.scrollTop = this.state.scrollPos;
    document.body.scrollTop = this.state.scrollPos;
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
          openModalWithReactNode: this.openModalWithReactNode,
          toggleLoading: this.toggleLoading
        }}>
        <NavMenu
          links={menuCategory}
          active={this.state.navMenuIsOpen}
          toggleNav={this.toggleNavMenuActiveState}
        />
        <Redirect exact={true} path="/" to="/pokedex" />
        <Route path="/pokedex" render={this.pokesListPage} />
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

  private pokesListPage() {
    return <PokeListPage toggleLoading={this.toggleLoading} />;
  }
}

export default App;
