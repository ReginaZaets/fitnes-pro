import { Route, Routes } from "react-router-dom";
import { paths } from "./lib/paths";
import MainPage from "./pages/MainPage";
import { LayoutHeader } from "./components/common/LayoutHeader";
import { LayoutAuth } from "./components/common/LayoutAuth";
// import SigninModal from "./components/popups/SigninModal";
// import SignupModal from "./components/popups/SignupModak";
// import CoursePage from "./pages/CoursePage";
// import UserProfilePage from "./pages/UserProfile";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutHeader />}>
        <Route path={paths.MAIN} element={<MainPage />}>
          {/* <Route path={paths.SIGN_IN_MODAL} element={<SigninModal />} />
          <Route path={paths.SIGN_UP_MODAL} element={<SignupModal />} />
          <Route path={paths.RESET_PASSWORD} element={<ResetPasswordModal />} />
          <Route path={paths.NEW_PASSWORD} element={<NewPasswordModal />} /> */}
        </Route>
        {/* <Route path={paths.COURSE} element={<CoursePage />}>
          <Route path={paths.SIGN_IN_MODAL} element={<SigninModal />} />
          <Route path={paths.SIGN_UP_MODAL} element={<SignupModal />} />
          <Route path={paths.RESET_PASSWORD_MODAL} element={<ResetPasswordModal />} />
          <Route path={paths.NEW_PASSWORD_MODAL} element={<NewPasswordModal />} />
        </Route> */}
        <Route element={<LayoutAuth />}>
          {/* <Route path={paths.PROFILE} element={<UserProfilePage />}>
            <Route path={paths.RESET_PASSWORD_MODAL} element={<ResetPasswordModal />} />
            <Route path={paths.NEW_PASSWORD_MODAL} element={<NewPasswordModal />} /> 
            <Route path={paths.WORKOUT_MODAL} element={<WorkoutModal />} />
          </Route>
          <Route path={paths.WORKOUT} element={<WorkoutPage />}>
            <Route path={paths.WORKOUT_PROGRESS_MODAL} element={<ProgressModal />} />
          </Route> */}
        </Route>
      </Route>
    </Routes>
  );
};
