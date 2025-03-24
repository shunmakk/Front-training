import { atom } from "jotai";

export const createCounterAtom = (initialValue: number) => {
  //ベースとなるbase
  const baseAtom = atom(initialValue);

  const incAtom = atom(
    (get) => get(baseAtom),
    (_, set, newValue: number) => set(baseAtom, newValue + 1)
  );
  return incAtom;
};
