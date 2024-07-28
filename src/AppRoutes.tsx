import { Route, Routes } from "react-router-dom";
import { paths } from "./lib/paths";
import MainPage from "./pages/MainPage";
import { LayoutHeader } from "./components/common/LayoutHeader";
//import { LayoutAuth } from "./components/common/LayoutAuth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutHeader />}>
        <Route path={paths.MAIN} element={<MainPage />}>
          {/* <Route path={paths.SIGN_IN} element={<SigninModal />} />
          <Route path={paths.SIGN_UP} element={<SignupModal />} /> */}
        </Route>
        {/* <Route path={paths.COURSE} element={<CoursePage />}>
          <Route path={paths.SIGN_IN} element={<SigninModal />} />
          <Route path={paths.SIGN_UP} element={<SignupModal />} />
        </Route> */}
      </Route>
    </Routes>
  );
};
