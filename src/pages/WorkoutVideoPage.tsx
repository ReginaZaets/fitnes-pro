import { Outlet } from "react-router-dom";
import WorkoutComponent from "../components/common/WorkoutComponent/WorkoutComponent";
const WorkoutPage = () => {
  return (
    <>
      <WorkoutComponent />
      <Outlet />
    </>
  );
};

export default WorkoutPage;
