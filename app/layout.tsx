import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Dulce Paz | Psicología y Salud Mental en La Paz, Bolivia",
  description:
    "Atención psicológica presencial y virtual, ética, humana y basada en evidencia. Terapia individual, parejas interculturales, familias y orientación vocacional.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dulce Paz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <I18nProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}