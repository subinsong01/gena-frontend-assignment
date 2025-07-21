"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import InputBox from "@/components/InputBox";

export default function DashBaordInformation() {
  const router = useRouter();
  const [dashboardName, setDashboardName] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/configure-chart?name=${encodeURIComponent(dashboardName)}`);
  };

  return (
    <section className="w-full max-w-xl mx-auto animate-fadeUp mt-6">
      <InputBox
        id="dashboard-name"
        label="Dashboard Name"
        placeholder="Enter dashboard Name"
        value={dashboardName}
        onChange={(e) => setDashboardName(e.target.value)}
      />
      <span className="font-light text-sm block">
        Tip: Choose a name that describes what this dashboard will track
      </span>
      <div className="flex justify-end w-full mt-5">
        <PrimaryButton type="submit" onClick={handleClick}>
          create
        </PrimaryButton>
      </div>
    </section>
  );
}
