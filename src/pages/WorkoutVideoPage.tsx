import { Outlet } from "react-router-dom";
import Workout from "../components/common/Workout";
const WorkoutPage = () => {
  return (
    <>
      <Workout />
      <Outlet />
    </>
  );
};

export default WorkoutPage;
