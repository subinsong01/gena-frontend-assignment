export async function GET() {
  return new Response(
    JSON.stringify({
      value: 98123,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
