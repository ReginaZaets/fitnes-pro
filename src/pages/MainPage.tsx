import { Outlet } from "react-router-dom";
import { Main } from "../components/common/Main";
const MainPage = () => {
  return (
    <>
      <main>
      <Main/>
      </main>
      <Outlet />
    </>
  );
};

export default MainPage;
