"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  User,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  QrCode,
} from "lucide-react";
import { api } from "@/lib/api";

export default function RegistroEventoPage() {
  // Estado del formulario RSVP
  const [formData, setFormData] = useState({
    companyName: "",
    representativeName: "",
    jobTitle: "",
    phone: "+591 ",
    email: "",
    attendeesCount: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedData, setConfirmedData] = useState<typeof formData | null>(null);
  const [passCode, setPassCode] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "attendeesCount" ? parseInt(value, 10) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = "El nombre de la empresa o institución es obligatorio.";
    }
    if (!formData.representativeName.trim() || formData.representativeName.trim().length < 3) {
      newErrors.representativeName = "Ingresa el nombre del delegado (mínimo 3 caracteres).";
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "El cargo o función institucional es requerido.";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 8) {
      newErrors.phone = "Ingresa un número de WhatsApp corporativo válido (+591...).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un correo corporativo válido.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Envío real al backend (FastAPI / Supabase / Resend)
      const res = await api.submitEventRSVP(formData);
      setPassCode(res.passCode);
      setConfirmedData({ ...formData });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrors({ general: "No se pudo procesar el registro. Intenta nuevamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: "",
      representativeName: "",
      jobTitle: "",
      phone: "+591 ",
      email: "",
      attendeesCount: 1,
    });
    setErrors({});
    setIsSubmitted(false);
    setConfirmedData(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F7E8] py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Cabecera del Evento Institucional */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#883F9B]/10 text-[#883F9B] text-xs font-bold uppercase tracking-wider mb-3">
            <QrCode className="w-4 h-4" />
            Invitación Especial &bull; Código QR 1
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#883F9B] tracking-tight">
            Desayuno de Trabajo Corporativo:
            <span className="block text-gray-900 mt-1">Salud Mental en las Organizaciones</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Un encuentro exclusivo para líderes de talento humano y directivos. Espacio de diálogo estratégico sobre bienestar laboral, prevención del desgaste ocupacional y diagnóstico organizacional ético.
          </p>
        </div>

        {/* Banner de Detalles del Evento */}
        <div className="mb-8 bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#B2BFEB]/40">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 divide-y sm:divide-y-0 sm:divide-x divide-[#B2BFEB]/30 text-sm">
            {/* Fecha */}
            <div className="flex items-start gap-3 sm:pr-4">
              <div className="w-10 h-10 rounded-xl bg-[#883F9B]/10 text-[#883F9B] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                  Fecha Oficial
                </span>
                <span className="font-bold text-gray-900 block">
                  Viernes, 23 de Octubre
                </span>
                <span className="text-xs text-[#A56A2E] font-medium">Gestión 2026</span>
              </div>
            </div>

            {/* Hora */}
            <div className="flex items-start gap-3 pt-4 sm:pt-0 sm:px-4">
              <div className="w-10 h-10 rounded-xl bg-[#2A8ED1]/10 text-[#2A8ED1] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                  Horario
                </span>
                <span className="font-bold text-gray-900 block">
                  10:00 a 12:00
                </span>
                <span className="text-xs text-gray-500">Hora de Bolivia (GMT-4)</span>
              </div>
            </div>

            {/* Lugar */}
            <div className="flex items-start gap-3 pt-4 sm:pt-0 sm:pl-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                  Lugar
                </span>
                <span className="font-bold text-gray-900 block leading-snug">
                  Auditorio Dulce Paz
                </span>
                <span className="text-xs text-gray-500">
                  Calle 15 de Calacoto, Edif. Parque, La Paz
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Estado 1: Formulario Activo */}
        {!isSubmitted ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#B2BFEB]/40">
            <div className="border-b border-[#B2BFEB]/30 pb-4 mb-6">
              <span className="text-xs font-bold text-[#A56A2E] uppercase tracking-wider">
                Confirmación de Asistencia (RSVP)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] mt-1">
                Registra a tu Institución
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Cupo institucional limitado a un máximo de 3 delegados por empresa.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Empresa */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Nombre de la Empresa o Institución Invitada *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Ej. Corporación Andina S.A."
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 ${
                      errors.companyName
                        ? "border-red-400 bg-red-50/20"
                        : "border-[#B2BFEB]/60 focus:border-[#883F9B]"
                    }`}
                  />
                </div>
                {errors.companyName && (
                  <p className="text-xs text-red-600 mt-1">{errors.companyName}</p>
                )}
              </div>

              {/* Nombre del Delegado y Cargo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Nombre del Delegado Principal *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="representativeName"
                      value={formData.representativeName}
                      onChange={handleChange}
                      placeholder="Ej. Lic. Claudia Mendoza"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 ${
                        errors.representativeName
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#B2BFEB]/60 focus:border-[#883F9B]"
                      }`}
                    />
                  </div>
                  {errors.representativeName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.representativeName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Cargo Institucional *
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="Ej. Gerente de RRHH / Talento Humano"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 ${
                        errors.jobTitle
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#B2BFEB]/60 focus:border-[#883F9B]"
                      }`}
                    />
                  </div>
                  {errors.jobTitle && (
                    <p className="text-xs text-red-600 mt-1">{errors.jobTitle}</p>
                  )}
                </div>
              </div>

              {/* WhatsApp y Correo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    WhatsApp Corporativo (para pase digital) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+591 76543210"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 ${
                        errors.phone
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#B2BFEB]/60 focus:border-[#883F9B]"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Correo Electrónico Corporativo *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="cmendoza@empresa.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 ${
                        errors.email
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#B2BFEB]/60 focus:border-[#883F9B]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Número de Asistentes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Número de Asistentes Delegados
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((num) => (
                    <label
                      key={num}
                      className={`cursor-pointer p-3 rounded-xl border-2 text-center transition-all ${
                        formData.attendeesCount === num
                          ? "border-[#2A8ED1] bg-[#2A8ED1]/10 text-[#2A8ED1] font-bold"
                          : "border-[#B2BFEB]/50 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendeesCount"
                        value={num}
                        checked={formData.attendeesCount === num}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="block text-base">{num}</span>
                      <span className="block text-[11px] font-normal text-gray-500">
                        {num === 1 ? "persona" : "personas"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Botón de Envío */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Confirmar Asistencia</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  Al enviar, recibirás de forma automática el pase digital en tu correo y WhatsApp corporativo.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Estado 2: Confirmación Exitosa sin recarga */
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#B2BFEB]/40 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full mb-2">
                Registro Completado
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                ¡Asistencia confirmada!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-lg mx-auto">
                Hemos registrado la participación de su institución. Les esperamos el 23 de octubre.
              </p>
            </div>

            {/* Credencial / Pase Digital */}
            <div className="bg-[#F7F7E8] border border-[#B2BFEB] rounded-3xl p-6 max-w-md mx-auto text-left shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#883F9B]/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between border-b border-[#B2BFEB]/40 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#883F9B] text-white flex items-center justify-center font-bold text-xs">
                    DP
                  </div>
                  <span className="font-bold text-xs text-[#883F9B]">
                    Dulce Paz | Corporativo
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-gray-600 bg-white px-2 py-0.5 rounded border border-[#B2BFEB]/40">
                  {passCode}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">
                    Empresa / Institución
                  </span>
                  <span className="font-bold text-gray-900 text-sm">
                    {confirmedData?.companyName}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-400 block uppercase text-[10px]">
                      Delegado Principal
                    </span>
                    <span className="font-bold text-gray-800">
                      {confirmedData?.representativeName}
                    </span>
                    <span className="text-gray-500 block text-[11px]">
                      {confirmedData?.jobTitle}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase text-[10px]">
                      Cupos Reservados
                    </span>
                    <span className="font-bold text-[#2A8ED1] text-sm">
                      {confirmedData?.attendeesCount}{" "}
                      {confirmedData?.attendeesCount === 1 ? "pase" : "pases"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#B2BFEB]/30 text-[11px] text-gray-600">
                  <p>
                    <strong>Fecha:</strong> 23 de octubre de 2026, 10:00 a 12:00
                  </p>
                  <p>
                    <strong>Lugar:</strong> Edif. Parque, Calle 15 de Calacoto, La Paz
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones posteriores */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#B2BFEB] bg-white text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-all"
              >
                Registrar otra empresa
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white text-sm font-bold transition-all shadow-sm"
              >
                Conocer el Portal Dulce Paz
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
