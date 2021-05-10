import "../styles/App.css";

import { Component, createRef, ReactNode, RefObject } from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { GlobalContextProvider } from "../contexts/GlobalContext";
import Router from "../router";
import NavMenu from "./menu/NavMenu";
import Modal from "./Modal";

// TODO: This whole root component need to be nuked & purged
interface IAppState {
  loading: boolean;
  menuCategory: Array<string | { name: string; link: string }>;
  modalCloseCallback?: (() => void) | null;
  modalColor?: string;
  modalContent: ReactNode | null;
  modalIsOpen: boolean;
  navMenuIsOpen: boolean;
  scrollPos: number;
}

class App extends Component<RouteComponentProps, IAppState> {
  private menuRef: RefObject<HTMLDivElement>;
  private modalRef: RefObject<HTMLDivElement>;
  private defaultPageDescription =
    "An online interactive Pokédex where you can explore, search and see your favourite Pokémon stats, moves and evolutions.";

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      loading: false,
      menuCategory: [{ name: "pokedex", link: "browse" }, "about"],
      modalCloseCallback: null,
      modalContent: null,
      modalIsOpen: false,
      navMenuIsOpen: false,
      scrollPos: 0,
    };
    this.closeModal = this.closeModal.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.openNavMenu = this.openNavMenu.bind(this);
    this.closeNavMenu = this.closeNavMenu.bind(this);
    this.toggleNavMenuActiveState = this.toggleNavMenuActiveState.bind(this);
    this.closeMenuOnOutsideClick = this.closeMenuOnOutsideClick.bind(this);
    this.openModalWithReactNode = this.openModalWithReactNode.bind(this);
    this.menuRef = createRef();
    this.modalRef = createRef();
  }

  public openModalWithReactNode(
    ReactNode: ReactNode,
    color?: string,
    callBack?: () => void
  ) {
    this.setState(
      (prevState) => ({
        // TODO: This callback hack is dumb, need to refactor how modal work
        // BLAME: past self
        modalCloseCallback: callBack,
        modalColor: color ?? "grey",
        modalContent: ReactNode,
        modalIsOpen: true,
        scrollPos: prevState.modalIsOpen
          ? prevState.scrollPos
          : document.documentElement!.scrollTop + document.body.scrollTop,
      }),
      () => {
        document.body.classList.add("freeze-page");
        document.documentElement!.classList.add("freeze-page");
        this.modalRef.current?.scrollTo({ top: 0 });
      }
    );
  }

  public toggleLoading() {
    this.setState((prevState: any) => ({ loading: !prevState.loading }));
  }

  public closeModal(
    // TODO: This hack is dumb, need to refactor how modal work
    // BLAME: past self
    ignoreCallback: boolean = false
  ) {
    document.body.classList.remove("freeze-page");
    document.documentElement!.classList.remove("freeze-page");
    document.documentElement!.scrollTop = this.state.scrollPos;
    document.body.scrollTop = this.state.scrollPos;
    if (!ignoreCallback) {
      this.state.modalCloseCallback?.();
    }
    this.setState({
      modalCloseCallback: null,
      modalContent: null,
      modalIsOpen: false,
    });
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
          toggleLoading: this.toggleLoading,
        }}
      >
        <Helmet titleTemplate="%s | Pokédex" defaultTitle="Pokédex">
          <meta name="theme-color" content="#dd1414" />
          <meta
            property="og:description"
            content={this.defaultPageDescription}
          />
          <meta name="description" content={this.defaultPageDescription} />
        </Helmet>
        <NavMenu
          ref={this.menuRef}
          links={this.state.menuCategory}
          active={this.state.navMenuIsOpen}
          toggleNav={this.toggleNavMenuActiveState}
        />
        <main>
          <Router />
        </main>
        <div
          id="spinner-container"
          style={{ display: this.state.loading ? "block" : "none" }}
        >
          <div id="spinner" />
        </div>
        <Modal
          ref={this.modalRef}
          style={{
            backgroundColor: this.state.modalColor
              ? this.state.modalColor
              : "white",
          }}
          active={this.state.modalIsOpen}
          closeModal={this.closeModal}
        >
          {this.state.modalContent}
        </Modal>
      </GlobalContextProvider>
    );
  }

  private openNavMenu() {
    this.setState({ navMenuIsOpen: true }, () => {
      document.documentElement!.addEventListener(
        "click",
        this.closeMenuOnOutsideClick
      );
      document.documentElement!.addEventListener(
        "touchstart",
        this.closeMenuOnOutsideClick
      );
    });
  }

  private closeNavMenu() {
    this.setState({ navMenuIsOpen: false }, () => {
      document.documentElement!.removeEventListener(
        "click",
        this.closeMenuOnOutsideClick
      );
      document.documentElement!.removeEventListener(
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
}

export default withRouter(App);
