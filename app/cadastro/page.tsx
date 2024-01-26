import Link from "next/link";

import { RegisterForm } from "./components/register-form";
import { GoogleRegisterButton } from "./components/google-register-button";

const RegisterPage = () => {
  return (
    <section className="w-full flex-1 flex justify-center pt-12 lg:pt-24">
      <div className="w-full h-fit max-w-lg border border-white-primary rounded-3xl p-6">
        <h1 className="text-2xl font-bold mb-6">Cadastre sua conta</h1>

        <GoogleRegisterButton />

        <div className="relative w-full flex items-center justify-center before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:-translate-y-1/2 before:w-full before:h-[1px] before:bg-white-primary/50">
          <span className="block text-lg font-medium text-white-primary bg-gray-primary z-10 px-2">
            OU
          </span>
        </div>

        <RegisterForm />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-full h-[1px] bg-white-primary/40" />

          <span className="text-base font-medium">
            Possui uma conta?{" "}
            <Link href="/login" className="underline text-orange-primary">
              Entre aqui
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
