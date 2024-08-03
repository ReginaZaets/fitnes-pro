import { useContext } from "react";
import { UserContext } from "../user";

export function useUserContext() {
    return useContext(UserContext);
    
  }