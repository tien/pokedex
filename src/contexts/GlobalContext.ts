import * as React from "react";

interface IGlobalContext {
  closeModal: () => void;
  openModalWithReactNode: (ReactNode: React.ReactNode) => void;
}

// tslint:disable-next-line:no-empty
const closeModal: () => void = () => {};
// tslint:disable-next-line:no-empty
const openModalWithReactNode: (ReactNode: React.ReactNode) => void = () => {};

const globalContext = {
  closeModal,
  openModalWithReactNode
};

const {
  Provider: GlobalContextProvider,
  Consumer: GlobalContextConsumer
} = React.createContext<IGlobalContext>(globalContext);

export { GlobalContextProvider, GlobalContextConsumer };
