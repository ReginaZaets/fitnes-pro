import { createContext, ReactNode, useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { auth } from "../api/firebaseConfig";

type User = FirebaseUser | null;
type ContextState = { user: User };

function checkCookie(): User {
  try {
    const cookie = Cookies.get("user");
    if (!cookie) return null;
    // расшифровка cookie
    const bytes = CryptoJS.AES.decrypt(cookie, "secret user");
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    const decryptedData = JSON.parse(decryptedText);
    return decryptedData;
  } catch (error: unknown) { 
    Cookies.remove("user");
    return null;
  }
}

export const UserContext = createContext<ContextState | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(checkCookie());

  // Мемоизация значения контекста
  const value = useMemo(() => ({ user }), [user]);

  useEffect(() => {
    const exitUser = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // шифруем данные пользователя
        const EncryptedText = CryptoJS.AES.encrypt(
          JSON.stringify(user),
          "secret user"
        ).toString();
        Cookies.set("user", EncryptedText, {
          expires: 7, // хранятся 7 дней
          secure: true, // cookie отправляются по HTTPS
          sameSite: "Strict", // отправка с того же сайта
        });
      } else {
        Cookies.remove("user");
      }
    });
    return () => exitUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
