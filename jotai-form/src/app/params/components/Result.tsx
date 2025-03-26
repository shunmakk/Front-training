import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { paramsAtom, peopleAtom, Person } from "../atom";
import { FEMALE, MALE } from "../constants";

export const Result = () => {
  const [showResult, setShowResult] = useState(false);
  const params = useAtomValue(paramsAtom);
  const people = useAtomValue(peopleAtom);

  //ダミーデータを管理するstate
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  //paramsAtomに変更があるたびに絞り込みを行う(page.tsx内で)
  useEffect(() => {
    const _gender = params.gender;

    const filiteredByGender =
      _gender && (_gender === MALE || _gender === FEMALE)
        ? people.filter((person) => person.gender === _gender)
        : people;

    setFilteredPeople(filiteredByGender);
    setShowResult(true);
  }, [params, people]);

  return (
    <>
      {!showResult ? (
        <div className="loader"></div>
      ) : (
        <div className="content">
          <span>Result</span>
          <div className="contentInner result">
            <ul>
              {filteredPeople.map((person, index) => (
                <li key={index}>
                  <b>{person.name}</b>
                  <span>
                    Age <i>{person.age}</i>, Gender: <i>{person.gender}</i>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
