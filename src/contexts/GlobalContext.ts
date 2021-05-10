/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode } from "react";

export interface IGlobalContext {
  closeModal: (ignoreCallback: boolean) => void;
  openModalWithReactNode: (
    ReactNode: ReactNode,
    color?: string,
    callback?: () => void
  ) => void;
  toggleLoading: () => void;
}

const closeModal: () => void = () => {};
const toggleLoading: () => void = () => {};
const openModalWithReactNode: (
  ReactNode: ReactNode,
  color?: string,
  callback?: () => void
) => void = () => {};

const defaultValue = {
  closeModal,
  openModalWithReactNode,
  toggleLoading,
};

export const GlobalContext = createContext<IGlobalContext>(defaultValue);

export const {
  Provider: GlobalContextProvider,
  Consumer: GlobalContextConsumer,
} = GlobalContext;
