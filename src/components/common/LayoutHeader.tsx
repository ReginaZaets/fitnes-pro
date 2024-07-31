import { Outlet } from "react-router-dom";
import Header from "./Header";

export const LayoutHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
