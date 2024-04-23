//useUserData
import { useSelector } from "react-redux"; // redux-toolkit чтение

function useUserData() {
  const userDataLanguage = useSelector(
    (state: { userData: { language: string } }) => state.userData.language,
  );
  const userDataPointType = useSelector(
    (state: { userData: { pointType: string } }) => state.userData.pointType,
  );
  const userDataPoints = useSelector(
    (state: { userData: { points: any } }) => state.userData.points,
  );

  return [userDataLanguage, userDataPointType, userDataPoints];
}
export default useUserData;
