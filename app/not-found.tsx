import Link from "next/link";
import { Compass, Home, Sparkles, ArrowRight, HeartHandshake } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#F7F7E8] text-[#2D2D2D] min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Ilustración / Elemento visual cálido con la paleta de Dulce Paz */}
        <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-[#BD93C6]/20 rotate-6 transform transition-transform" />
          <div className="absolute inset-0 rounded-3xl bg-[#B2BFEB]/30 -rotate-6 transform transition-transform" />
          <div className="relative w-full h-full rounded-3xl bg-white border-2 border-[#B2BFEB]/60 flex flex-col items-center justify-center shadow-md">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#883F9B]">
              404
            </span>
            <div className="flex items-center gap-1 text-[#A56A2E] mt-1">
              <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Pausa</span>
            </div>
          </div>
        </div>

        {/* Textos institucionales según la Sección 8.3 del informe técnico */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#883F9B]/10 text-[#883F9B] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#A56A2E]" />
            <span>Espacio Seguro de Orientación</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#883F9B] tracking-tight">
            Esta página no se encuentra disponible
          </h1>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium max-w-md mx-auto">
            “A veces los caminos toman giros inesperados. Te ayudamos a volver a un espacio seguro.”
          </p>

          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Es posible que el enlace haya cambiado o que la dirección no sea correcta. Puedes retornar a nuestro inicio o explorar los servicios que brindamos.
          </p>
        </div>

        {/* Botones de redirección */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-sm shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>

          <Link
            href="/servicios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-[#883F9B] text-[#883F9B] hover:bg-[#883F9B] hover:text-white font-bold text-sm transition-all"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Ver Especialidades</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-6 border-t border-[#B2BFEB]/40 text-xs text-gray-500">
          Dulce Paz | Psicología y Salud Mental en La Paz, Bolivia
        </div>
      </div>
    </div>
  );
}
