import Link from "next/link";
import {
  Lock,
  Database,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function PrivacidadPage() {
  return (
    <div className="bg-[#F7F7E8] text-[#2D2D2D] min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera del Documento Legal */}
        <div className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#883F9B]/10 border border-[#883F9B]/20 text-[#883F9B] text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-[#A56A2E]" />
            <span>Seguridad y Protección de Datos</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#883F9B] tracking-tight">
            Políticas de Privacidad y Tratamiento de Datos
          </h1>

          <p className="text-sm text-gray-600">
            Vigencia: Septiembre 2026 | Dulce Paz - Psicología y Salud Mental (La Paz, Bolivia)
          </p>
        </div>

        {/* Contenedor Principal */}
        <div className="rounded-3xl bg-white border border-[#B2BFEB]/60 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          {/* Introducción y Principios */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">1.</span> Principios de Confidencialidad y Propósito
            </h2>
            <p>
              En <strong>Dulce Paz | Psicología y Salud Mental</strong>, la privacidad y la salvaguarda de la intimidad son pilares inviolables de nuestro ejercicio clínico y humano. La presente Política de Privacidad describe cómo recopilamos, protegemos y gestionamos la información personal que usted nos proporciona al utilizar nuestro portal web y nuestro sistema de agendamiento de citas.
            </p>
            <p>
              Todos los datos recolectados tienen como único y exclusivo fin la adecuada gestión de citas psicoterapéuticas, la comunicación directa de confirmaciones y recordatorios, y la prestación ética de servicios de salud mental.
            </p>
          </section>

          {/* Datos Recopilados */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">2.</span> Información que Recopilamos
            </h2>
            <p>
              A través de nuestros formularios públicos y el asistente interactivo de citas, recolectamos únicamente la información indispensable para el contacto profesional:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-600">
              <li>
                <strong>Datos identificativos y de contacto:</strong> Nombre completo, número de teléfono/WhatsApp y dirección de correo electrónico.
              </li>
              <li>
                <strong>Preferencias del servicio:</strong> Modalidad de atención elegida (Presencial o Virtual), profesional seleccionado, fecha y hora de la cita.
              </li>
              <li>
                <strong>Motivo de consulta general (opcional):</strong> Breve descripción voluntaria proporcionada por el consultante para contextualizar la sesión preliminar.
              </li>
            </ul>
            <p className="text-xs text-gray-500 italic">
              Nota importante: En ningún caso se solicita información bancaria confidencial, contraseñas personales o datos médicos sensibles a través del portal público sin el debido consentimiento en sesión.
            </p>
          </section>

          {/* Compromiso de No Cesión a Terceros */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">3.</span> Compromiso Absoluto de No Cesión a Terceros
            </h2>
            <div className="bg-[#F7F7E8] rounded-2xl p-5 border border-[#B2BFEB]/50 space-y-2">
              <div className="flex items-center gap-2 text-[#883F9B] font-bold text-sm">
                <EyeOff className="w-5 h-5 text-[#A56A2E]" />
                <span>Garantía de Intimidad y Cero Comercialización</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700">
                Dulce Paz asume el compromiso ético y contractual de <strong>no comercializar, vender, ceder, transferir ni divulgar</strong> bajo ningún concepto sus datos personales ni listas de contacto a agencias publicitarias, brokers de datos o terceras empresas con fines comerciales o de lucro.
              </p>
            </div>
          </section>

          {/* Protocolos de Seguridad y Cifrado */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">4.</span> Protocolos Técnicos de Seguridad y Almacenamiento
            </h2>
            <p>
              Implementamos rigurosos estándares técnicos y administrativos en nuestra infraestructura digital para salvaguardar la integridad de su información:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl bg-[#F7F7E8]/70 border border-[#B2BFEB]/40 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-[#883F9B] font-bold text-xs sm:text-sm">
                  <Database className="w-4 h-4 text-[#2A8ED1]" />
                  <span>Base de Datos PostgreSQL Cifrada</span>
                </div>
                <p className="text-xs text-gray-600">
                  Alojamiento en Supabase con políticas estrictas de seguridad por fila (RLS) y cifrado de datos en reposo (AES-256).
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F7E8]/70 border border-[#B2BFEB]/40 p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-[#883F9B] font-bold text-xs sm:text-sm">
                  <Lock className="w-4 h-4 text-[#2A8ED1]" />
                  <span>Cifrado en Tránsito (HTTPS/TLS)</span>
                </div>
                <p className="text-xs text-gray-600">
                  Toda la comunicación web viaja cifrada mediante certificados SSL/TLS modernos gestionados por Cloudflare.
                </p>
              </div>
            </div>
          </section>

          {/* Comunicaciones y Notificaciones */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">5.</span> Notificaciones Automatizadas de Servicio
            </h2>
            <p>
              Al completar una reserva, el sistema genera automáticamente un comprobante de cita que se despacha vía correo electrónico (a través de Resend) y WhatsApp (mediante Meta Cloud API). Además, se programa un único recordatorio preventivo 24 horas antes del horario reservado para evitar inasistencias. Estas comunicaciones son estrictamente de servicio y no contienen publicidad no solicitada.
            </p>
          </section>

          {/* Derechos del Consultante */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] flex items-center gap-2">
              <span className="text-[#A56A2E]">6.</span> Derechos de Acceso, Rectificación y Supresión
            </h2>
            <p>
              Toda persona consultante tiene derecho a solicitar la verificación, actualización, rectificación o eliminación total de sus datos de contacto de nuestros registros administrativos en cualquier momento.
            </p>
            <p>
              Para ejercer cualquiera de estos derechos, basta con remitir una solicitud simple indicando su nombre completo al correo:
            </p>
            <div className="p-4 rounded-xl bg-[#F7F7E8] border border-[#B2BFEB]/40 text-xs sm:text-sm">
              <p className="font-bold text-[#883F9B]">Delegada de Protección de Datos:</p>
              <p>Lic. Nikki Paz — Coordinación General Dulce Paz</p>
              <p><strong>Correo electrónico:</strong> contacto@dulcepaz.com</p>
              <p><strong>Dirección:</strong> Calle 15 de Calacoto, Edificio Parque, La Paz, Bolivia</p>
            </div>
          </section>

          {/* Navegación al final */}
          <div className="pt-6 border-t border-[#B2BFEB]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <Link
              href="/terminos"
              className="text-[#883F9B] hover:text-[#A56A2E] font-bold flex items-center gap-1"
            >
              <span>Ver Términos del Servicio y Consentimiento Clínico</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-[#2A8ED1] text-white font-bold hover:bg-[#883F9B] transition-colors"
            >
              Volver a la Página Principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
