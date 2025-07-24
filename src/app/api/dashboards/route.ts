import { NextResponse } from "next/server";
import { initialDashboards as dashboards } from "@/lib/data";

export async function GET() {
  return NextResponse.json(dashboards);
}

export async function POST(req: Request) {
  const body = await req.json();

  const rawName = body.name?.trim();
  const id = rawName.toLowerCase().replace(/\s+/g, "-");

  const exists = dashboards.find((d) => d.id === id);
  if (exists) {
    return NextResponse.json(
      { error: "Dashboard with this name already exists." },
      { status: 400 }
    );
  }

  const newDashboard = {
    id,
    name: rawName,
    charts: [],
  };

  dashboards.push(newDashboard);

  return NextResponse.json(newDashboard, { status: 201 });
}
