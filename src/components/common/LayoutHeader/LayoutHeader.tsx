import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export const LayoutHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
