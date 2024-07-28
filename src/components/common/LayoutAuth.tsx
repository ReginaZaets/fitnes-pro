import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../lib/paths";

export const LayoutAuth = () => {
  // временная авторизацуия на моках
  const auth = true;
  // если есть авторизация, тогда показываем страницу, если нет - редирект на главную
  return auth ? <Outlet /> : <Navigate to={paths.MAIN} />;
};
