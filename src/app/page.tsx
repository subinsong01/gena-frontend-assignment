// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Gena Dashboard
      </h1>
      <p className="text-lg text-gray-700">
        Start by creating a new dashboard to visualize your data.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Create New Dashboard
      </button>
    </main>
  );
}
