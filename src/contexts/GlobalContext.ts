import React from "react";

export interface IGlobalContext {
  closeModal: () => void;
  openModalWithReactNode: (
    ReactNode: React.ReactNode,
    color?: string,
    callback?: () => void
  ) => void;
  toggleLoading: () => void;
}

// tslint:disable-next-line:no-empty
const closeModal: () => void = () => {};
// tslint:disable-next-line:no-empty
const toggleLoading: () => void = () => {};
const openModalWithReactNode: (
  ReactNode: React.ReactNode,
  color?: string,
  callback?: () => void
) => // tslint:disable-next-line:no-empty
void = () => {};

const defaultValue = {
  closeModal,
  openModalWithReactNode,
  toggleLoading
};

export const GlobalContext = React.createContext<IGlobalContext>(defaultValue);

export const {
  Provider: GlobalContextProvider,
  Consumer: GlobalContextConsumer
} = GlobalContext;
