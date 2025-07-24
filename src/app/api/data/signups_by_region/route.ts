export async function GET() {
  return new Response(
    JSON.stringify({
      labels: ["North America", "Europe", "Asia"],
      values: [120, 95, 180],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
