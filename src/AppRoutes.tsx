import { Route, Routes } from "react-router-dom";
import { paths } from "./lib/paths";
import MainPage from "./pages/MainPage";
import { LayoutHeader } from "./components/common/LayoutHeader";
import { LayoutAuth } from "./components/common/LayoutAuth";
import SigninModal from "./components/popups/SigninModal";
import SignupModal from "./components/popups/SignupModal";
import ResetPassword from "./components/popups/ResetPassword";
import UserProfile from "./pages/UserProfile";
import MyProgressModal from "./components/popups/myProgressPopups/MyProgressModal";
import WorkoutPage from "./pages/WorkoutVideoPage";
import CourseInfoPage from "./pages/CourseInfo";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutHeader />}>
        <Route path={paths.MAIN} element={<MainPage />}>
          <Route path={paths.SIGN_IN_MODAL} element={<SigninModal />} />
          <Route path={paths.SIGN_UP_MODAL} element={<SignupModal />} />
          <Route path={paths.NEW_PASSWORD_MODAL} element={<ResetPassword />} />
        </Route>
        <Route path={paths.COURSE} element={<CourseInfoPage />}>
          <Route path={paths.SIGN_IN_MODAL} element={<SigninModal />} />
          <Route path={paths.SIGN_UP_MODAL} element={<SignupModal />} />
          <Route path={paths.NEW_PASSWORD_MODAL} element={<ResetPassword />} />
        </Route>
        <Route element={<LayoutAuth />}>
          <Route path={paths.PROFILE} element={<UserProfile />}>
            <Route
              path={paths.NEW_PASSWORD_MODAL}
              element={<ResetPassword />}
            />
            {/* <Route path={paths.WORKOUT_MODAL} element={<WorkoutModal />} /> */}
          </Route>
          <Route path={paths.WORKOUT} element={<WorkoutPage />}>
            <Route
              path={paths.WORKOUT_PROGRESS_MODAL}
              element={<MyProgressModal />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
