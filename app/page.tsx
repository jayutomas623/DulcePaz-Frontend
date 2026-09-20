import Link from "next/link";
import {
  SERVICES_DATA,
} from "@/lib/mock-data";
import {
  User,
  HeartHandshake,
  Users,
  Compass,
  Smile,
  Building2,
  CalendarDays,
  ShieldCheck,
  Globe2,
  Award,
  ArrowRight,
  Sparkles,
  Heart,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react";

// Mapeo dinámico y tipado de iconos de Lucide
const ICON_MAP: Record<string, React.ElementType> = {
  User,
  HeartHandshake,
  Users,
  Compass,
  Smile,
  Building2,
  CalendarDays,
};

export default function HomePage() {
  return (
    <div className="bg-[#F7F7E8] text-[#2D2D2D]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#B2BFEB]/40">
        {/* Elementos decorativos sutiles de fondo */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#BD93C6]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#B2BFEB]/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Contenido Principal */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#883F9B]/10 border border-[#883F9B]/20 text-[#883F9B] text-xs sm:text-sm font-semibold tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-[#A56A2E]" />
                <span>Centro de Acompañamiento Integral</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#883F9B] tracking-tight leading-[1.15]">
                Tu bienestar,{" "}
                <span className="text-[#A56A2E] underline decoration-[#BD93C6]/60 decoration-wavy decoration-2 underline-offset-8">
                  nuestro compromiso.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Atención psicológica accesible, humana y basada en evidencia en el corazón de La Paz. En Dulce Paz creemos en una psicología que integra la mente, las emociones y el entorno relacional para reencontrar tu equilibrio con calidez y rigor científico.
              </p>

              {/* Botones CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/agendar"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>Agendar mi cita</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/servicios"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-[#883F9B] text-[#883F9B] hover:bg-[#883F9B] hover:text-white font-bold text-base transition-all"
                >
                  <span>Conoce nuestros servicios</span>
                </Link>
              </div>

              {/* Aval ético en texto discreto */}
              <div className="pt-3 flex items-center justify-center lg:justify-start gap-6 text-xs text-gray-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2A8ED1]" />
                  Espacio 100% confidencial
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2A8ED1]" />
                  Secreto profesional ético
                </span>
              </div>
            </div>

            {/* Composición Visual Cálida y Desestigmatizante */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-[#B2BFEB]/50 p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#B2BFEB]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#883F9B] flex items-center justify-center text-white font-bold text-xl shadow-inner">
                        DP
                      </div>
                      <div>
                        <h3 className="font-bold text-[#883F9B] text-base">Dulce Paz</h3>
                        <p className="text-xs text-gray-500">Consultorio Calacoto & Online</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#BD93C6]/20 text-[#883F9B]">
                      Atención Activa
                    </span>
                  </div>

                  {/* Cita empática del Hero */}
                  <div className="bg-[#F7F7E8] rounded-2xl p-5 border border-[#B2BFEB]/40">
                    <Heart className="w-6 h-6 text-[#A56A2E] mb-2" />
                    <p className="text-sm italic text-gray-800 leading-relaxed font-medium">
                      “Un espacio seguro, confidencial y libre de prejuicios donde pedir ayuda se convierte en un acto valiente y natural.”
                    </p>
                    <span className="block mt-2 text-xs font-semibold text-[#A56A2E]">
                      — La comunidad terapéutica de Dulce Paz
                    </span>
                  </div>

                  {/* Mini métricas / pilares visuales */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-white rounded-xl p-3.5 border border-[#B2BFEB]/30 shadow-sm text-center">
                      <span className="block text-2xl font-extrabold text-[#883F9B]">100%</span>
                      <span className="text-xs text-gray-600 font-medium">Basado en Evidencia</span>
                    </div>
                    <div className="bg-white rounded-xl p-3.5 border border-[#B2BFEB]/30 shadow-sm text-center">
                      <span className="block text-2xl font-extrabold text-[#2A8ED1]">Dual</span>
                      <span className="text-xs text-gray-600 font-medium">Presencial y Virtual</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3 text-xs text-gray-600 bg-white/70 p-3 rounded-xl border border-[#B2BFEB]/20">
                    <MapPin className="w-4 h-4 text-[#883F9B] shrink-0" />
                    <span>Calle 15 de Calacoto, Edif. Parque, La Paz, Bolivia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANNER DE CONFIANZA (3 Insignias) */}
      <section className="py-12 bg-white/60 border-b border-[#B2BFEB]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Insignia 1 */}
            <div className="bg-[#F7F7E8] rounded-2xl p-6 border border-[#B2BFEB]/60 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#BD93C6]/25 flex items-center justify-center text-[#883F9B] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#883F9B] mb-1">
                  Atención Presencial y Virtual
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Consultorio habilitado en Calacoto y sesiones online cifradas para Bolivia y el exterior.
                </p>
              </div>
            </div>

            {/* Insignia 2 */}
            <div className="bg-[#F7F7E8] rounded-2xl p-6 border border-[#B2BFEB]/60 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#BD93C6]/25 flex items-center justify-center text-[#883F9B] shrink-0">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#883F9B] mb-1">
                  Terapia en Español e Inglés
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Procesos psicoterapéuticos bilingües fluidos para parejas y familias en contextos multiculturales.
                </p>
              </div>
            </div>

            {/* Insignia 3 */}
            <div className="bg-[#F7F7E8] rounded-2xl p-6 border border-[#B2BFEB]/60 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#BD93C6]/25 flex items-center justify-center text-[#883F9B] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#883F9B] mb-1">
                  Enfoque Basado en Evidencia
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Metodologías cognitivo-conductuales (TCC) y sistémicas validadas científicamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CUADRÍCULA DE SERVICIOS RESUMIDOS (7 especialidades) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#A56A2E] uppercase">
            Nuestras Especialidades
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#883F9B]">
            ¿En qué podemos acompañarte hoy?
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Abordajes personalizados para cada etapa vital, brindados por el equipo de psicología con absoluto respeto y rigor ético.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Sparkles;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-[#B2BFEB]/50 shadow-sm hover:shadow-xl hover:border-[#883F9B]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Encabezado de la tarjeta */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#BD93C6]/20 group-hover:bg-[#883F9B] text-[#883F9B] group-hover:text-white flex items-center justify-center transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F7F7E8] text-[#A56A2E] border border-[#B2BFEB]/40">
                      {service.targetAudience.split(" ")[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#883F9B] group-hover:text-[#2A8ED1] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Focos / Temáticas destacadas */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.focus.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F7F7E8] text-gray-700 border border-[#B2BFEB]/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botón de acción directo */}
                <div className="pt-6 mt-6 border-t border-[#B2BFEB]/30">
                  <Link
                    href={`/agendar?servicio=${service.id}`}
                    className="inline-flex items-center justify-between w-full text-sm font-bold text-[#2A8ED1] hover:text-[#883F9B] transition-colors group/btn"
                  >
                    <span>Agendar este servicio</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#883F9B] hover:text-[#A56A2E] underline underline-offset-4"
          >
            <span>Ver catálogo detallado de los 7 servicios y modalidades</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. SECCIÓN ESPECIAL: PAREJAS INTERCULTURALES Y FAMILIAS MIGRANTES */}
      <section className="py-16 bg-white/70 border-y border-[#B2BFEB]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#F7F7E8] border-2 border-[#B2BFEB]/60 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-md">
            {/* Decoración geométrica */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#A56A2E]/10 blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#A56A2E] bg-white px-3 py-1 rounded-md border border-[#B2BFEB]/40">
                  Acompañamiento Especializado
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#883F9B] leading-tight">
                  Parejas Interculturales y Familias Migrantes
                </h2>

                <p className="text-base text-gray-700 leading-relaxed">
                  Vivir en un contexto bicultural o experimentar el duelo migratorio implica retos únicos de comunicación, adaptación y pertenencia. En Dulce Paz brindamos un modelo de mediación sistémica sensible a los choques culturales, diferencias lingüísticas y reorganización de proyectos de vida, tanto para residentes en Bolivia como para familias en el exterior.
                </p>

                {/* Cita institucional en color camel */}
                <blockquote className="border-l-4 border-[#A56A2E] pl-4 py-1 italic text-[#A56A2E] font-semibold text-lg sm:text-xl">
                  “Comprendernos mejor también es parte del proceso de sentirnos mejor.”
                </blockquote>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/agendar?servicio=pareja"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-sm shadow transition-all"
                  >
                    <span>Agendar Terapia de Pareja</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/nosotros"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#883F9B] text-[#883F9B] hover:bg-[#883F9B]/10 font-bold text-sm transition-all"
                  >
                    <span>Conoce a nuestras terapeutas bilingües</span>
                  </Link>
                </div>
              </div>

              {/* Ficha lateral con atributos de valor */}
              <div className="lg:col-span-4 space-y-3">
                <div className="bg-white rounded-2xl p-5 border border-[#B2BFEB]/40 shadow-sm">
                  <h4 className="font-bold text-[#883F9B] text-sm mb-1">Sesiones 100% Bilingües</h4>
                  <p className="text-xs text-gray-600">
                    Procesos conducidos indistintamente en español o inglés con fluidez nativa.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#B2BFEB]/40 shadow-sm">
                  <h4 className="font-bold text-[#883F9B] text-sm mb-1">Duelo y Adaptación Cultural</h4>
                  <p className="text-xs text-gray-600">
                    Contención en la reconstrucción de redes afectivas y tramitación del desarraigo.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#B2BFEB]/40 shadow-sm">
                  <h4 className="font-bold text-[#883F9B] text-sm mb-1">Flexibilidad Horaria Internacional</h4>
                  <p className="text-xs text-gray-600">
                    Sincronización remota segura vía Google Meet adaptada a zonas horarias globales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRÓXIMO EVENTO (Espacio de Escucha / Talleres) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#883F9B] to-[#712E83] text-white p-8 sm:p-12 lg:p-14 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-[#F7F7E8] text-xs font-semibold uppercase tracking-wider">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Próximo Espacio de Escucha Comunitario</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                «No eres mi mundo, sino parte de él»
              </h2>

              <p className="text-[#F7F7E8]/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                Un encuentro grupal cálido y reflexivo para dialogar sobre la dependencia emocional, la autonomía afectiva y las formas de construir vínculos sanos sin perder nuestra propia individualidad.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-[#F7F7E8]/85">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#BD93C6]" />
                  26 de septiembre de 2026
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#BD93C6]" />
                  18:30 - 20:30 (GMT-4)
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#BD93C6]" />
                  Auditorio Dulce Paz, Calacoto
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center w-full max-w-xs space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#BD93C6] block">
                  Cupos Limitados
                </span>
                <p className="text-xs text-[#F7F7E8]/80">
                  Actividad arancelada accesible. Reserva previa obligatoria para el material de trabajo.
                </p>
                <Link
                  href="/registro-evento"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#2A8ED1] hover:bg-white hover:text-[#883F9B] text-white font-bold text-sm shadow transition-all"
                >
                  <span>Registrarme al evento</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANNER FINAL "¿LISTO PARA EMPEZAR?" */}
      <section className="py-16 bg-[#F7F7E8] border-t border-[#B2BFEB]/40">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#A56A2E] uppercase">
            Inicia tu camino
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#883F9B] tracking-tight">
            ¿Listo para empezar?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Da inicio a un proceso de autoconocimiento y bienestar junto a nuestro equipo de especialistas. Da el primer paso hacia una vida con mayor serenidad y comprensión.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/agendar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Agenda tu primera sesión</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-[#B2BFEB] text-[#883F9B] bg-white hover:bg-[#F7F7E8] font-bold text-base transition-all"
            >
              <span>Contáctanos si tienes preguntas</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
