import { Toaster } from "@ui/components/ui/toaster"

import "@ui/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>SR Engine</title>
      <body>{children}</body>
      <Toaster/>
    </html>
  );
}
