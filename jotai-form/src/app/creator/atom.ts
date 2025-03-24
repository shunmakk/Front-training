import { createCounterAtom } from "./atomCreator";

//createCounterAtomをベースに2つのatomを作成する
export const incAtomX = createCounterAtom(0);
export const incAtomY = createCounterAtom(0);
