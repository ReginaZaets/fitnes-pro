import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authUsersApi";

const SigninModal = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
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
    if (!formData.email && !formData.password) {
      setError("Введите логин и пароль");
      return false;
    } else if (!formData.email) {
      setError("Введите логин");
      return false;
    } else if (!formData.password) {
      setError("Введите пароль");
      return false;
    }
    return true;
  };

  async function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!validateForm(e)) return;
    try {
      const user = await login(formData.email, formData.password);
      console.log("user:", user);
      navigate("/");
    } catch (error: any) {
      console.error("Error registering:", error);
      setError(error.message);
    }
  }
  const getInputColor = (inputName: string) => {
    if (error) {
      if (inputName === "email" && error.includes("логин")) {
        return "border-[#DB0030]";
      } else if (inputName === "password" && error.includes("пароль")) {
        return "border-[#DB0030]";
      }
    }
    return "border-[#D0CECE]";
  };
  const handleClickSignin = () => {
    navigate("/signup");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10 transition-opacity duration-300">
      <div className="relative bg-white border w-auto max-w-lg h-auto shadow-customShadow rounded-radiusModal p-4 md:p-10">
        <img
          src="/images/logo.svg"
          alt="imageLogo"
          className="w-logosigninModalW h-logosigninModalH ml-[30px] "
        />
        <div className="flex flex-col items-center mt-12 gap-2.5">
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor("email")}`}
            type="text"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Логин"
          />
          <input
            className={`border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight ${getInputColor("password")}`}
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Пароль"
          />
          {error && (
            <p className="text-sm leading-[15.4px] text-[#F84D4D]">{error}</p>
          )}
        </div>
        <div className="flex flex-col gap-2.5 mt-btnModalMargin">
          <button
            onClick={handleLogin}
            className="w-inputWidth h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]"
          >
            Войти
          </button>
          <button
            onClick={handleClickSignin}
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
