import * as React from "react";

interface IGlobalContext {
  closeModal: () => void;
  openModalWithReactNode: (ReactNode: React.ReactNode, color: string) => void;
}

// tslint:disable-next-line:no-empty
const closeModal: () => void = () => {};
const openModalWithReactNode: (
  ReactNode: React.ReactNode,
  color: string
) => // tslint:disable-next-line:no-empty
void = () => {};

const globalContext = {
  closeModal,
  openModalWithReactNode
};

const {
  Provider: GlobalContextProvider,
  Consumer: GlobalContextConsumer
} = React.createContext<IGlobalContext>(globalContext);

export { GlobalContextProvider, GlobalContextConsumer };
