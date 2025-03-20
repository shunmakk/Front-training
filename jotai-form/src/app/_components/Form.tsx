import { atom, useAtom, useSetAtom } from "jotai";
import {
  firstNameAtom,
  lastNameAtom,
  birthdayAtom,
  currentAgeAtom,
} from "../basic/atom";
import { useEffect } from "react";
import dayjs from "dayjs";
import { RESET, useResetAtom } from "jotai/utils";

type Props = {
  onSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Form({ onSubmit }: Props) {
  //useAtomで値と更新用関数を取得 usestateみたいな感じか
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [birthday, setBirthday] = useAtom(birthdayAtom);
  //usesetAtomは更新用関数のみを取得
  const setCurrentAge = useSetAtom(currentAgeAtom);

  //dayisライブラリで年齢を計算するロジック
  useEffect(() => {
    if (!birthday) return;
    setCurrentAge(dayjs().diff(birthday, "year"));
  }, [birthday, setCurrentAge]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(true);
  };

  //フォームリセット用の関数
  const resetAll = useResetAtom(
    atom(null, (_, set) => {
      set(firstNameAtom, RESET);
      set(lastNameAtom, RESET);
      set(birthdayAtom, RESET);
      set(currentAgeAtom, RESET);
    })
  );

  const handleReset = () => {
    resetAll();
    onSubmit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formControll">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <span>※ 英字（小文字）のみ入力</span>
      </div>
      <div className="formControll">
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <span>※ 英字（小文字）のみ入力</span>
      </div>
      <div className="formControll">
        <div>
          <label htmlFor="birthday">BirthDay</label>
          <input
            type="date"
            id="birthday"
            //"YYYY-MM-DD"方式にformat
            value={birthday ? dayjs(birthday).format("YYYY-MM-DD") : ""}
            //Date型に変換
            onChange={(e) => setBirthday(dayjs(e.target.value).toDate())}
          />
        </div>
        <span>日付を入力</span>
      </div>
      <div className="buttonGroup">
        <button type="submit" disabled={!firstName || !lastName || !birthday}>
          送信
        </button>
        <button type="button" onClick={handleReset}>
          リセット
        </button>
      </div>
    </form>
  );
}
