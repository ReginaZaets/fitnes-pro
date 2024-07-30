import { createContext, useContext } from "react";

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
    const navigate = useNavigate();
  
  function userLogin(newUser) {
    console.log(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    navigate(routeObj.MAIN);
  }
  
  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate(routeObj.SIGN_IN_MODAL);
  }
  return(
    <UserContext.Provider value={{user, userLogin, logout}}>
        {children}
    </UserContext.Provider> 
  )
  
  }
