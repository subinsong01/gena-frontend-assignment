import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { initialCharts } from "@/lib/data";

const charts = initialCharts;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("GET /api/charts/[id] called with ID:", params.id);

  const chart = charts.find((c) => c.id === params.id);
  if (!chart) {
    console.warn("Chart not found:", params.id);
    return NextResponse.json({ error: "Chart not found" }, { status: 404 });
  }
  return NextResponse.json(chart);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const idx = charts.findIndex((c) => c.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Chart not found" }, { status: 404 });
  }

  const body = await req.json();
  charts[idx] = { ...charts[idx], ...body };

  return NextResponse.json(charts[idx]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const idx = charts.findIndex((c) => c.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Chart not found" }, { status: 404 });
  }

  const deleted = charts.splice(idx, 1)[0];
  return NextResponse.json(deleted);
}
