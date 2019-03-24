import * as React from "react";

interface IGlobalContext {
  closeModal: () => void;
  openModalWithReactNode: (ReactNode: React.ReactNode, color?: string) => void;
  toggleLoading: () => void;
}

// tslint:disable-next-line:no-empty
const closeModal: () => void = () => {};
// tslint:disable-next-line:no-empty
const toggleLoading: () => void = () => {};
const openModalWithReactNode: (
  ReactNode: React.ReactNode,
  color?: string
) => // tslint:disable-next-line:no-empty
void = () => {};

const defaultValue = {
  closeModal,
  openModalWithReactNode,
  toggleLoading
};

const GlobalContext = React.createContext<IGlobalContext>(defaultValue);

const {
  Provider: GlobalContextProvider,
  Consumer: GlobalContextConsumer
} = GlobalContext;

export { GlobalContext, GlobalContextProvider, GlobalContextConsumer, IGlobalContext };
