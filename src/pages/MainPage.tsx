import { Outlet } from "react-router-dom";
import { Main } from "../components/common/Main/Main";
const MainPage = () => {
  return (
    <>
      <main>
        <Main />

        <Outlet />
      </main>
    </>
  );
};

export default MainPage;
