import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../../lib/paths";
import { useUserContext } from "../../../context/hooks/useUser";

export const LayoutAuth = () => {
  // получаем пользователя из контекста
  const user = useUserContext();
  // если есть авторизация, тогда показываем страницу, если нет - редирект на главную
  return user ? <Outlet /> : <Navigate to={paths.MAIN} />;
};
