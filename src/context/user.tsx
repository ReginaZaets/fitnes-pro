import { createContext, useState } from "react";


function checkLS() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user;
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  }
export const UserContext = createContext(null);

export function UserProvider({children}) {
  
     const [user, setUser] = useState(checkLS());
     //const [user, setUser] = useState("julia")
      
  function userLogin(newUser) {
    console.log(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    
  }
  
  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    console.log(user)
    
  }
  return(
    <UserContext.Provider value={{user, userLogin, logout}}>
        {children}
    </UserContext.Provider> 
  )
  
  }
