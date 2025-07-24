import { NextRequest, NextResponse } from "next/server";
import { initialDashboards as dashboards } from "@/lib/data";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const dashboard = dashboards.find((d) => d.id === params.id);

  if (!dashboard) {
    return NextResponse.json(
      { message: "Dashboard not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(dashboard);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const index = dashboards.findIndex((d) => d.id === params.id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Dashboard not found" },
      { status: 404 }
    );
  }

  dashboards[index] = {
    ...dashboards[index],
    ...body,
  };

  return NextResponse.json(dashboards[index]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = dashboards.findIndex((d) => d.id === params.id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Dashboard not found" },
      { status: 404 }
    );
  }

  const deleted = dashboards.splice(index, 1)[0];
  return NextResponse.json(deleted);
}
