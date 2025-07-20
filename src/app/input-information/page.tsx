import InputBox from "@/components/InputBox";

export default function DashBaordInformation() {
  return (
    <>
      <InputBox
        id=""
        label="Dashboard Name"
        placeholder="Enter dashboard Name"
      />
      <span className="font-light">
        Tip: Choose a name that describes what this dashboard will track
      </span>
    </>
  );
}
