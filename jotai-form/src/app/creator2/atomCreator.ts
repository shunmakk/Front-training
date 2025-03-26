import { atom } from "jotai";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import "dayjs/locale/en";

export const createDateAtom = (initialValue: Date | null) => {
  //ベース
  const baseAtom = atom(initialValue);
  //[ ( 値 & 更新用関数 ), 値 A, 値 B ] を持つ Atom

  //write read atom
  const dateAtom = atom(
    (get) => {
      return get(baseAtom) ? dayjs(get(baseAtom)).format("YYYY-MM-DD") : "";
    },
    (_, set, update: Date | string) => {
      const _date = dayjs(update).toDate();
      set(baseAtom, !isNaN(_date.getTime()) ? _date : null);
    }
  );

  //read only
  const formatJpAtom = atom((get) => {
    return get(baseAtom)
      ? dayjs(get(baseAtom)).locale("ja").format("YYYY年M月D日")
      : "";
  });

  //read only
  const formatEnAtom = atom((get) => {
    return get(baseAtom)
      ? dayjs(get(baseAtom)).locale("en").format("MMMM D, YYYY")
      : "";
  });

  return [dateAtom, formatJpAtom, formatEnAtom] as const;
};
