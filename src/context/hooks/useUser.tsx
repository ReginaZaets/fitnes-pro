import { useContext } from "react";
import { UserContext } from "../user";

export function useUserContext() {
  const context = useContext(UserContext);
  return context?.user;
}
