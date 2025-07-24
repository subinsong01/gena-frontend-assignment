"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const goToInputInformationPage = () => {
    router.push("/create-dashboard");
  };

  const goToDashBoardPage = () => {
    router.push("/dashboards");
  };

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold mb-4">
        Welcome to gena Dashboard 📊
      </h1>
      <p className="text-lg">
        Get started by creating a new dashboard to visualize your data.
      </p>
      <button
        onClick={goToInputInformationPage}
        className="mt-6 px-10 py-3 font-bold bg-primary-color text-white hover:bg-primary-color-hover transition rounded-lg"
      >
        ➕ Create New Dashboard
      </button>
      <button
        onClick={goToDashBoardPage}
        className="mt-6 px-10 py-3 font-bold bg-primary-color text-white hover:bg-primary-color-hover transition rounded-lg"
      >
        📁 Go to DashBoard Page
      </button>
    </main>
  );
}
