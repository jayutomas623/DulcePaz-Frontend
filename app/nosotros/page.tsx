import Link from "next/link";
import { THERAPISTS_DATA } from "@/lib/mock-data";
import {
  Target,
  Eye,
  Brain,
  Network,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Quote,
  UserCheck,
} from "lucide-react";

export default function NosotrosPage() {
  return (
    <div className="bg-[#F7F7E8] text-[#2D2D2D] min-h-screen">
      {/* 1. ENCABEZADO INSTITUCIONAL */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#B2BFEB]/40 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#883F9B]/10 border border-[#883F9B]/20 text-[#883F9B] text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#A56A2E]" />
            <span>Identidad, Rigor Ético y Calidez Humana</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#883F9B] tracking-tight">
            Quiénes Somos
          </h1>

          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Dulce Paz nace con la convicción de hacer de la salud mental un espacio accesible, cálido y libre de estigmas en La Paz y para la comunidad hispanohablante e internacional.
          </p>

          <blockquote className="max-w-2xl mx-auto text-lg sm:text-xl italic font-semibold text-[#A56A2E] pt-2">
            “Comprendernos mejor también es parte del proceso de sentirnos mejor.”
          </blockquote>
        </div>
      </section>

      {/* 2. DECLARACIÓN DE MISIÓN Y VISIÓN */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Misión */}
          <div className="rounded-3xl bg-white border border-[#B2BFEB]/60 p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#883F9B]/10 text-[#883F9B] flex items-center justify-center">
                <Target className="w-6 h-6 text-[#883F9B]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A56A2E]">
                Nuestro Propósito Diario
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#883F9B]">
                Misión Institucional
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                Promover el bienestar emocional mediante servicios psicológicos éticos, personalizados y basados en evidencia, contribuyendo activamente al desarrollo armónico de personas, familias, organizaciones y comunidades.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#B2BFEB]/30 flex items-center gap-2 text-xs font-semibold text-[#883F9B]">
              <CheckCircle2 className="w-4 h-4 text-[#2A8ED1]" />
              <span>Bioética clínica y respeto irrestricto a la singularidad</span>
            </div>
          </div>

          {/* Visión */}
          <div className="rounded-3xl bg-white border border-[#B2BFEB]/60 p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2A8ED1]/10 text-[#2A8ED1] flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#2A8ED1]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A56A2E]">
                Hacia Dónde Vamos
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#883F9B]">
                Visión de Futuro
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                Ser un referente en Bolivia y Latinoamérica en psicoterapia, educación en salud mental y acompañamiento emocional, generando espacios de contención donde pedir ayuda psicológica sea cada vez más natural, digno y cotidiano.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#B2BFEB]/30 flex items-center gap-2 text-xs font-semibold text-[#883F9B]">
              <CheckCircle2 className="w-4 h-4 text-[#2A8ED1]" />
              <span>Impacto social, desestigmatización y alcance regional</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MARCOS TEÓRICOS DIVULGATIVOS: ENFOQUE SISTÉMICO Y COGNITIVO-CONDUCTUAL (TCC) */}
      <section className="py-16 bg-white/70 border-y border-[#B2BFEB]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#A56A2E] uppercase">
              Bases Científicas y Metodología
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#883F9B]">
              ¿Cómo trabajamos en consulta?
            </h2>
            <p className="text-base text-gray-600">
              Lejos de dogmas rígidos o improvisaciones, en Dulce Paz articulamos dos de los modelos psicoterapéuticos con mayor respaldo empírico en el mundo:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Enfoque Sistémico */}
            <div className="rounded-3xl bg-[#F7F7E8] border-2 border-[#B2BFEB]/60 p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#883F9B] text-white flex items-center justify-center">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#883F9B]">
                Enfoque Sistémico Relacional
              </h3>
              <p className="text-sm font-semibold text-[#A56A2E]">
                Comprender a la persona dentro de sus vínculos y contextos
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Ninguna persona existe aislada. El enfoque sistémico concibe el síntoma no como un defecto individual, sino como una manifestación de dinámicas relacionales complejas, pautas de comunicación y lealtades familiares invisibles.
              </p>
              <div className="bg-white rounded-xl p-4 border border-[#B2BFEB]/40 space-y-2 text-xs text-gray-700">
                <span className="font-bold text-[#883F9B] block">¿Para qué resulta especialmente útil?</span>
                <p>
                  Para desactivar nudos de comunicación en parejas, sanar conflictos intergeneracionales, tramitar desacuerdos en parejas interculturales y reorganizar límites sanos en el hogar.
                </p>
              </div>
            </div>

            {/* Enfoque Cognitivo-Conductual */}
            <div className="rounded-3xl bg-[#F7F7E8] border-2 border-[#B2BFEB]/60 p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2A8ED1] text-white flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#883F9B]">
                Enfoque Cognitivo-Conductual (TCC)
              </h3>
              <p className="text-sm font-semibold text-[#A56A2E]">
                Estructura, evidencia y herramientas aplicables a la vida diaria
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Es uno de los modelos psicoterapéuticos con mayor validación empírica en el ámbito clínico. Analiza la estrecha interconexión entre lo que pensamos (cognición), lo que sentimos (afecto) y lo que hacemos (conducta).
              </p>
              <div className="bg-white rounded-xl p-4 border border-[#B2BFEB]/40 space-y-2 text-xs text-gray-700">
                <span className="font-bold text-[#883F9B] block">¿Para qué resulta especialmente útil?</span>
                <p>
                  Para reestructurar creencias irracionales o autocríticas, aprender técnicas de regulación ante la ansiedad cotidiana, desactivar patrones evitativos y afrontar sintomatología depresiva con metas claras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FICHAS DEL EQUIPO PROFESIONAL REAL */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#A56A2E] uppercase">
            Cuerpo Especialista
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#883F9B]">
            Conoce a nuestro equipo
          </h2>
          <p className="text-base text-gray-600">
            Profesionales comprometidos con el trato humano, la confidencialidad absoluta y la actualización clínica continua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {THERAPISTS_DATA.map((therapist) => {
            // Iniciales para fallback de avatar visual armónico
            const initials = therapist.name
              .split(" ")
              .filter((word) => !word.startsWith("Lic."))
              .map((w) => w[0])
              .slice(0, 2)
              .join("");

            return (
              <div
                key={therapist.id}
                className="rounded-3xl bg-white border border-[#B2BFEB]/60 p-7 shadow-sm hover:shadow-xl hover:border-[#883F9B]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Avatar con iniciales estilizadas e icono */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#883F9B] to-[#BD93C6] flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
                      {initials || "DP"}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#883F9B] group-hover:text-[#2A8ED1] transition-colors">
                        {therapist.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-600 mt-0.5">
                        {therapist.role}
                      </p>
                    </div>
                  </div>

                  {/* Especialidad */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A56A2E] block mb-1">
                      Áreas de Especialidad:
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {therapist.specialty}
                    </p>
                  </div>

                  {/* Cita Textual de Enfoque */}
                  <div className="bg-[#F7F7E8] rounded-2xl p-4 border border-[#B2BFEB]/40 relative">
                    <Quote className="w-5 h-5 text-[#A56A2E]/50 absolute top-3 right-3" />
                    <p className="text-xs sm:text-sm italic font-medium text-[#A56A2E] leading-relaxed pr-4">
                      “{therapist.quote}”
                    </p>
                  </div>

                  {/* Servicios que atiende */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      Servicios que acompaña:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {therapist.servicesOffered.map((svcId) => (
                        <span
                          key={svcId}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F7F7E8] text-[#883F9B] border border-[#B2BFEB]/30 capitalize"
                        >
                          {svcId}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botón de Reserva con este Profesional */}
                <div className="pt-6 mt-6 border-t border-[#B2BFEB]/30">
                  <Link
                    href={`/agendar?terapeuta=${therapist.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Agendar con {therapist.name.split(" ")[1]}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. NUESTRA PROMESA ÉTICA */}
      <section className="py-16 bg-white/60 border-t border-[#B2BFEB]/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#F7F7E8] border-2 border-[#B2BFEB]/60 p-8 sm:p-12 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#883F9B] text-white flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#883F9B]">
              Nuestra Promesa: Atención Humana y Libre de Prejuicios
            </h3>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
              En Dulce Paz garantizamos un trato centrado en la persona, sin etiquetas reduccionistas. Creemos en el secreto profesional absoluto, en la transparencia arancelaria y en un acompañamiento cálido que respete tus tiempos y decisiones.
            </p>

            <div className="pt-2">
              <Link
                href="/agendar"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-base shadow-md transition-all"
              >
                <span>Comenzar mi proceso terapéutico</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
