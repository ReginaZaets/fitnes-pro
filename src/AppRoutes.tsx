import { Route, Routes } from "react-router-dom";
import { paths } from "./lib/paths";
import MainPage from "./pages/MainPage";
import { LayoutHeader } from "./components/common/LayoutHeader/LayoutHeader";
import { LayoutAuth } from "./components/common/LayoutAuth/LayoutAuth";
import UserProfile from "./pages/UserProfile";
import WorkoutPage from "./pages/WorkoutVideoPage";
import CourseInfoPage from "./pages/CourseInfo";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutHeader />}>
        <Route path={paths.MAIN} element={<MainPage />}></Route>
        <Route path={paths.COURSE} element={<CourseInfoPage />}></Route>
        <Route element={<LayoutAuth />}>
          <Route path={paths.PROFILE} element={<UserProfile />}></Route>
          <Route path={paths.WORKOUT} element={<WorkoutPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};
