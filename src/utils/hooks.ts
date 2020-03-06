import { DependencyList, useCallback, useState } from "react";

export const useFocus = (initialState = false) => {
  const [isFocused, setIsFocused] = useState(initialState);

  const onFocus = useCallback(() => setIsFocused(true), []);

  const onBlur = useCallback(() => setIsFocused(false), []);

  return [isFocused, { onBlur, onFocus }];
};

export const useEnterKeyCallback = <T1, T2 extends Function>(
  callback: T2,
  deps: DependencyList
) =>
  useCallback((e: React.KeyboardEvent<T1>) => {
    if (e.key === "Enter") {
      callback(e);
    }
  }, deps);
