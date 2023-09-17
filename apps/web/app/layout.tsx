import { Toaster } from "@ui/components/ui/toaster"
import { SessionProvider } from "next-auth/react"

import "@ui/styles/globals.css";
import AuthProvider from "./components/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>SR Engine</title>
      <AuthProvider>
      <body>{children}</body>
      </AuthProvider>
      <Toaster/>
    </html>
  );
}
