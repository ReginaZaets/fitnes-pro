import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { ref, set } from "firebase/database";

export const register = async (email: string, password: string) => {
  try {
    const userCreate = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCreate.user;

    await set(ref(db, "users/" + user.uid), {
      _uid: user.uid,
      email: user.email,
    });

    return user;
  } catch (error: any) {
    console.log(error.message);
    switch (error.code) {
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
};

export const login = async (email: string, password: string) => {
  try {
    const userLogin = await signInWithEmailAndPassword(auth, email, password);
    return userLogin.user;
  } catch (error: any) {
    console.log(error.message);
    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        throw new Error("Недействительный логин или пароль");
      case "auth/invalid-email":
        throw new Error("Неверный формат email");
      default:
        throw new Error("Ошибка входа. Попробуйте еще раз.");
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.log(error.message);
  }
};
