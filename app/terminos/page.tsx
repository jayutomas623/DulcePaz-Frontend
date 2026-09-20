import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Scale,
} from "lucide-react";

export default function TerminosPage() {
  return (
    <div className="bg-[#F7F7E8] text-[#2D2D2D] min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera del Documento Legal */}
        <div className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#883F9B]/10 border border-[#883F9B]/20 text-[#883F9B] text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-[#A56A2E]" />
            <span>Marco Ético y Legal Institucional</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#883F9B] tracking-tight">
            Términos del Servicio y Consentimiento Clínico Informado
          </h1>

          <p className="text-sm text-gray-600">
            Última actualización y revisión bioética: Septiembre 2026 | Dulce Paz - Psicología y Salud Mental
          </p>
        </div>

        {/* Contenedor Principal del Documento */}
        <div className="rounded-3xl bg-white border border-[#B2BFEB]/60 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          {/* Advertencia Destacada de Emergencias Psiquiátricas */}
          <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-5 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 space-y-1">
              <strong className="block font-bold">
                Aviso Esencial sobre Urgencias y Emergencias Psiquiátricas:
              </strong>
              <p>
                Los servicios de consulta programada de Dulce Paz (tanto presenciales como virtuales) <strong>no constituyen una línea de auxilio en crisis inmediata ni un servicio de emergencia de 24 horas</strong>. En caso de riesgo vital inminente, ideación suicida activa o crisis psiquiátrica aguda, comuníquese de inmediato con las líneas de auxilio locales de Bolivia (Radio Patrulla 110, Ambulancias 118) o acuda al centro hospitalario más cercano.
              </p>
            </div>
          </div>

          {/* Sección 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">1.</span> Marco Regulatorio y Ejercicio Profesional
            </h2>
            <p>
              Los servicios clínicos, psicopedagógicos y organizacionales brindados por el equipo de psicología de <strong>Dulce Paz | Psicología y Salud Mental</strong> se rigen estrictamente bajo la normativa legal de salud del Estado Plurinacional de Bolivia, los lineamientos del Colegio de Psicólogos de Bolivia y los estándares internacionales de bioética en salud mental.
            </p>
            <p>
              Todo el personal profesional cuenta con titulación universitaria legalmente respaldada y registro profesional correspondiente, asegurando intervenciones científicamente fundadas en enfoques Sistémicos y Cognitivo-Conductuales (TCC).
            </p>
          </section>

          {/* Sección 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">2.</span> Consentimiento Informado para la Atención Psicológica
            </h2>
            <p>
              Al agendar una sesión y marcar la casilla de aceptación, la persona consultante (o su madre, padre o tutor legal en caso de menores de edad) manifiesta su conformidad voluntaria para iniciar un proceso psicoterapéutico o psicopedagógico.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-xs sm:text-sm">
              <li>
                <strong>Colaboración activa:</strong> El progreso en psicoterapia requiere de una participación sincera y reflexiva, acordando conjuntamente las metas terapéuticas.
              </li>
              <li>
                <strong>Revocación voluntaria:</strong> El consultante tiene pleno derecho a finalizar o pausar su proceso terapéutico en el momento que estime oportuno, recomendándose una sesión de cierre para una adecuada derivación o consolidación.
              </li>
              <li>
                <strong>Atención a niñas, niños y adolescentes:</strong> La atención a menores de 18 años requiere el consentimiento expreso de sus progenitores o tutores legales, preservando al mismo tiempo el espacio de intimidad y escucha activa del menor.
              </li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">3.</span> Alcance de la Modalidad Virtual (Telepsicología)
            </h2>
            <p>
              Para las sesiones virtuales conducidas a través de plataformas cifradas (Google Meet), la persona consultante se compromete a:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-xs sm:text-sm">
              <li>
                Disponer de un espacio privado, libre de distracciones y con conectividad estable a internet.
              </li>
              <li>
                Estar presente de forma sincrónica con cámara encendida durante la sesión.
              </li>
              <li>
                Queda expresamente prohibida la grabación en audio o video de las sesiones por cualquiera de las partes sin consentimiento previo por escrito.
              </li>
            </ul>
          </section>

          {/* Sección 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">4.</span> Confidencialidad y Secreto Profesional
            </h2>
            <p>
              Toda información vertida durante las sesiones y consignada en la historia clínica goza de la protección irrestricta del secreto profesional psicológico. Sin embargo, conforme a la bioética universal y la legislación vigente, el profesional está obligado a romper la confidencialidad en los siguientes casos extraordinarios de excepción:
            </p>
            <div className="bg-[#F7F7E8] rounded-xl p-4 border border-[#B2BFEB]/40 text-xs sm:text-sm space-y-1.5 text-gray-700">
              <p>• Existencia de riesgo inminente y grave para la integridad física o la vida de la persona consultante o de terceras personas.</p>
              <p>• Sospecha o evidencia comprobada de maltrato, abuso físico o abuso sexual cometido contra niñas, niños, adolescentes o personas adultas en estado de vulnerabilidad o discapacidad.</p>
              <p>• Requerimiento formal emitido por autoridad judicial competente conforme al ordenamiento jurídico boliviano.</p>
            </div>
          </section>

          {/* Sección 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">5.</span> Duración, Puntualidad y Tolerancia de Espera
            </h2>
            <p>
              Cada sesión individual o de pareja tiene una duración estándar de <strong>50 a 60 minutos cronometrados</strong>. Se establece un margen de tolerancia máximo de <strong>15 minutos</strong> a partir de la hora convenida. Pasado dicho tiempo sin comunicación previa del consultante, la sesión se considerará no asistida sin posibilidad de extensión horaria para no perjudicar a las siguientes personas en agenda.
            </p>
          </section>

          {/* Sección 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">6.</span> Política de Cancelación y Reprogramación
            </h2>
            <p>
              Los horarios de consulta son espacios reservados de forma exclusiva. En caso de no poder asistir, se solicita notificar la cancelación o solicitud de reprogramación con un mínimo de <strong>24 horas de antelación</strong> mediante nuestro canal oficial de WhatsApp (+591 76543210) o correo electrónico. Esto permite asignar el cupo a personas en lista de espera prioritaria.
            </p>
          </section>

          {/* Sección 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">7.</span> Consultas y Contacto Legal
            </h2>
            <p>
              Para cualquier inquietud o aclaración respecto a estos términos y consentimientos, puede comunicarse directamente con la Coordinación General de Dulce Paz a través de:
            </p>
            <div className="p-4 rounded-xl bg-[#F7F7E8] border border-[#B2BFEB]/40 text-xs sm:text-sm">
              <p><strong>Correo Oficial:</strong> contacto@dulcepaz.com</p>
              <p><strong>Ubicación:</strong> Calle 15 de Calacoto, Edificio Parque, La Paz, Bolivia</p>
              <p><strong>WhatsApp Institucional:</strong> +591 76543210</p>
            </div>
          </section>

          {/* Enlaces de pie de documento */}
          <div className="pt-6 border-t border-[#B2BFEB]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <Link
              href="/privacidad"
              className="text-[#883F9B] hover:text-[#A56A2E] font-bold flex items-center gap-1"
            >
              <span>Ver Políticas de Privacidad y Tratamiento de Datos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/agendar"
              className="px-5 py-2.5 rounded-xl bg-[#2A8ED1] text-white font-bold hover:bg-[#883F9B] transition-colors"
            >
              Ir al Agendador de Citas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
