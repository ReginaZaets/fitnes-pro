import { Route, Routes } from "react-router-dom";
import { paths } from "./lib/paths";
import MainPage from "./pages/MainPage";
import { LayoutHeader } from "./components/common/LayoutHeader";
import { LayoutAuth } from "./components/common/LayoutAuth";
import UserProfile from "./pages/UserProfile";
import MyProgressModal from "./components/popups/myProgressPopups/MyProgressModal";
import WorkoutPage from "./pages/WorkoutVideoPage";
import CourseInfoPage from "./pages/CourseInfo";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutHeader />}>
        <Route path={paths.MAIN} element={<MainPage />}>
        </Route>
        <Route path={paths.COURSE} element={<CourseInfoPage />}>
        </Route>
        <Route element={<LayoutAuth />}>
          <Route path={paths.PROFILE} element={<UserProfile />}>
          </Route>
          <Route path={paths.WORKOUT} element={<WorkoutPage />}>
            <Route
              path={paths.WORKOUT_PROGRESS_MODAL}
              element={<MyProgressModal workoutID=""/>}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
