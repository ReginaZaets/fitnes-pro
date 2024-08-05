import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authUsersApi";

const SignupModal = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    if (
      !formData.name &&
      !formData.email &&
      !formData.password &&
      !formData.repeatPassword
    ) {
      setError("Введите имя, логин и пароль");
      return false;
    } else if (!formData.name) {
      setError("Введите имя");
      return false;
    } else if (!formData.email) {
      setError("Введите логин");
      return false;
    } else if (!formData.password) {
      setError("Введите пароль");
      return false;
    } else if (formData.password !== formData.repeatPassword) {
      setError("Пароль не совпадает");
      return false;
    }
    return true;
  };

  async function handleRegister(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!validateForm(e)) return;
    try {
      await register(formData.email, formData.password, formData.name);
      navigate("/signin");
    } catch (error: any) {
      setError(error.message);
    }
  }

  const getInputColor = (inputName: string) => {
    if (error) {
      const ErrorLowerCase = error.toLowerCase();
      if (inputName === "email" && ErrorLowerCase.includes("логин")) {
        return "border-[#DB0030]";
      } else if (
        inputName === "password" &&
        ErrorLowerCase.includes("пароль")
      ) {
        return "border-[#DB0030]";
      } else if (
        inputName === "repeatPassword" &&
        ErrorLowerCase.includes("пароль")
      ) {
        return "border-[#DB0030]";
      } else if (inputName === "name" && ErrorLowerCase.includes("имя")) {
        return "border-[#DB0030]";
      }
    }
    return "border-[#D0CECE]";
  };

  const handleOpenModal = () => {
    navigate("/signin");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10 transition-opacity duration-300">
      <div className="absolute bg-white border w-auto h-auto shadow-customShadow rounded-radiusModal p-4 md:p-10">
        <img
          src="/images/logo.svg"
          alt="imageLogo"
          className="w-logosigninModalW h-logosigninModalH ml-[30px] "
        />
        <div className="flex flex-col items-center mt-12 gap-2.5">
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor("name")}`}
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Имя"
          />
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor("email")}`}
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Эл. почта"
          />
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor("password")}`}
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Пароль"
          />
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor("repeatPassword")}`}
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
            onClick={handleRegister}
            className="w-inputWidth h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]"
          >
            Зарегистрироваться
          </button>
          <button
            onClick={handleOpenModal}
            className="w-inputWidth h-inputHeight border border-black rounded-small text-lg font-normal text-black leading-textHeight hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignupModal;
