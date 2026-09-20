import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dulce Paz | Psicología y Salud Mental en La Paz, Bolivia",
  description:
    "Atención psicológica presencial y virtual, ética, humana y basada en evidencia. Terapia individual, parejas interculturales, familias y orientación vocacional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}