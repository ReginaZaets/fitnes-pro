import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "./firebaseConfig";

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userCreate = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCreate.user;

    await updateProfile(user, { displayName: name });

    await set(ref(db, "users/" + user.uid), {
      _uid: user.uid,
      email: user.email,
      name: user.displayName,
    });
    await signOut(auth);
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/email-already-in-use":
          throw new Error("Данная почта уже используется. Попробуйте войти.");
        case "auth/invalid-email":
          throw new Error("Неверный формат почты");
        case "auth/weak-password":
          throw new Error("Пароль должен содержать не менее 6 символов");
        default:
          throw new Error("Ошибка регистрации. Попробуйте еще раз.");
      }
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userLogin = await signInWithEmailAndPassword(auth, email, password);
    return userLogin.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const authError = error as AuthError
      switch (authError.code) {
        case "auth/user-not-found":
          throw new Error("Недействительный логин");
        case "auth/wrong-password":
          throw new Error("Недействительный пароль");
        case "auth/invalid-email":
          throw new Error("Неверный формат email");
        case "auth/invalid-credential":
          throw new Error(
            "Пароль введен неверно, попробуйте еще раз. Восстановить пароль?"
          );
        default:
          throw new Error("Ошибка входа. Попробуйте еще раз.");
      }
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
 
  }
};
