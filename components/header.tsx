import Link from "next/link";
import { AuthButton } from "./auth-button";

export const Header = () => {
  return (
    <header className="w-full px-6 py-6 md:px-16 lg:container lg:mx-auto">
      <div className="w-full flex justify-between">
        <Link href="/" className="text-2xl lg:text-3xl">
          XERO<strong className="text-orange-primary">TODO</strong>
        </Link>

        <AuthButton />
      </div>
    </header>
  );
};
