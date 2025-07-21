import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Gena DashBoard",
  description: "Create and manage your dashboards with Gena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-8">
          {children}
        </main>
        <footer className="text-center p-4 text-sm text-gray-500">
          © 2025 Gena Dashboard
        </footer>
      </body>
    </html>
  );
}
