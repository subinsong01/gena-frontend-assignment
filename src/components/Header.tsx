"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleGoToMainPage = () => {
    router.push("/");
  };
  return (
    <>
      <header
        onClick={handleGoToMainPage}
        className="w-full px-10 py-4 text-primary-color font-title text-base cursor-pointer"
      >
        gena <br />
        DashBoard
      </header>
      <hr className="w-full border-t border-[#E9E9E9]" />
    </>
  );
}
