import { useState } from "react";

export function useStateNoUpdate<T>(initial: T): [T, (nextValue: T) => void] {
  const [state, setState] = useState(initial);

  return [
    state,
    (nextState: T) => {
      setState(nextState);
    },
  ];
}
