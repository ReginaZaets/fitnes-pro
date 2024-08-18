import { useEffect, useRef, useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "../../api/firebaseConfig";
import { useOnClickOutside } from "../../context/hooks/useOnClickToCloseModal";
type PropsModal = {
  setIsResetPasswordModal: (value: boolean) => void;
};
const ResetPassword = ({ setIsResetPasswordModal }: PropsModal) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const user = auth.currentUser;

  useOnClickOutside(modalRef, () => {
    setIsResetPasswordModal(false);
  });

  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    setError(null);
  };
  const validateForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.password) {
      setError("Введите пароль");
      return false;
    } else if (formData.password !== formData.repeatPassword) {
      setError("Не совпадает пароль");
      return false;
    } else if (formData.password.length < 6) {
      setError("Пароль должен содержать как минимум 6 символов");
      return false;
    }
    return true;
  };

  const getInputColor = (inputName: string) => {
    if (error) {
      const ErrorLowerCase = error.toLowerCase();
      if (inputName === "password" && ErrorLowerCase.includes("пароль")) {
        return "border-[#DB0030]";
      } else if (
        inputName === "repeatPassword" &&
        ErrorLowerCase.includes("пароль")
      ) {
        return "border-[#DB0030]";
      }
    }
    return "border-[#D0CECE]";
  };
  async function handleRepeatPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!validateForm(e)) return;

    if (user) {
      const newPassword = formData.password;
      updatePassword(user, newPassword)
        .then(() => {
          setIsResetPasswordModal(false);
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            setError(error.message);
          }
        });
    } else {
      setError("Не удалось изменить пароль: пользователь не найден");
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div
        ref={modalRef}
        className="absolute bg-white border xl:p-10 px-8 py-10 w-auto h-auto shadow-customShadow rounded-radiusModal p-10"
      >
        <img src="/images/logo.svg" alt="imageLogo" className="ml-[30px] " />
        <div className="flex flex-col items-center mt-12 gap-2.5">
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor(
              "password"
            )}`}
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Пароль"
          />
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor(
              "repeatPassword"
            )}`}
            type="password"
            name="repeatPassword"
            onChange={handleChange}
            placeholder="Повторите пароль"
          />
          {error && (
            <p className="text-sm w-inputWidth leading-[15.4px] text-center text-[#F84D4D]">
              {error}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2.5 mt-btnModalMargin">
          <button
            onClick={handleRepeatPassword}
            className="w-inputWidth h-inputHeight border rounded-small bg-btnColor leading-textHeight text-lg font-normal text-black hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
