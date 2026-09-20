import Link from "next/link";
import { SERVICES_DATA } from "@/lib/mock-data";
import {
  User,
  HeartHandshake,
  Users,
  Compass,
  Smile,
  Building2,
  CalendarDays,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Video,
  HelpCircle,
  Clock,
} from "lucide-react";

// Mapeo dinámico de iconos de Lucide
const ICON_MAP: Record<string, React.ElementType> = {
  User,
  HeartHandshake,
  Users,
  Compass,
  Smile,
  Building2,
  CalendarDays,
};

// Detalles clínicos complementarios estructurados para el catálogo exhaustivo
const CLINICAL_DETAILS: Record<
  string,
  {
    clinicalApproach: string;
    modalitiesAvailable: string;
    ctaText: string;
    ctaHref: string;
  }
> = {
  individual: {
    clinicalApproach:
      "Reestructuración cognitiva y herramientas de autorregulación emocional basadas en evidencia empírica (TCC) con perspectiva sistémica integrada.",
    modalitiesAvailable: "Presencial en Calacoto y Virtual vía Google Meet",
    ctaText: "Agendar Psicoterapia Individual",
    ctaHref: "/agendar?servicio=individual",
  },
  pareja: {
    clinicalApproach:
      "Terapia sistémica relacional orientada a destrabar nudos de comunicación, resignificar acuerdos afectivos y mediar en dinámicas interculturales.",
    modalitiesAvailable: "Presencial en Calacoto y Virtual vía Google Meet",
    ctaText: "Agendar Terapia de Pareja",
    ctaHref: "/agendar?servicio=pareja",
  },
  familiar: {
    clinicalApproach:
      "Comprensión y reordenamiento del sistema familiar para transformar dinámicas disfuncionales, jerarquías y límites intergeneracionales.",
    modalitiesAvailable: "Presencial en Calacoto y Virtual vía Google Meet",
    ctaText: "Agendar Terapia Familiar",
    ctaHref: "/agendar?servicio=familiar",
  },
  vocacional: {
    clinicalApproach:
      "Batería sistematizada de pruebas psicométricas validadas, análisis exhaustivo de aptitudes e intereses vocacionales y diseño del proyecto de vida.",
    modalitiesAvailable: "Presencial en Calacoto y Virtual vía Google Meet",
    ctaText: "Agendar Orientación Vocacional",
    ctaHref: "/agendar?servicio=vocacional",
  },
  adolescentes: {
    clinicalApproach:
      "Espacio empático, lúdico y adaptativo que articula el acompañamiento confidencial con el adolescente y la orientación psicoeducativa a madres y padres.",
    modalitiesAvailable: "Presencial en Calacoto y Virtual vía Google Meet",
    ctaText: "Agendar Terapia Adolescentes",
    ctaHref: "/agendar?servicio=adolescentes",
  },
  organizacional: {
    clinicalApproach:
      "Consultoría estratégica en salud ocupacional, diagnóstico de clima laboral, prevención del desgaste profesional (burnout) y talleres éticos.",
    modalitiesAvailable: "Presencial in-company o Remoto para organizaciones",
    ctaText: "Solicitar Propuesta Corporativa",
    ctaHref: "/contacto?motivo=corporativo",
  },
  talleres: {
    clinicalApproach:
      "Encuentros interactivos grupales y Espacios de Escucha comunitarios orientados a la psicoeducación, gestión del estrés y autonomía relacional.",
    modalitiesAvailable: "Presencial en Auditorio Dulce Paz y Salas Híbridas",
    ctaText: "Ver Próximos Talleres",
    ctaHref: "/registro-evento",
  },
};

export default function ServiciosPage() {
  return (
    <div className="bg-[#F7F7E8] text-[#2D2D2D] min-h-screen">
      {/* 1. ENCABEZADO INSTITUCIONAL */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#B2BFEB]/40 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#883F9B]/10 border border-[#883F9B]/20 text-[#883F9B] text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#A56A2E]" />
            <span>Atención Multidisciplinaria e Inclusiva</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#883F9B] tracking-tight">
            Catálogo Oficial de Servicios Psicológicos
          </h1>

          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Abordamos el malestar y el crecimiento personal desde una perspectiva integradora, ética y basada en la evidencia científica. Cada servicio es brindado por profesionales especializados en un entorno cálido, libre de prejuicios y bajo estricto secreto profesional.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs sm:text-sm text-gray-600 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2A8ED1]" />
              Sesiones de 50 a 60 minutos
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2A8ED1]" />
              Modalidad Dual: Presencial y Virtual
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2A8ED1]" />
              Atención Bilingüe (Español / Inglés)
            </span>
          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO DETALLADO DE LOS 7 SERVICIOS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 gap-10">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Sparkles;
            const extraInfo = CLINICAL_DETAILS[service.id] || {
              clinicalApproach: "Metodologías estructuradas basadas en evidencia científica.",
              modalitiesAvailable: "Presencial y Virtual",
              ctaText: "Agendar Servicio",
              ctaHref: `/agendar?servicio=${service.id}`,
            };

            return (
              <div
                key={service.id}
                id={service.id}
                className="rounded-3xl bg-white border border-[#B2BFEB]/50 p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Columna Izquierda: Identificador & Descripción Principal */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#BD93C6]/20 text-[#883F9B] flex items-center justify-center shrink-0">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#A56A2E] uppercase tracking-wider">
                          Especialidad #{index + 1}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#883F9B]">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base text-gray-700 leading-relaxed font-medium">
                      {service.shortDesc}
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.fullDesc}
                    </p>

                    {/* Problemáticas tratadas */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                        Problemáticas abordadas frecuentemente:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {service.focus.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#F7F7E8] text-[#883F9B] border border-[#B2BFEB]/40"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A56A2E]" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha: Enfoque Clínico, Público y CTA */}
                  <div className="lg:col-span-5 bg-[#F7F7E8]/70 rounded-2xl p-6 border border-[#B2BFEB]/50 space-y-4 flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      {/* Público objetivo */}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#A56A2E] block mb-1">
                          Público al que va dirigido
                        </span>
                        <p className="text-sm font-semibold text-gray-800">
                          {service.targetAudience}
                        </p>
                      </div>

                      {/* Enfoque Clínico */}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#A56A2E] block mb-1">
                          Enfoque Clínico
                        </span>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {extraInfo.clinicalApproach}
                        </p>
                      </div>

                      {/* Modalidad */}
                      <div className="pt-2 border-t border-[#B2BFEB]/30 flex items-center gap-2 text-xs text-gray-700">
                        <Clock className="w-4 h-4 text-[#883F9B] shrink-0" />
                        <span>{extraInfo.modalitiesAvailable}</span>
                      </div>
                    </div>

                    {/* Botón de Reserva Directo */}
                    <div className="pt-4">
                      <Link
                        href={extraInfo.ctaHref}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all"
                      >
                        <span>{extraInfo.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECCIÓN COMPARATIVA DE MODALIDADES (Presencial vs. Virtual) */}
      <section className="py-16 bg-white/70 border-t border-[#B2BFEB]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#A56A2E] uppercase">
              Formatos de Atención
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#883F9B]">
              Modalidad Presencial vs. Sesión Virtual
            </h2>
            <p className="text-base text-gray-600">
              Ambas modalidades mantienen los mismos estándares de confidencialidad, rigor bioético y efectividad terapéutica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Modalidad Presencial */}
            <div className="rounded-3xl bg-[#F7F7E8] border-2 border-[#B2BFEB]/60 p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#883F9B] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#883F9B]">
                      Sesión Presencial (Calacoto)
                    </h3>
                    <p className="text-xs text-gray-500">
                      Calle 15 de Calacoto, Edificio Parque, La Paz
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2A8ED1] shrink-0 mt-0.5" />
                    <span>
                      <strong>Ambiente Clínico Acondicionado:</strong> Consultorio privado diseñado para garantizar comodidad, silencio e intimidad total.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2A8ED1] shrink-0 mt-0.5" />
                    <span>
                      <strong>Evaluación Psicométrica Directa:</strong> Aplicación de pruebas diagnósticas y baterías vocacionales con materiales físicos.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2A8ED1] shrink-0 mt-0.5" />
                    <span>
                      <strong>Conexión Humana Presencial:</strong> Recomendada para terapia con adolescentes, dinámicas de juego o crisis familiares complejas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2A8ED1] shrink-0 mt-0.5" />
                    <span>
                      <strong>Ubicación Accesible:</strong> Fácil acceso en la zona sur de La Paz con parqueos y transporte público cercano.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-[#B2BFEB]/30">
                <Link
                  href="/agendar?modalidad=presencial"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#883F9B] hover:bg-[#2A8ED1] text-white font-bold text-sm transition-colors"
                >
                  <span>Elegir Atención Presencial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Modalidad Virtual */}
            <div className="rounded-3xl bg-[#F7F7E8] border-2 border-[#B2BFEB]/60 p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#2A8ED1] text-white flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#883F9B]">
                      Sesión Virtual (Google Meet)
                    </h3>
                    <p className="text-xs text-gray-500">
                      Atención bilingüe para Bolivia y cualquier parte del mundo
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2A8ED1] shrink-0 mt-0.5" />
                    <span>
                      <strong>Conexión Cifrada y Segura:</strong> Enlaces directos a Google Meet generados de forma automática y compartidos a tu correo y WhatsApp.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2A8ED1] shrink-0 mt-0.5" />
                    <span>
                      <strong>Sin Tiempos de Traslado:</strong> Asiste a tu sesión desde la comodidad y privacidad de tu hogar o lugar de trabajo.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2A8ED1] shrink-0 mt-0.5" />
                    <span>
                      <strong>Terapia Bilingüe Internacional:</strong> Ideal para parejas a distancia, familias migrantes y personas que residen fuera del país.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2A8ED1] shrink-0 mt-0.5" />
                    <span>
                      <strong>Horarios Adaptables:</strong> Sincronización transparente con la zona horaria de Bolivia (GMT-4).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-[#B2BFEB]/30">
                <Link
                  href="/agendar?modalidad=virtual"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-sm transition-colors"
                >
                  <span>Elegir Atención Virtual</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BLOQUE DE ORIENTACIÓN PARA INDECISOS */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center space-y-5">
        <div className="w-12 h-12 rounded-full bg-[#BD93C6]/20 text-[#883F9B] flex items-center justify-center mx-auto">
          <HelpCircle className="w-6 h-6" />
        </div>

        <h3 className="text-2xl font-bold text-[#883F9B]">
          ¿Tienes dudas sobre qué servicio es el más adecuado para ti?
        </h3>

        <p className="text-sm sm:text-base text-gray-700 max-w-xl mx-auto leading-relaxed">
          No te preocupes. Puedes escribirnos una consulta breve o contactarnos directamente por WhatsApp. Nuestro equipo te orientará con calidez hacia el espacio profesional idóneo.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-sm shadow transition-colors"
          >
            <span>Consultar con el equipo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/59176543210?text=Hola%2C%20quisiera%20orientaci%C3%B3n%20sobre%20qu%C3%A9%20servicio%20psicol%C3%B3gico%20elegir"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#B2BFEB] bg-white text-[#883F9B] hover:bg-[#F7F7E8] font-bold text-sm transition-colors"
          >
            <span>Escribir por WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
