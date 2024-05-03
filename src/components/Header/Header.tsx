//Header.tsx
import React from "react";
import { useDispatch } from "react-redux"; // redux-toolkit запись
import { useSelector } from "react-redux"; // redux-toolkit чтение
import { setLanguage, setPointType } from "../../store/slice"; // redux-toolkit запись

const Header = () => {
  const dispatch = useDispatch(); // redux-toolkit запись

  const userDataLanguage = useSelector(
    (state: { userData: { language: string } }) => state.userData.language,
  );
  const userDataPointType = useSelector(
    (state: { userData: { pointType: string } }) => state.userData.pointType,
  );

  return (
    <>
      <div>
        <select
          value={userDataLanguage}
          onChange={(event) => dispatch(setLanguage(event.target.value))}
        >
          <option value="ru_RU">RU</option>
          <option value="en_US">EN</option>
          <option>中文 - пока не работает</option>
        </select>
      </div>
      <div>
        <select
          value={userDataPointType}
          onChange={(event) => dispatch(setPointType(event.target.value))}
        >
          <option value="1">Достопримечательность</option>
        </select>
      </div>
    </>
  );
};

export default Header;
