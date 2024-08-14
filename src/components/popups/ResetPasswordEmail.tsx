import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useRef } from "react";
import { auth } from "../../api/firebaseConfig";
import { useOnClickOutside } from "../../context/hooks/useOnClickToCloseModal";

type Props = {
  email: string;
  setIsResetPasswordEmailModal: (value: boolean) => void;
};
const ResetPasswordEmail = ({ email, setIsResetPasswordEmailModal }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    setIsResetPasswordEmailModal(false);
  });

  useEffect(() => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Отправка пароля на почту");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div
        ref={modalRef}
        className="absolute bg-white border w-[360px] h-[223px] shadow-customShadow rounded-radiusModal p-10"
      >
        <img
          src="/images/logo.svg"
          alt="imageLogo"
          className="w-[220px] h-logosigninModalH ml-[30px] "
        />
        <p className="text-lg leading-[19.8px] mt-12 text-center">
          Ссылка для востановления пароля отправлена на {email}
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
