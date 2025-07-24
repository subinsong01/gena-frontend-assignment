import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import CustomToastContainer from "@/components/ToastContainer";

export const metadata: Metadata = {
  title: "Gena DashBoard",
  description: "Create and manage your dashboards with Gena",

  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "any",
      },
    ],
  },
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
        <main className="flex flex-col justify-center min-h-[calc(100vh-120px)] p-8 mx-5">
          {children}
        </main>
        <footer className="text-center p-4 text-sm text-information-">
          © 2025 Gena Dashboard
        </footer>
        <CustomToastContainer />
      </body>
    </html>
  );
}
