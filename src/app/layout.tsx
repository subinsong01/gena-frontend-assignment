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
      <body className="antialiased">
        {" "}
        <Header />
        <main className="flex flex-col justify-center h-screen mx-5 sm:mx-15">
          {children}
        </main>
      </body>
    </html>
  );
}
