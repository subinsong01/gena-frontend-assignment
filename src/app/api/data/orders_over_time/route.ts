export async function GET() {
  return new Response(
    JSON.stringify({
      labels: ["2025-07-01", "2025-07-02", "2025-07-03"],
      values: [32, 45, 41],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
