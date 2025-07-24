import { NextRequest, NextResponse } from "next/server";
import { initialCharts } from "@/lib/data";

const charts = initialCharts;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dashboardId = searchParams.get("dashboardId");

  if (dashboardId) {
    const filtered = charts.filter(
      (chart) => chart.dashboardId === dashboardId
    );
    const chartsWithEndpoint = filtered.map((chart) => ({
      ...chart,
      dataEndpoint: `/api/charts/${chart.id}`,
    }));

    return NextResponse.json(chartsWithEndpoint);
  }

  const chartsWithEndpoint = charts.map((chart) => ({
    ...chart,
    dataEndpoint: `/api/charts/${chart.id}`,
  }));

  return NextResponse.json(chartsWithEndpoint);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newChart = {
    id: `chart-${Date.now()}`,
    dashboardId: body.dashboardId,
    type: body.type,
    title: body.title,
    data: body.data,
    order: body.order ?? charts.length,
  };

  charts.push(newChart);

  return NextResponse.json(newChart, { status: 201 });
}
