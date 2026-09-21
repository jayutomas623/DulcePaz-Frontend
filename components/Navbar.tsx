"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";

import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-[#F7F7E8]/90 backdrop-blur-md border-b border-[#B2BFEB]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logotipo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#883F9B] flex items-center justify-center text-white font-bold text-xl shadow-sm">
            DP
          </div>
          <div>
            <span className="text-xl font-bold text-[#883F9B] tracking-tight block leading-none">
              Dulce Paz
            </span>
            <span className="text-[10px] uppercase font-medium tracking-widest text-[#A56A2E] mt-1 block">
              Psicología y Salud Mental
            </span>
          </div>
        </Link>

        {/* Enlaces Escritorio */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-[#883F9B] transition-colors">
            {t.nav.home}
          </Link>
          <Link href="/servicios" className="hover:text-[#883F9B] transition-colors">
            {t.nav.services}
          </Link>
          <Link href="/nosotros" className="hover:text-[#883F9B] transition-colors">
            {t.nav.about}
          </Link>
          <Link href="/contacto" className="hover:text-[#883F9B] transition-colors">
            {t.nav.contact}
          </Link>
        </nav>

        {/* CTA + Selector Idioma Interactivo */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-[#B2BFEB]/30 hover:bg-[#883F9B] hover:text-white text-[#883F9B] transition-all flex items-center gap-1 cursor-pointer"
            title="Cambiar idioma / Switch language"
          >
            <span className={lang === "es" ? "font-extrabold underline" : "opacity-60"}>ES</span>
            <span>|</span>
            <span className={lang === "en" ? "font-extrabold underline" : "opacity-60"}>EN</span>
          </button>

          <Link
            href="/agendar"
            className="bg-[#2A8ED1] hover:bg-[#883F9B] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            {t.nav.book}
          </Link>
        </div>

        {/* Botón Móvil */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs font-bold px-2 py-1 rounded bg-[#B2BFEB]/30 text-[#883F9B]"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#883F9B]"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="md:hidden bg-[#F7F7E8] border-b border-[#B2BFEB] px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-800 font-medium"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/servicios"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-800 font-medium"
          >
            {t.nav.services}
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-800 font-medium"
          >
            {t.nav.about}
          </Link>
          <Link
            href="/contacto"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-800 font-medium"
          >
            {t.nav.contact}
          </Link>
          <Link
            href="/agendar"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-[#2A8ED1] text-white py-3 rounded-xl font-semibold"
          >
            {t.nav.book}
          </Link>
        </div>
      )}
    </header>
  );
}