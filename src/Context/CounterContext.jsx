import { createContext } from "react";

export const CounterContext = createContext();

export default function CounterContextProvider(props) {
  return (
    <CounterContext.Provider value={{}}>
      {props.children}
    </CounterContext.Provider>
  );
}
