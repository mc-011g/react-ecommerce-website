import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "Ecommerce website that sells shoes, athetic shoes, and boots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
