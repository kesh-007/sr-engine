import "@ui/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Srengine</title>
      <body>{children}</body>
    </html>
  );
}
