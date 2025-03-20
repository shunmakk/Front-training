import { atomWithReset } from "jotai/utils";

//atomの定義
//リセット時は Atom を定義した時のデフォルト値に戻るようにatomWithResetを使用
export const firstNameAtom = atomWithReset<string>("");
export const lastNameAtom = atomWithReset<string>("");
export const birthdayAtom = atomWithReset<Date | null>(null);
export const currentAgeAtom = atomWithReset<number | null>(null);
