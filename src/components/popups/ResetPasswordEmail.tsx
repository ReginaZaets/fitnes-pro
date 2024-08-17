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
      .then(() => {})
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error(error.message);
        }
      });
  }, [email]);

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
        className="absolute bg-white border xl:p-10 px-8 py-10 w-auto h-auto shadow-customShadow rounded-radiusModal"
      >
        <img src="/images/logo.svg" alt="imageLogo" className="ml-[30px] " />
        <p className="w-[278px] text-lg leading-[19.8px] mt-12 text-center">
          Ссылка для востановления пароля отправлена на {email}
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
