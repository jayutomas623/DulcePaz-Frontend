"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Video,
  Ban,
  CheckCircle2,
  MessageSquare,
  Lock,
  ExternalLink,
  LogOut,
  Users,
  CalendarCheck,
  Trash2,
} from "lucide-react";
import { THERAPISTS_DATA } from "@/lib/mock-data";

// Tipos para citas de la agenda clínica
interface Appointment {
  id: string;
  therapistId: string;
  time: string;
  clientName: string;
  clientPhone: string;
  modality: "presencial" | "virtual";
  serviceName: string;
  consultationReason: string;
  status: "Confirmada" | "Completada" | "Cancelada por Paciente" | "No asistió";
  meetUrl?: string;
}

interface BlockedSlot {
  id: string;
  therapistId: string;
  time: string;
  date: string;
  reason: string;
}

// Citas iniciales mockeadas para cada terapeuta
const INITIAL_APPOINTMENTS: Appointment[] = [
  // Nikki Paz
  {
    id: "apt-1",
    therapistId: "nikki-paz",
    time: "09:00",
    clientName: "Sofía Montenegro",
    clientPhone: "+591 76543210",
    modality: "presencial",
    serviceName: "Psicoterapia Individual",
    consultationReason: "Regulación de ansiedad cotidiana y duelo afectivo reciente.",
    status: "Confirmada",
  },
  {
    id: "apt-2",
    therapistId: "nikki-paz",
    time: "10:30",
    clientName: "Carlos Arguedas & Elena Rossi",
    clientPhone: "+591 71234567",
    modality: "virtual",
    serviceName: "Terapia de Pareja",
    consultationReason: "Mediación de comunicación y diferencias por adaptación bicultural.",
    status: "Confirmada",
    meetUrl: "https://meet.google.com/dpz-nikki-sesion",
  },
  {
    id: "apt-3",
    therapistId: "nikki-paz",
    time: "16:00",
    clientName: "Familia Morales Rocha",
    clientPhone: "+591 78901234",
    modality: "presencial",
    serviceName: "Terapia Familiar",
    consultationReason: "Límites saludables y dinámicas de ciclo vital familiar.",
    status: "Confirmada",
  },
  // Keila Vilar
  {
    id: "apt-4",
    therapistId: "keila-vilar",
    time: "09:00",
    clientName: "Matías Calderón (15 años)",
    clientPhone: "+591 77654321",
    modality: "presencial",
    serviceName: "Terapia para Adolescentes (13+)",
    consultationReason: "Presión escolar, autoestima y gestión de emociones en pubertad.",
    status: "Confirmada",
  },
  {
    id: "apt-5",
    therapistId: "keila-vilar",
    time: "14:30",
    clientName: "Camila Vacaflor",
    clientPhone: "+591 76112233",
    modality: "virtual",
    serviceName: "Orientación Vocacional",
    consultationReason: "Batería de tests vocacionales y proyecto de vida profesional.",
    status: "Confirmada",
    meetUrl: "https://meet.google.com/dpz-keila-vocacional",
  },
  // William Mendoza
  {
    id: "apt-6",
    therapistId: "william-mendoza",
    time: "10:30",
    clientName: "Gerencia de Personas - Banco Sol",
    clientPhone: "+591 75998877",
    modality: "virtual",
    serviceName: "Psicología Organizacional",
    consultationReason: "Diagnóstico preliminar de clima laboral y prevención de burnout.",
    status: "Confirmada",
    meetUrl: "https://meet.google.com/dpz-william-corporativo",
  },
  {
    id: "apt-7",
    therapistId: "william-mendoza",
    time: "16:00",
    clientName: "Consultoría de Talento - SOBOCE",
    clientPhone: "+591 72334455",
    modality: "presencial",
    serviceName: "Psicología Organizacional",
    consultationReason: "Coordinación de talleres preventivos para octubre.",
    status: "Confirmada",
  },
];

function AgendaContent() {
  const searchParams = useSearchParams();

  // Leer terapeuta de la URL si se suministra (?therapist=...)
  const tParam = searchParams.get("therapist");
  const defaultTherapist =
    tParam && THERAPISTS_DATA.some((t) => t.id === tParam)
      ? tParam
      : "nikki-paz";

  // Terapeuta activo en la sesión simulada
  const [selectedTherapistState, setSelectedTherapistState] = useState<string | null>(null);
  const activeTherapistId = selectedTherapistState ?? defaultTherapist;

  // Fecha seleccionada
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });

  // Lista de citas y franjas bloqueadas en memoria
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([
    {
      id: "block-1",
      therapistId: "nikki-paz",
      time: "14:30",
      date: new Date().toISOString().split("T")[0],
      reason: "Supervisión Clínica y Reunión Institucional",
    },
  ]);

  // Modal para bloquear franja horaria
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [slotToBlock, setSlotToBlock] = useState("12:00");
  const [blockReason, setBlockReason] = useState("Reunión institucional / Supervisión");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Terapeuta actual
  const currentTherapist = useMemo(() => {
    return (
      THERAPISTS_DATA.find((t) => t.id === activeTherapistId) ||
      THERAPISTS_DATA[0]
    );
  }, [activeTherapistId]);

  // Citas del terapeuta activo
  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => a.therapistId === activeTherapistId);
  }, [appointments, activeTherapistId]);

  // Franjas bloqueadas del terapeuta activo
  const filteredBlockedSlots = useMemo(() => {
    return blockedSlots.filter(
      (b) => b.therapistId === activeTherapistId && b.date === selectedDate
    );
  }, [blockedSlots, activeTherapistId, selectedDate]);

  // Cambiar estado de una cita
  const handleUpdateStatus = (
    aptId: string,
    newStatus: Appointment["status"]
  ) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === aptId ? { ...apt, status: newStatus } : apt))
    );
  };

  // Guardar bloqueo de horario
  const handleConfirmBlock = (e: React.FormEvent) => {
    e.preventDefault();

    const newBlock: BlockedSlot = {
      id: `block-${Date.now()}`,
      therapistId: activeTherapistId,
      time: slotToBlock,
      date: selectedDate,
      reason: blockReason,
    };

    setBlockedSlots((prev) => [...prev, newBlock]);
    setIsBlockModalOpen(false);
    setFeedbackMessage(
      `Franja de las ${slotToBlock} bloqueada exitosamente. El horario ya no estará disponible en el agendador público.`
    );

    setTimeout(() => {
      setFeedbackMessage(null);
    }, 5000);
  };

  // Desbloquear horario
  const handleRemoveBlock = (blockId: string) => {
    setBlockedSlots((prev) => prev.filter((b) => b.id !== blockId));
  };

  return (
    <div className="min-h-screen bg-[#F7F7E8] pb-16">
      {/* Barra Superior PWA del Profesional */}
      <div className="bg-[#883F9B] text-white py-4 px-4 sm:px-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white text-[#883F9B] font-bold flex items-center justify-center text-lg shadow-sm">
              DP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg">
                  {currentTherapist.name}
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                  Sesión Activa
                </span>
              </div>
              <p className="text-xs text-[#F7F7E8]/80">{currentTherapist.role}</p>
            </div>
          </div>

          {/* Selector de Terapeuta (Simulación rápida de sesión activa) */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20 text-xs">
            <span className="text-white/70 pl-2 font-medium hidden sm:inline">
              Cambiar terapeuta:
            </span>
            {THERAPISTS_DATA.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTherapistState(t.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeTherapistId === t.id
                    ? "bg-white text-[#883F9B] shadow-sm"
                    : "text-white/80 hover:bg-white/15"
                }`}
              >
                {t.name.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subbarra de navegación interna PWA */}
      <div className="bg-white border-b border-[#B2BFEB]/40 py-2.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#883F9B] border-b-2 border-[#883F9B] pb-1 flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4" />
              Agenda del Día
            </span>
            <Link
              href="/admin/coordinacion"
              className="text-gray-600 hover:text-[#883F9B] flex items-center gap-1.5 transition-colors"
            >
              <Users className="w-4 h-4" />
              Vista Coordinación Maestro
            </Link>
          </div>

          <Link
            href="/admin/login"
            className="text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar Sesión
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Mensaje de feedback tras bloqueo */}
        {feedbackMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-900 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{feedbackMessage}</span>
            </div>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Panel de Controles: Fecha y Botón de Bloqueo */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#B2BFEB]/40 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#883F9B]/10 text-[#883F9B] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Fecha de la Agenda
              </span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-sm sm:text-base font-bold text-gray-900 bg-transparent border-b border-[#B2BFEB] pb-0.5 focus:outline-none focus:border-[#883F9B]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Botón Bloquear Franja */}
            <button
              type="button"
              onClick={() => setIsBlockModalOpen(true)}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#A56A2E] hover:bg-[#8e5a26] text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              <Ban className="w-4 h-4" />
              Bloquear Franja Horaria
            </button>

            <Link
              href="/agendar"
              target="_blank"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#B2BFEB] bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold transition-all"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
              Ver Agendador Público
            </Link>
          </div>
        </div>

        {/* Resumen de Métricas Rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-[#B2BFEB]/40">
            <span className="text-xs text-gray-500 block">Total Citas Hoy</span>
            <span className="text-xl sm:text-2xl font-bold text-[#883F9B]">
              {filteredAppointments.length}
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#B2BFEB]/40">
            <span className="text-xs text-gray-500 block">Presenciales</span>
            <span className="text-xl sm:text-2xl font-bold text-[#2A8ED1]">
              {
                filteredAppointments.filter((a) => a.modality === "presencial")
                  .length
              }
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#B2BFEB]/40">
            <span className="text-xs text-gray-500 block">Virtuales (Meet)</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-600">
              {filteredAppointments.filter((a) => a.modality === "virtual").length}
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#B2BFEB]/40">
            <span className="text-xs text-gray-500 block">Franjas Bloqueadas</span>
            <span className="text-xl sm:text-2xl font-bold text-[#A56A2E]">
              {filteredBlockedSlots.length}
            </span>
          </div>
        </div>

        {/* Franjas Bloqueadas Activas */}
        {filteredBlockedSlots.length > 0 && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-3xl p-5">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              Horarios Bloqueados para esta fecha (No disponibles en web):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredBlockedSlots.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-3 rounded-xl border border-amber-300 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-gray-900 block">
                      ⏰ Franja: {b.time}
                    </span>
                    <span className="text-gray-600">{b.reason}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlock(b.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Desbloquear horario"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lista de Citas de la Agenda */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-gray-900">
              Pacientes y Sesiones Programadas
            </h2>
            <span className="text-xs text-gray-500">
              {filteredAppointments.length} consultas registradas
            </span>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#B2BFEB]/40">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-base font-bold text-gray-700">
                No hay citas programadas para este terapeuta en la fecha.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Los nuevos agendamientos desde la web aparecerán automáticamente aquí.
              </p>
            </div>
          ) : (
            filteredAppointments.map((apt) => {
              const statusColors = {
                Confirmada: "bg-emerald-50 text-emerald-700 border-emerald-200",
                Completada: "bg-blue-50 text-blue-700 border-blue-200",
                "Cancelada por Paciente": "bg-red-50 text-red-700 border-red-200",
                "No asistió": "bg-gray-100 text-gray-600 border-gray-200",
              };

              const cleanPhone = apt.clientPhone.replace(/\D/g, "");

              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#B2BFEB]/40 transition-all hover:border-[#883F9B]/40"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#B2BFEB]/30 pb-4">
                    {/* Hora y Paciente */}
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-14 rounded-2xl bg-[#883F9B]/10 border border-[#883F9B]/20 text-[#883F9B] flex flex-col items-center justify-center shrink-0">
                        <span className="text-sm font-extrabold">{apt.time}</span>
                        <span className="text-[10px] uppercase font-semibold">50 min</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                            {apt.clientName}
                          </h3>
                        </div>
                        <p className="text-xs font-semibold text-[#883F9B]">
                          {apt.serviceName}
                        </p>
                      </div>
                    </div>

                    {/* Estado de la Cita */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                        Estado:
                      </span>
                      <select
                        value={apt.status}
                        onChange={(e) =>
                          handleUpdateStatus(
                            apt.id,
                            e.target.value as Appointment["status"]
                          )
                        }
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                          statusColors[apt.status]
                        }`}
                      >
                        <option value="Confirmada">Confirmada</option>
                        <option value="Completada">Completada</option>
                        <option value="Cancelada por Paciente">
                          Cancelada por Paciente
                        </option>
                        <option value="No asistió">No asistió</option>
                      </select>
                    </div>
                  </div>

                  {/* Detalles del Paciente y Acciones */}
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    {/* Motivo de Consulta */}
                    <div className="md:col-span-6 space-y-1">
                      <span className="text-gray-400 font-bold uppercase text-[10px] block">
                        Motivo Clínico de Consulta
                      </span>
                      <p className="text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100 italic">
                        &ldquo;{apt.consultationReason}&rdquo;
                      </p>
                    </div>

                    {/* Modalidad y Ubicación */}
                    <div className="md:col-span-3 space-y-1">
                      <span className="text-gray-400 font-bold uppercase text-[10px] block">
                        Modalidad
                      </span>
                      {apt.modality === "presencial" ? (
                        <div className="flex items-center gap-1.5 text-gray-800 font-medium">
                          <MapPin className="w-4 h-4 text-[#2A8ED1]" />
                          <span>Consultorio Calacoto (P2)</span>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                            <Video className="w-4 h-4 text-emerald-600" />
                            <span>Virtual (Google Meet)</span>
                          </div>
                          {apt.meetUrl && (
                            <a
                              href={apt.meetUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs"
                            >
                              <span>Entrar a Meet</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Acceso Directo WhatsApp del Paciente */}
                    <div className="md:col-span-3 flex flex-col justify-end">
                      <span className="text-gray-400 font-bold uppercase text-[10px] block mb-1">
                        Contacto Directo
                      </span>
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          `Hola ${apt.clientName}, te escribo de Dulce Paz para coordinar los detalles de nuestra sesión de ${apt.serviceName}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white px-3 py-2 rounded-xl font-bold transition-all border border-[#25D366]/30"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Abrir WhatsApp ({apt.clientPhone})</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL PARA BLOQUEAR FRANJA HORARIA */}
      {/* ======================================================== */}
      {isBlockModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#B2BFEB]/60">
            <div className="flex items-center justify-between border-b border-[#B2BFEB]/30 pb-3 mb-4">
              <div className="flex items-center gap-2 text-[#A56A2E]">
                <Ban className="w-5 h-5" />
                <h3 className="font-bold text-base text-gray-900">
                  Bloquear Franja Horaria
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBlockModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBlock} className="space-y-4 text-xs">
              <p className="text-gray-600 leading-relaxed">
                Al inhabilitar un horario, quedará automáticamente marcado como{" "}
                <strong className="text-red-600">Ocupado</strong> en el agendador público
                para la fecha seleccionada.
              </p>

              <div>
                <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Horario a Inhabilitar:
                </label>
                <select
                  value={slotToBlock}
                  onChange={(e) => setSlotToBlock(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#B2BFEB] text-sm font-bold text-gray-800"
                >
                  <option value="09:00">09:00 - 10:00</option>
                  <option value="10:30">10:30 - 11:30</option>
                  <option value="12:00">12:00 - 13:00</option>
                  <option value="14:30">14:30 - 15:30</option>
                  <option value="16:00">16:00 - 17:00</option>
                  <option value="17:30">17:30 - 18:30</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Motivo del Bloqueo:
                </label>
                <select
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#B2BFEB] text-sm text-gray-800 mb-2"
                >
                  <option value="Reunión institucional / Supervisión">
                    Reunión institucional / Supervisión
                  </option>
                  <option value="Receso clínico y descanso">
                    Receso clínico y descanso
                  </option>
                  <option value="Capacitación / Formación continua">
                    Capacitación / Formación continua
                  </option>
                  <option value="Asuntos personales / Vacaciones">
                    Asuntos personales / Vacaciones
                  </option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlockModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#B2BFEB] text-gray-700 hover:bg-gray-50 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#A56A2E] hover:bg-[#8e5a26] text-white font-bold shadow-sm"
                >
                  Confirmar Bloqueo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AgendaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F7E8] flex items-center justify-center">
          <div className="text-[#883F9B] font-bold text-sm animate-pulse">
            Cargando agenda de terapeuta...
          </div>
        </div>
      }
    >
      <AgendaContent />
    </Suspense>
  );
}
