"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FAQS_DATA } from "@/lib/mock-data";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  HelpCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const motivoParam = searchParams.get("motivo");

  // Preselección de motivo basada en parámetro URL
  const initialMotivo =
    motivoParam === "corporativo"
      ? "Convenios corporativos"
      : motivoParam === "talleres"
      ? "Talleres/Eventos"
      : "Consulta general";

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    motivo: initialMotivo,
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
      setErrorMsg("Por favor, completa todos los campos requeridos.");
      return;
    }

    setIsSubmitting(true);

    // Simulación de envío al backend (FastAPI / Resend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        motivo: "Consulta general",
        mensaje: "",
      });
    }, 800);
  };

  return (
    <div className="rounded-3xl bg-white border border-[#B2BFEB]/60 p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#883F9B]">Envíanos un Mensaje</h3>
        <p className="text-sm text-gray-600 mt-1">
          Responderemos tu consulta en un plazo máximo de 24 horas hábiles.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl bg-[#F7F7E8] border border-[#B2BFEB]/60 p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#2A8ED1]/20 text-[#2A8ED1] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-[#883F9B]">
            ¡Mensaje Enviado con Éxito!
          </h4>
          <p className="text-sm text-gray-700 max-w-md mx-auto">
            Hemos recibido tus datos correctamente. Un profesional de nuestro equipo se pondrá en contacto contigo a la brevedad.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2.5 rounded-xl bg-[#2A8ED1] text-white text-xs font-bold hover:bg-[#883F9B] transition-colors"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 text-xs rounded-xl bg-red-50 text-red-700 border border-red-200">
              {errorMsg}
            </div>
          )}

          <div>
            <label
              htmlFor="nombre"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Nombre Completo *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. María Flores"
              className="w-full px-4 py-3 rounded-xl border border-[#B2BFEB] bg-[#F7F7E8]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#883F9B] text-sm text-gray-800 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                className="w-full px-4 py-3 rounded-xl border border-[#B2BFEB] bg-[#F7F7E8]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#883F9B] text-sm text-gray-800 transition"
              />
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Celular / WhatsApp
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+591 76543210"
                className="w-full px-4 py-3 rounded-xl border border-[#B2BFEB] bg-[#F7F7E8]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#883F9B] text-sm text-gray-800 transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="motivo"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Motivo de Consulta
            </label>
            <select
              id="motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#B2BFEB] bg-[#F7F7E8]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#883F9B] text-sm text-gray-800 transition"
            >
              <option value="Consulta general">Consulta general</option>
              <option value="Convenios corporativos">Convenios corporativos / Empresas</option>
              <option value="Talleres/Eventos">Talleres y Espacios de Escucha</option>
              <option value="Terapia Individual o Pareja">Terapia Individual o de Pareja</option>
              <option value="Otro">Otro motivo</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="mensaje"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Mensaje o Consulta Breve *
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              required
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Cuéntanos brevemente cómo podemos apoyarte..."
              className="w-full px-4 py-3 rounded-xl border border-[#B2BFEB] bg-[#F7F7E8]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#883F9B] text-sm text-gray-800 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-sm shadow transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Enviando mensaje...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Consulta</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactoPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F7F7E8] text-[#2D2D2D] min-h-screen">
      {/* 1. ENCABEZADO */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#B2BFEB]/40 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#883F9B]/10 border border-[#883F9B]/20 text-[#883F9B] text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#A56A2E]" />
            <span>Canales de Atención y Geolocalización</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#883F9B] tracking-tight">
            Contacto, Ubicación y Preguntas Frecuentes
          </h1>

          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Estamos a tu disposición para orientarte, responder inquietudes institucionales o coordinar propuestas clínicas y corporativas.
          </p>
        </div>
      </section>

      {/* 2. CANALES DIRECTOS DE ATENCIÓN */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WhatsApp */}
          <div className="rounded-2xl bg-white border border-[#B2BFEB]/60 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#883F9B] text-base">WhatsApp Oficial</h3>
              <p className="text-xs text-gray-600">
                Atención rápida para consultas de agenda y confirmaciones.
              </p>
              <span className="block font-bold text-sm text-gray-800">
                +591 76543210
              </span>
            </div>
            <a
              href="https://wa.me/59176543210"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A8ED1] hover:underline"
            >
              <span>Abrir WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Correo */}
          <div className="rounded-2xl bg-white border border-[#B2BFEB]/60 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#883F9B]/10 text-[#883F9B] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#883F9B] text-base">Correo Institucional</h3>
              <p className="text-xs text-gray-600">
                Para propuestas corporativas, talleres y convenios formales.
              </p>
              <span className="block font-bold text-sm text-gray-800 break-all">
                contacto@dulcepaz.com
              </span>
            </div>
            <a
              href="mailto:contacto@dulcepaz.com"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A8ED1] hover:underline"
            >
              <span>Escribir Correo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Dirección */}
          <div className="rounded-2xl bg-white border border-[#B2BFEB]/60 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#A56A2E]/10 text-[#A56A2E] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#883F9B] text-base">Consultorio Central</h3>
              <p className="text-xs text-gray-600">
                Calle 15 de Calacoto, Edificio Parque, La Paz, Bolivia.
              </p>
              <span className="block text-xs font-medium text-gray-500">
                Zona Sur de La Paz
              </span>
            </div>
            <a
              href="#mapa-ubicacion"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A8ED1] hover:underline"
            >
              <span>Ver en el mapa</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Horarios */}
          <div className="rounded-2xl bg-white border border-[#B2BFEB]/60 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#2A8ED1]/10 text-[#2A8ED1] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#883F9B] text-base">Horarios de Consulta</h3>
              <div className="text-xs space-y-1 text-gray-700">
                <p>
                  <strong>Lun - Vie:</strong> 09:00 a 19:00
                </p>
                <p>
                  <strong>Sábados:</strong> 09:00 a 13:00
                </p>
                <p className="text-gray-500">Domingos sin atención</p>
              </div>
            </div>
            <span className="text-[11px] text-[#A56A2E] font-semibold">
              Hora de Bolivia (GMT-4)
            </span>
          </div>
        </div>
      </section>

      {/* 3. FORMULARIO INTERACTIVO Y MAPA EMBEBIDO */}
      <section id="mapa-ubicacion" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Formulario con estado */}
          <div className="lg:col-span-6">
            <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Cargando formulario...</div>}>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Columna Derecha: Mapa de Google Maps Interactivo */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl bg-white border border-[#B2BFEB]/60 p-6 sm:p-8 shadow-sm space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#883F9B]">Ubicación del Consultorio</h3>
                <p className="text-sm text-gray-600">
                  Calle 15 de Calacoto, Edificio Parque, La Paz, Bolivia.
                </p>
              </div>

              {/* Iframe interactivo de Google Maps */}
              <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-[#B2BFEB]/50 relative shadow-inner bg-[#F7F7E8]">
                <iframe
                  title="Mapa de Ubicación Dulce Paz en Calacoto"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.966030948927!2d-68.0877964!3d-16.5399581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f212a454d6825%3A0x6b77ecb476e3e5bc!2sCalle%2015%20Calacoto%2C%20La%20Paz%2C%20Bolivia!5e0!3m2!1ses!2sbo!4v1710892000000!5m2!1ses!2sbo"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 pt-2">
                <span>¿Vienes en vehículo? Hay disponibilidad de parqueo público contiguo.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQS) */}
      <section className="py-16 bg-white/70 border-t border-[#B2BFEB]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#883F9B]/10 text-[#883F9B] text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Resolución de Dudas Frecuentes</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#883F9B]">
              Preguntas Frecuentes (FAQs)
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Información clara sobre el funcionamiento de las sesiones, cancelaciones y modalidad virtual.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#F7F7E8] border border-[#B2BFEB]/60 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left text-base font-bold text-[#883F9B] hover:text-[#2A8ED1] transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#883F9B]">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-700 leading-relaxed border-t border-[#B2BFEB]/30 bg-white/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
