// RootLayout.tsx

import { Toaster } from "@ui/components/ui/toaster";
import "@ui/styles/globals.css";
import AuthProvider from "../components/AuthProvider";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AuthProvider>
        <main className="flex-grow">{children}</main>
      </AuthProvider>
      <Toaster />
      <Footer />
    </div>
  );
}
