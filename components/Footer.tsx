import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#883F9B] text-white pt-16 pb-12 border-t border-[#B2BFEB]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#883F9B] flex items-center justify-center font-bold">
                DP
              </div>
              <span className="text-xl font-bold tracking-tight">Dulce Paz</span>
            </div>
            <p className="text-[#F7F7E8]/80 text-sm leading-relaxed">
              Centro de salud mental y bienestar integral enfocado en terapia humana, accesible y basada en evidencia científica en La Paz, Bolivia.
            </p>
            <p className="text-xs text-[#A56A2E] bg-[#F7F7E8] px-3 py-1.5 rounded-md inline-block font-semibold">
              “Comprendernos mejor también es parte del proceso de sentirnos mejor.”
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#BD93C6] mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F7E8]/90">
              <li><Link href="/" className="hover:underline">Inicio</Link></li>
              <li><Link href="/servicios" className="hover:underline">Servicios</Link></li>
              <li><Link href="/nosotros" className="hover:underline">Quiénes Somos</Link></li>
              <li><Link href="/contacto" className="hover:underline">Contacto y Ubicación</Link></li>
              <li><Link href="/agendar" className="hover:underline">Agendar Cita</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#BD93C6] mb-4">
              Contacto & Ubicación
            </h4>
            <ul className="space-y-3 text-sm text-[#F7F7E8]/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#BD93C6] shrink-0 mt-0.5" />
                <span>Calle 15 de Calacoto, Edificio Parque, La Paz, Bolivia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#BD93C6] shrink-0" />
                <a href="https://wa.me/59176543210" target="_blank" rel="noreferrer" className="hover:underline">+591 76543210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#BD93C6] shrink-0" />
                <span>contacto@dulcepaz.com</span>
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#BD93C6] mb-4">
              Síguenos
            </h4>
            <div className="flex gap-3 text-[#F7F7E8]">
              <a
                href="https://instagram.com/dulcepaz.psi"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#2A8ED1] transition-colors"
                aria-label="Instagram de Dulce Paz"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            <div className="mt-6">
              <span className="text-xs text-[#BD93C6] block">Horarios de atención:</span>
              <span className="text-xs text-[#F7F7E8]/80 block">Lun - Vie: 09:00 - 19:00</span>
              <span className="text-xs text-[#F7F7E8]/80 block">Sáb: 09:00 - 13:00</span>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F7E8]/60 gap-4">
          <p>© 2026 Dulce Paz - Psicología y Salud Mental. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:underline">Políticas de Privacidad</Link>
            <Link href="/terminos" className="hover:underline">Términos del Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}