import * as React from "react";
import { Route } from "react-router-dom";
import { GlobalContextProvider } from "../contexts/GlobalContext";
import "../styles/App.css";
import About from "./About";
import NavMenu from "./menu/NavMenu";
import Modal from "./Modal";
import PokeListPage from "./pokemonListPage/PokeListPage";

interface IAppState {
  loading: boolean;
  menuCategory: string[];
  modalColor?: string;
  modalContent: React.ReactNode | null;
  modalIsOpen: boolean;
  navMenuIsOpen: boolean;
  scrollPos: number;
}

class App extends React.Component<{}, IAppState> {
  private menuRef: React.RefObject<HTMLDivElement>;
  private modalRef: React.RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false,
      menuCategory: ["pokedex", "about"],
      modalContent: null,
      modalIsOpen: false,
      navMenuIsOpen: false,
      scrollPos: 0
    };
    this.closeModal = this.closeModal.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.openNavMenu = this.openNavMenu.bind(this);
    this.closeNavMenu = this.closeNavMenu.bind(this);
    this.toggleNavMenuActiveState = this.toggleNavMenuActiveState.bind(this);
    this.closeMenuOnOutsideClick = this.closeMenuOnOutsideClick.bind(this);
    this.openModalWithReactNode = this.openModalWithReactNode.bind(this);
    this.pokesListPage = this.pokesListPage.bind(this);
    this.menuRef = React.createRef();
    this.modalRef = React.createRef();
  }

  public openModalWithReactNode(ReactNode: React.ReactNode, color?: string) {
    this.setState(prevState => ({
      modalColor: color || "grey",
      modalContent: ReactNode,
      modalIsOpen: true,
      scrollPos: prevState.modalIsOpen
        ? prevState.scrollPos
        : document.documentElement.scrollTop + document.body.scrollTop
    }));
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
    this.state.navMenuIsOpen ? this.closeNavMenu() : this.openNavMenu();
  }

  public render() {
    return (
      <GlobalContextProvider
        value={{
          closeModal: this.closeModal,
          openModalWithReactNode: this.openModalWithReactNode,
          toggleLoading: this.toggleLoading
        }}>
        <div ref={this.menuRef}>
          <NavMenu
            links={this.state.menuCategory}
            root="pokedex"
            active={this.state.navMenuIsOpen}
            toggleNav={this.toggleNavMenuActiveState}
          />
        </div>
        <Route exact={true} path="/" render={this.pokesListPage} />
        <Route exact={true} path="/about" component={About} />
        <div
          id="spinner-container"
          style={{ display: this.state.loading ? "block" : "none" }}>
          <div id="spinner" />
        </div>
        <div ref={this.modalRef}>
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
        </div>
      </GlobalContextProvider>
    );
  }

  private openNavMenu() {
    this.setState({ navMenuIsOpen: true }, () => {
      document.documentElement.addEventListener(
        "click",
        this.closeMenuOnOutsideClick
      );
      document.documentElement.addEventListener(
        "touchstart",
        this.closeMenuOnOutsideClick
      );
    });
  }

  private closeNavMenu() {
    this.setState({ navMenuIsOpen: false }, () => {
      document.documentElement.removeEventListener(
        "click",
        this.closeMenuOnOutsideClick
      );
      document.documentElement.removeEventListener(
        "touchstart",
        this.closeMenuOnOutsideClick
      );
    });
  }

  private closeMenuOnOutsideClick(event: Event) {
    if (
      this.menuRef.current &&
      this.modalRef.current &&
      !this.menuRef.current.contains(event.target as Node) &&
      !this.modalRef.current.contains(event.target as Node)
    ) {
      this.closeNavMenu();
    }
  }

  private pokesListPage() {
    return <PokeListPage toggleLoading={this.toggleLoading} />;
  }
}

export default App;
