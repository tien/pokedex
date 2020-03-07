import {
  DependencyList,
  MutableRefObject,
  Ref,
  useCallback,
  useEffect,
  useState,
  useRef
} from "react";

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

export const useCombinedRefs = <T>(...refs: Ref<T>[]) =>
  useCallback(
    (element: T) =>
      refs.forEach(ref => {
        if (!ref) {
          return;
        }

        if (typeof ref === "function") {
          ref(element);
        } else {
          (ref as MutableRefObject<T>).current = element;
        }
      }),
    refs
  );

export const usePressedKey = (): [string[], number[]] => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [pressedKeyCodes, setPressedKeyCodes] = useState<number[]>([]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    setPressedKeys(pressedKeys => [
      ...pressedKeys.filter(k => k !== e.key),
      e.key
    ]);
    setPressedKeyCodes(pressedKeyCodes => [
      ...pressedKeyCodes.filter(k => k !== e.keyCode),
      e.keyCode
    ]);
  }, []);

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      setPressedKeys(pressedKeys => pressedKeys.filter(key => key !== e.key));
      setPressedKeyCodes(pressedKeyCodes =>
        pressedKeyCodes.filter(key => key !== e.keyCode)
      );
    },
    [setPressedKeys, setPressedKeyCodes]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  return [pressedKeys, pressedKeyCodes];
};

export const createKeyboardEventHandler = <T1, T2 extends Function>(
  key: string,
  callback: T2
) => (e: KeyboardEvent | React.KeyboardEvent<T1>) => {
  if (e.key === key) {
    callback(e);
  }
};

export const useDocumentKeyBoardEffect = (
  type: "keyup" | "keydown" | "keypress",
  key: string,
  callback: (e: KeyboardEvent) => any,
  deps: DependencyList
) =>
  useEffect(() => {
    const onKeyboardEvent = createKeyboardEventHandler(key, callback);

    document.addEventListener(type, onKeyboardEvent);

    return () => {
      document.removeEventListener(type, onKeyboardEvent);
    };
  }, deps);

export const useFocusTrap = <T extends HTMLElement>(shouldTrap: boolean) => {
  const ref = useRef<T>(null);

  const [pressedKeys] = usePressedKey();

  useDocumentKeyBoardEffect(
    "keydown",
    "Tab",
    e => {
      if (!shouldTrap) {
        return;
      }

      const focusables: NodeListOf<HTMLElement> =
        ref.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? (new NodeList() as NodeListOf<HTMLElement>);

      if (focusables.length === 0) {
        return;
      }

      const firstFocusableElement = focusables[0];
      const lastFocusableElement = focusables[focusables.length - 1];

      const hasFocusedElement = Array.from(focusables).some(
        element => element === document.activeElement
      );

      if (
        !hasFocusedElement ||
        (lastFocusableElement === document.activeElement &&
          !pressedKeys.includes("Shift"))
      ) {
        e.preventDefault();
        firstFocusableElement.focus();
      } else if (
        pressedKeys.includes("Shift") &&
        firstFocusableElement === document.activeElement
      ) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    },
    [shouldTrap, pressedKeys]
  );

  return ref;
};
