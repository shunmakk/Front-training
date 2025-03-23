// import dayjs from "dayjs";
import { useAtomValue } from "jotai";
// import {
//   birthdayAtom,
//   currentAgeAtom,
//   firstNameAtom,
//   lastNameAtom,
// } from "../basic/atom";

// dayjs.locale("ja");
//atomが定義されたファイルでロジックを書いたものをimport
import { fullnameAtom, birthdayJpAtom, currentAgeAtom } from "../basic/atom";

type Props = {
  isShow: boolean;
};

export function Result({ isShow }: Props) {
  //useAtomValueでatom の値のみを取得
  // const firstName = useAtomValue(firstNameAtom);
  // const lastName = useAtomValue(lastNameAtom);
  // const birthday = useAtomValue(birthdayAtom);
  const currentAge = useAtomValue(currentAgeAtom);
  const fullName = useAtomValue(fullnameAtom);
  const birthdayJP = useAtomValue(birthdayJpAtom);

  return (
    <>
      {isShow && (
        <div className="content">
          <span>Result</span>
          <div className="contentInner result">
            <p>
              <b>{fullName}</b>さんは
              <b>{birthdayJP}</b>生まれです
            </p>
            <p>
              現在<b>{currentAge}</b>歳です
            </p>
          </div>
        </div>
      )}
    </>
  );
}
