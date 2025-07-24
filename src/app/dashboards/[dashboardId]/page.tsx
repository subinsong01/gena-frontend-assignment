import DashboardDetailClient from "../../../components/DashboardDetail";

interface Props {
  params: {
    dashboardId: string;
  };
}

export default function DashboardDetailPage({ params }: Props) {
  return <DashboardDetailClient dashboardId={params.dashboardId} />;
}
