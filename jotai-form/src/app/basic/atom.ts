import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

//atomの定義
//リセット時は Atom を定義した時のデフォルト値に戻るようにatomWithResetを使用
export const firstNameAtom = atomWithReset<string>("");
export const lastNameAtom = atomWithReset<string>("");
export const birthdayAtom = atomWithReset<Date | null>(null);
export const currentAgeAtom = atomWithReset<number | null>(null);

//atomの扱いをこのファイルで定義
//read onlyアトム
//firstNameAtomとlastNameAtomを結合して大文字にして返す
export const fullnameAtom = atom((get) =>
  `${get(firstNameAtom)} ${get(lastNameAtom)}`.toUpperCase()
);
export const birthdayJpAtom = atom((get) => {
  const birthday = get(birthdayAtom);
  return birthday ? dayjs(birthday).format("YYYY年M月D日") : "";
});

//write only
//birthdayAtomから現在の年齢を計算、currentageAtomに結果をsetする
export const setCurrentAgeAtom = atom(null, (get, set) => {
  const birthday = get(birthdayAtom);
  set(currentAgeAtom, birthday ? dayjs().diff(birthday, "year") : null);
});

//write read atom
export const bithdayFormatAtom = atom(
  (get) => {
    const _birthday = get(birthdayAtom);
    return _birthday ? dayjs(_birthday).format("YYYY年M月D日") : "";
  },
  //引数updateをDate型にして、birthdayatomにsetする
  (_, set, update: string) => {
    const _date = dayjs(update).toDate();
    set(birthdayAtom, !isNaN(_date.getTime()) ? _date : null);
  }
);
