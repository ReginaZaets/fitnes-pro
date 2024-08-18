import { useEffect, useRef, useState } from "react";
import { login } from "../../api/authUsersApi";
import { sanitizeHtml } from "../../lib/sanitizeHtml";
import { useOnClickOutside } from "../../context/hooks/useOnClickToCloseModal";

type PropsModal = {
  setIsSigninModal: (value: boolean) => void;
  openSignupModal: () => void;
  openResetPasswordModal: (email: string) => void;
};
const SigninModal = ({
  setIsSigninModal,
  openSignupModal,
  openResetPasswordModal,
}: PropsModal) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  useOnClickOutside(modalRef, () => {
    setIsSigninModal(false);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: sanitizeHtml(value),
      };
    });
    setError(null);
  };
  const validateForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!formData.email && !formData.password) {
      setError("Введите почту и пароль");
      return false;
    } else if (!formData.email) {
      setError("Введите почту");
      return false;
    } else if (!formData.password) {
      setError("Введите пароль");
      return false;
    } else if (!validateEmail.test(formData.email)) {
      setError("Неверный формат почты");
      return false;
    }
    return true;
  };

  async function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!validateForm(e)) return;
    try {
      await login(formData.email, formData.password);
      setIsSigninModal(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  const getInputColor = (inputName: string) => {
    if (error) {
      const ErrorLowerCase = error.toLowerCase();
      if (
        inputName === "email" &&
        ErrorLowerCase.includes("почту" && "почты")
      ) {
        return "border-[#DB0030]";
      } else if (
        inputName === "password" &&
        ErrorLowerCase.includes("пароль")
      ) {
        return "border-[#DB0030]";
      }
    }
    return "border-[#D0CECE]";
  };

  const handleClickResetPasswordEmail = () => {
    openResetPasswordModal(formData.email);
  };

  const renderErrorMessage = (message: string) => {
    const resetPasswordText = "Восстановить пароль?";
    const parts = message.split(resetPasswordText);
    return (
      <span>
        {parts[0]}
        {parts.length > 1 && (
          <span
            className="text-sm text-[#F84D4D] underline cursor-pointer"
            onClick={handleClickResetPasswordEmail}
          >
            {resetPasswordText}
          </span>
        )}
      </span>
    );
  };

  const handleClickSignup = () => {
    openSignupModal();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="absolute bg-white border xl:p-10 px-8 py-10 w-auto h-auto shadow-customShadow rounded-radiusModal md:p-10 z-10"
      >
        <img src="/images/logo.svg" alt="imageLogo" className="ml-[30px] " />
        <div className="flex flex-col items-center mt-12 gap-2.5">
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor(
              "email"
            )}`}
            type="text"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Эл. почта"
            data-testid="email"
          />
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor(
              "password"
            )}`}
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Пароль"
            data-testid="password"
          />
          {error ? (
            <p
              className={`text-sm w-inputWidth leading-[15.4px] text-center text-[#F84D4D] `}
            >
              {renderErrorMessage(error)}
            </p>
          ) : (
            <p
              className={`text-sm w-inputWidth leading-[15.4px] text-center text-[#F84D4D] `}
            >
              {error}
            </p>
          )}
        </div>
        <div className="flex items-center flex-col gap-2.5 mt-btnModalMargin">
          <button
            data-testid="signin"
            onClick={handleLogin}
            className="w-inputWidth h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]"
          >
            Войти
          </button>
          <button
            onClick={handleClickSignup}
            className="w-inputWidth h-inputHeight border border-black rounded-small text-lg font-normal text-black leading-textHeight hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninModal;
