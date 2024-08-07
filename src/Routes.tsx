import { Route, Routes } from "react-router-dom";
import { paths } from "./lib/paths";
import MainPage from "./pages/MainPage";
import { LayoutHeader } from "./components/common/LayoutHeader";
//import { LayoutAuth } from "./components/common/LayoutAuth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutHeader />}>
        <Route path={paths.MAIN} element={<MainPage />} />
        {/* <Route path={paths.COURSE} element={<CoursePage />} />
        <Route path={paths.WORKOUT} element={<WorkoutVideoPage />} />
        <Route element={<LayoutAuth />}>
          <Route path={paths.PROFILE} element={<UserProfilePage />} />
        </Route> */}
      </Route>
    </Routes>
  );
};
