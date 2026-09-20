import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

// Componente SVG personalizado para el icono de Instagram
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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
                <a href="https://wa.me/59176543210" target="_blank" className="hover:underline">+591 76543210</a>
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
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
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