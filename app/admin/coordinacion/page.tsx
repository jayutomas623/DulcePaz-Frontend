"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Building2,
  Printer,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Video,
  MapPin,
  FileSpreadsheet,
  Layers,
  QrCode,
  UserPlus,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { THERAPISTS_DATA } from "@/lib/mock-data";
import {
  api,
  AdminBookingItem,
  EventRSVPAdminItem,
  ContactAdminItem,
} from "@/lib/api";

export default function CoordinacionPage() {
  // Pestaña activa
  const [activeTab, setActiveTab] = useState<"citas" | "evento" | "contactos">("citas");

  // Estado de carga y sincronización
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // ---------------------------------------------------------------------------
  // 1. PESTAÑA: CALENDARIO MAESTRO DE CITAS
  // ---------------------------------------------------------------------------
  const [appointments, setAppointments] = useState<AdminBookingItem[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterTherapist, setFilterTherapist] = useState<string>("all");
  const [filterModality, setFilterModality] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const loadAppointments = async () => {
    try {
      const res = await api.getAgenda(filterDate || undefined, filterTherapist !== "all" ? filterTherapist : undefined);
      if (res && res.appointments) {
        setAppointments(res.appointments);
      }
    } catch (e) {
      console.warn("Cargando citas con respaldo local:", e);
    }
  };

  // ---------------------------------------------------------------------------
  // 2. PESTAÑA: GESTIÓN DE EVENTOS Y ASISTENTES QR
  // ---------------------------------------------------------------------------
  const [rsvps, setRsvps] = useState<EventRSVPAdminItem[]>([]);
  const [eventMetrics, setEventMetrics] = useState({
    totalCompanies: 6,
    totalAttendees: 15,
    checkedInCount: 0,
    eventName: "Desayuno de Trabajo Corporativo: Salud Mental en las Organizaciones",
    eventDate: "Viernes, 23 de Octubre de 2026",
  });

  // Modal para validar QR / Check-in
  const [checkInCode, setCheckInCode] = useState("");
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  // Modal para crear invitación manual
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    representativeName: "",
    jobTitle: "",
    phone: "+591 ",
    email: "",
    attendeesCount: 2,
  });

  const loadEventRSVPs = async () => {
    try {
      const res = await api.getEventRSVPs();
      if (res && res.rsvps) {
        setRsvps(res.rsvps);
        setEventMetrics({
          totalCompanies: res.totalCompanies,
          totalAttendees: res.totalAttendees,
          checkedInCount: res.checkedInCount,
          eventName: res.eventName,
          eventDate: res.eventDate,
        });
      }
    } catch (e) {
      console.warn("Cargando eventos con respaldo local:", e);
    }
  };

  // ---------------------------------------------------------------------------
  // 3. PESTAÑA: BANDEJA DE CONTACTOS WEB
  // ---------------------------------------------------------------------------
  const [contacts, setContacts] = useState<ContactAdminItem[]>([]);

  const loadContacts = async () => {
    try {
      const res = await api.getContacts();
      if (res && Array.isArray(res)) {
        setContacts(res);
      }
    } catch (e) {
      console.warn("Cargando contactos con respaldo local:", e);
    }
  };

  // Carga inicial y refresco unificado
  const refreshAllData = async () => {
    setIsLoading(true);
    await Promise.all([loadAppointments(), loadEventRSVPs(), loadContacts()]);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshAllData();
  }, [filterDate, filterTherapist]);

  // Manejar acreditación en puerta (Check-in QR)
  const handleValidatePass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInCode.trim()) return;

    setIsCheckingIn(true);
    try {
      const res = await api.checkInAttendee(checkInCode.trim());
      setFeedback({
        type: "success",
        text: `¡Acreditación confirmada! ${res.message || "Invitado validado correctamente."}`,
      });
      setCheckInCode("");
      await loadEventRSVPs();
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err.message || `No se encontró el pase ${checkInCode}. Verifica el código o formato CORP-DP-XXXX.`,
      });
    } finally {
      setIsCheckingIn(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  // Crear invitación manual desde el panel
  const handleCreateRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.companyName || !newCompany.representativeName) return;

    try {
      await api.createEventRSVPAdmin(newCompany);
      setIsCreateModalOpen(false);
      setNewCompany({
        companyName: "",
        representativeName: "",
        jobTitle: "",
        phone: "+591 ",
        email: "",
        attendeesCount: 2,
      });
      setFeedback({
        type: "success",
        text: "¡Invitación creada con éxito! El pase VIP ha sido emitido.",
      });
      await loadEventRSVPs();
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: "Error al crear la invitación.",
      });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Cambiar estado de contacto
  const handleToggleContactStatus = async (contactId: string, currentStatus: string) => {
    const newStatus = currentStatus === "attended" ? "pending" : "attended";
    try {
      await api.updateContactStatus(contactId, newStatus);
      setContacts((prev) =>
        prev.map((c) => (c.id === contactId ? { ...c, status: newStatus } : c))
      );
    } catch (e) {
      console.warn("Actualización local de contacto:", e);
    }
  };

  // Citas filtradas en la tabla maestra
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchDate = filterDate ? apt.date === filterDate : true;
      const matchTherapist =
        filterTherapist === "all" || apt.therapistId === filterTherapist;
      const matchModality =
        filterModality === "all" || apt.modality === filterModality;
      const matchSearch =
        searchTerm.trim() === "" ||
        apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.clientPhone.includes(searchTerm);

      return matchDate && matchTherapist && matchModality && matchSearch;
    });
  }, [appointments, filterDate, filterTherapist, filterModality, searchTerm]);

  // Exportar lista del evento a CSV
  const handleExportCSV = () => {
    const headers = [
      "Código Pase",
      "Empresa / Institución",
      "Delegado Principal",
      "Cargo",
      "WhatsApp",
      "Correo Corporativo",
      "Pases Confirmados",
      "Estado Acreditación",
    ];

    const rows = rsvps.map((item) => [
      `"${item.passCode}"`,
      `"${item.companyName.replace(/"/g, '""')}"`,
      `"${item.representativeName.replace(/"/g, '""')}"`,
      `"${item.jobTitle.replace(/"/g, '""')}"`,
      `"${item.phone}"`,
      `"${item.email}"`,
      item.attendeesCount,
      `"${item.status === "checked_in" ? "Acreditado en Sala" : "Confirmado"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `asistentes_evento_salud_mental_23_octubre_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F7F7E8] pb-16">
      {/* Cabecera de Coordinación */}
      <div className="bg-[#883F9B] text-white py-6 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Coordinación General &bull; Lic. Nikki Paz
              </span>
              <span className="text-[10px] bg-emerald-500/30 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                Sistema en Vivo
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Panel Maestro de Coordinación Clínica
            </h1>
            <p className="text-xs sm:text-sm text-[#F7F7E8]/80 mt-1">
              Visión centralizada de agendas del equipo, acreditación de eventos presenciales y contactos institucionales.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshAllData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
              title="Refrescar datos en vivo"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refrescar</span>
            </button>
            <Link
              href="/admin/agenda"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Mi Agenda Personal</span>
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium transition-all"
            >
              Salir
            </Link>
          </div>
        </div>
      </div>

      {/* Toast de Feedback */}
      {feedback && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
          <div
            className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-medium ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-red-50 text-red-900 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Pestañas Maestras */}
      <div className="bg-white border-b border-[#B2BFEB]/40 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("citas")}
            className={`py-4 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "citas"
                ? "border-[#883F9B] text-[#883F9B]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Calendario Maestro de Citas ({appointments.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("evento")}
            className={`py-4 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "evento"
                ? "border-[#883F9B] text-[#883F9B]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>
              Empresas y Pases QR ({rsvps.length} instituciones / {eventMetrics.totalAttendees} asistentes)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contactos")}
            className={`py-4 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "contactos"
                ? "border-[#883F9B] text-[#883F9B]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Bandeja de Contacto Web ({contacts.length})</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* ======================================================== */}
        {/* PESTAÑA 1: TABLA CONSOLIDADA DE CITAS */}
        {/* ======================================================== */}
        {activeTab === "citas" && (
          <div className="space-y-6">
            {/* Barra de Filtros */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#B2BFEB]/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Filtro por fecha */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Fecha:
                    </label>
                    {filterDate && (
                      <button
                        onClick={() => setFilterDate("")}
                        className="text-[10px] text-[#883F9B] hover:underline"
                      >
                        Ver todas
                      </button>
                    )}
                  </div>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#B2BFEB]/60 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#883F9B]"
                  />
                </div>

                {/* Filtro por profesional */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Profesional:
                  </label>
                  <select
                    value={filterTherapist}
                    onChange={(e) => setFilterTherapist(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#B2BFEB]/60 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#883F9B]"
                  >
                    <option value="all">Todo el equipo clínico</option>
                    {THERAPISTS_DATA.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro por modalidad */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Modalidad:
                  </label>
                  <select
                    value={filterModality}
                    onChange={(e) => setFilterModality(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#B2BFEB]/60 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#883F9B]"
                  >
                    <option value="all">Presencial y Virtual</option>
                    <option value="presencial">Presencial (Calacoto)</option>
                    <option value="virtual">Virtual (Google Meet)</option>
                  </select>
                </div>

                {/* Búsqueda de paciente */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Buscar Paciente / Teléfono:
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Nombre o teléfono..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#B2BFEB]/60 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#883F9B]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Métricas consolidadas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#B2BFEB]/40">
                <span className="text-xs text-gray-500 block">Total en Vista</span>
                <span className="text-xl sm:text-2xl font-bold text-[#883F9B]">
                  {filteredAppointments.length} citas
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#B2BFEB]/40">
                <span className="text-xs text-gray-500 block">Presenciales (Calacoto)</span>
                <span className="text-xl sm:text-2xl font-bold text-[#2A8ED1]">
                  {filteredAppointments.filter((a) => a.modality === "presencial").length}
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#B2BFEB]/40">
                <span className="text-xs text-gray-500 block">Virtuales (Google Meet)</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                  {filteredAppointments.filter((a) => a.modality === "virtual").length}
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#B2BFEB]/40">
                <span className="text-xs text-gray-500 block">Completadas</span>
                <span className="text-xl sm:text-2xl font-bold text-purple-600">
                  {filteredAppointments.filter((a) => a.status === "completed").length}
                </span>
              </div>
            </div>

            {/* Tabla Maestra de Citas */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#B2BFEB]/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7E8] text-gray-700 font-bold uppercase tracking-wider text-[10px] border-b border-[#B2BFEB]/40">
                    <tr>
                      <th className="py-3 px-4">Fecha &amp; Hora</th>
                      <th className="py-3 px-4">Especialista</th>
                      <th className="py-3 px-4">Paciente</th>
                      <th className="py-3 px-4">Servicio Clínico</th>
                      <th className="py-3 px-4">Modalidad</th>
                      <th className="py-3 px-4">Referencia</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 text-right">Contacto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#B2BFEB]/20">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-gray-500">
                          No se encontraron citas con los filtros seleccionados.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => {
                        const cleanPhone = apt.clientPhone.replace(/\D/g, "");
                        const therapistColor =
                          apt.therapistId === "nikki-paz"
                            ? "bg-[#883F9B]/10 text-[#883F9B] border-[#883F9B]/30"
                            : apt.therapistId === "keila-vilar"
                            ? "bg-[#2A8ED1]/10 text-[#2A8ED1] border-[#2A8ED1]/30"
                            : "bg-[#A56A2E]/10 text-[#A56A2E] border-[#A56A2E]/30";

                        return (
                          <tr key={apt.id} className="hover:bg-gray-50/80 transition-colors">
                            {/* Fecha y Hora */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-extrabold text-gray-900 block text-xs">
                                {apt.time}
                              </span>
                              <span className="text-[10px] text-gray-500 font-medium">
                                {apt.date}
                              </span>
                            </td>

                            {/* Terapeuta */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold border ${therapistColor}`}>
                                {apt.therapistName}
                              </span>
                            </td>

                            {/* Paciente */}
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-gray-900 block text-xs">
                                {apt.clientName}
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {apt.clientEmail}
                              </span>
                            </td>

                            {/* Servicio */}
                            <td className="py-3.5 px-4 text-gray-700 font-medium max-w-xs truncate">
                              {apt.serviceName}
                            </td>

                            {/* Modalidad */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              {apt.modality === "presencial" ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-800">
                                  <MapPin className="w-3.5 h-3.5 text-[#2A8ED1]" />
                                  Calacoto
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                                  <Video className="w-3.5 h-3.5 text-emerald-600" />
                                  Meet
                                </span>
                              )}
                            </td>

                            {/* Referencia */}
                            <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[10px] text-gray-500">
                              {apt.bookingReference}
                            </td>

                            {/* Estado */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {apt.status}
                              </span>
                            </td>

                            {/* WhatsApp */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[#25D366] hover:text-[#128C7E] font-bold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors border border-emerald-200"
                              >
                                <Phone className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PESTAÑA 2: EMPRESAS REGISTRADAS EN EVENTO (23 DE OCTUBRE) */}
        {/* ======================================================== */}
        {activeTab === "evento" && (
          <div className="space-y-6">
            {/* Banner Informativo y Herramientas del Evento */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#B2BFEB]/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold text-[#A56A2E] uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Desayuno de Trabajo Corporativo &bull; Acreditaciones QR
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] mt-1">
                  {eventMetrics.eventName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {eventMetrics.eventDate} &bull; 10:00 a 12:00 &bull; Auditorio Dulce Paz (Calle 15 de Calacoto, La Paz)
                </p>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#883F9B] hover:bg-[#723282] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Invitar Institución</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Exportar CSV</span>
                </button>

                <Link
                  href="/registro-evento"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#B2BFEB] bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <QrCode className="w-4 h-4 text-[#883F9B]" />
                  <span>Ver Formulario QR</span>
                </Link>
              </div>
            </div>

            {/* Módulo de Acreditación en Puerta (Validación QR) */}
            <div className="bg-gradient-to-r from-[#883F9B]/10 to-[#2A8ED1]/10 rounded-3xl p-6 border border-[#B2BFEB]/60 shadow-sm">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#883F9B]" />
                  <h3 className="font-bold text-gray-900 text-base">
                    Control de Acceso en Puerta (Validación de Pase QR / Código VIP)
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mb-4">
                  Ingresa el código del pase digital (ej. <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[#883F9B]">CORP-DP-1001</code>) presentado por el delegado al llegar al auditorio para marcar su ingreso en sala.
                </p>

                <form onSubmit={handleValidatePass} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <QrCode className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={checkInCode}
                      onChange={(e) => setCheckInCode(e.target.value.toUpperCase())}
                      placeholder="CORP-DP-XXXX"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#B2BFEB] bg-white text-sm font-mono font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#883F9B]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isCheckingIn || !checkInCode.trim()}
                    className="py-3 px-6 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isCheckingIn ? "Validando..." : "Validar Acreditación"}</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Resumen de Métricas de Registro */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-[#B2BFEB]/40">
                <span className="text-xs font-semibold text-gray-500 block">
                  Empresas Invitadas Confirmadas
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#883F9B] mt-1 block">
                  {rsvps.length} empresas
                </span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#B2BFEB]/40">
                <span className="text-xs font-semibold text-gray-500 block">
                  Total Delegados y Asistentes
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#2A8ED1] mt-1 block">
                  {eventMetrics.totalAttendees} / 50 cupos
                </span>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#2A8ED1] h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (eventMetrics.totalAttendees / 50) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#B2BFEB]/40">
                <span className="text-xs font-semibold text-gray-500 block">
                  Acreditados en Sala
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 block">
                  {eventMetrics.checkedInCount} delegados
                </span>
                <span className="text-[11px] text-gray-500 block mt-1">
                  Ingreso confirmado por lectura QR
                </span>
              </div>
            </div>

            {/* Tabla de Empresas Registradas */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#B2BFEB]/40 overflow-hidden">
              <div className="p-5 border-b border-[#B2BFEB]/30 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    Nómina de Asistencia Institucional
                  </h3>
                  <p className="text-xs text-gray-500">
                    Acreditaciones sincronizadas en tiempo real con el formulario web (/registro-evento)
                  </p>
                </div>
                <span className="text-xs font-bold text-[#883F9B] bg-[#883F9B]/10 px-3 py-1 rounded-full">
                  {rsvps.length} registros
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7E8] text-gray-700 font-bold uppercase tracking-wider text-[10px] border-b border-[#B2BFEB]/40">
                    <tr>
                      <th className="py-3 px-4">Pase VIP</th>
                      <th className="py-3 px-4">Empresa / Institución</th>
                      <th className="py-3 px-4">Delegado Principal</th>
                      <th className="py-3 px-4">Cargo</th>
                      <th className="py-3 px-4 text-center">Cupos</th>
                      <th className="py-3 px-4">Contacto Directo</th>
                      <th className="py-3 px-4 text-right">Estado Ingreso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#B2BFEB]/20">
                    {rsvps.map((emp) => {
                      const cleanPhone = emp.phone.replace(/\D/g, "");
                      const isCheckedIn = emp.status === "checked_in";

                      return (
                        <tr
                          key={emp.id}
                          className={`hover:bg-gray-50/80 transition-colors ${
                            isCheckedIn ? "bg-emerald-50/30" : ""
                          }`}
                        >
                          {/* Pase Código */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border border-[#B2BFEB]/50 bg-white text-[#883F9B]">
                              {emp.passCode}
                            </span>
                          </td>

                          {/* Empresa */}
                          <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-[#883F9B]" />
                              <span>{emp.companyName}</span>
                            </div>
                          </td>

                          {/* Delegado */}
                          <td className="py-3.5 px-4 font-semibold text-gray-800">
                            {emp.representativeName}
                          </td>

                          {/* Cargo */}
                          <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">
                            {emp.jobTitle}
                          </td>

                          {/* Asistentes */}
                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-block px-2.5 py-1 rounded-full font-bold text-xs bg-[#2A8ED1]/10 text-[#2A8ED1]">
                              {emp.attendeesCount} {emp.attendeesCount === 1 ? "pase" : "pases"}
                            </span>
                          </td>

                          {/* Contacto */}
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-gray-700 hover:text-[#25D366] transition-colors"
                              >
                                <Phone className="w-3 h-3 text-gray-400" />
                                <span>{emp.phone}</span>
                              </a>
                              <div className="flex items-center gap-1 text-gray-500 text-[10px]">
                                <Mail className="w-3 h-3 text-gray-400" />
                                <span>{emp.email}</span>
                              </div>
                            </div>
                          </td>

                          {/* Estado / Acción de Acreditación */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            {isCheckedIn ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Acreditado en Sala</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setCheckInCode(emp.passCode);
                                  handleValidatePass({ preventDefault: () => {} } as any);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 border border-[#B2BFEB] transition-all"
                              >
                                <Check className="w-3 h-3" />
                                <span>Marcar Ingreso</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PESTAÑA 3: BANDEJA DE CONTACTOS WEB */}
        {/* ======================================================== */}
        {activeTab === "contactos" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#B2BFEB]/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B2BFEB]/30 pb-4 mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Mensajes y Consultas Ciudadanas (/contacto)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Mensajes registrados desde el formulario público de Dulce Paz
                  </p>
                </div>
                <span className="text-xs font-bold text-[#883F9B] bg-[#883F9B]/10 px-3 py-1 rounded-full">
                  {contacts.length} mensajes recibidos
                </span>
              </div>

              {contacts.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs">
                  No hay mensajes registrados aún en la bandeja.
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((cnt) => {
                    const isAttended = cnt.status === "attended";
                    const cleanPhone = cnt.telefono ? cnt.telefono.replace(/\D/g, "") : "";

                    return (
                      <div
                        key={cnt.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          isAttended
                            ? "bg-gray-50/70 border-gray-200 opacity-80"
                            : "bg-white border-[#B2BFEB]/60 shadow-xs"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-sm">
                              {cnt.nombre}
                            </span>
                            <span className="text-[10px] bg-[#883F9B]/10 text-[#883F9B] px-2 py-0.5 rounded-full font-bold">
                              {cnt.motivo}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {cnt.createdAt?.slice(0, 10)}
                          </span>
                        </div>

                        <p className="text-xs text-gray-700 bg-[#F7F7E8]/60 p-3 rounded-xl border border-[#B2BFEB]/30 mb-3">
                          {cnt.mensaje}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-1 text-[11px]">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              {cnt.email}
                            </span>
                            {cnt.telefono && (
                              <span className="flex items-center gap-1 text-[11px]">
                                <Phone className="w-3.5 h-3.5 text-gray-400" />
                                {cnt.telefono}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {cleanPhone && (
                              <a
                                href={`https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(
                                  cnt.nombre
                                )},%20nos%20comunicamos%20del%20equipo%20de%20Dulce%20Paz...`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs transition-colors"
                              >
                                <Phone className="w-3 h-3" />
                                <span>Responder WhatsApp</span>
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => handleToggleContactStatus(cnt.id, cnt.status)}
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                                isAttended
                                  ? "bg-gray-100 text-gray-600 border-gray-300"
                                  : "bg-[#2A8ED1] text-white border-transparent hover:bg-[#883F9B]"
                              }`}
                            >
                              {isAttended ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Atendido</span>
                                </>
                              ) : (
                                <span>Marcar como Atendido</span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: REGISTRAR EMPRESA INVITADA MANUALMENTE */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-[#B2BFEB]/60 space-y-5">
            <div className="flex items-center justify-between border-b border-[#B2BFEB]/30 pb-3">
              <div>
                <h3 className="font-bold text-lg text-[#883F9B]">
                  Invitar Empresa / Institución
                </h3>
                <p className="text-xs text-gray-500">
                  Emite un pase de cortesía VIP para el evento del 23 de octubre
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRSVP} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Empresa o Institución *
                </label>
                <input
                  type="text"
                  required
                  value={newCompany.companyName}
                  onChange={(e) => setNewCompany({ ...newCompany, companyName: e.target.value })}
                  placeholder="Ej. Cámara de Comercio"
                  className="w-full p-2.5 rounded-xl border border-[#B2BFEB]/60 text-sm focus:outline-none focus:border-[#883F9B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Delegado Principal *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.representativeName}
                    onChange={(e) => setNewCompany({ ...newCompany, representativeName: e.target.value })}
                    placeholder="Ej. Lic. Carlos Méndez"
                    className="w-full p-2.5 rounded-xl border border-[#B2BFEB]/60 text-sm focus:outline-none focus:border-[#883F9B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Cargo Institucional *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.jobTitle}
                    onChange={(e) => setNewCompany({ ...newCompany, jobTitle: e.target.value })}
                    placeholder="Ej. Director de Talento"
                    className="w-full p-2.5 rounded-xl border border-[#B2BFEB]/60 text-sm focus:outline-none focus:border-[#883F9B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    WhatsApp Corporativo *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.phone}
                    onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#B2BFEB]/60 text-sm focus:outline-none focus:border-[#883F9B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">
                    Correo Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    value={newCompany.email}
                    onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full p-2.5 rounded-xl border border-[#B2BFEB]/60 text-sm focus:outline-none focus:border-[#883F9B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Número de Pases Asignados:
                </label>
                <select
                  value={newCompany.attendeesCount}
                  onChange={(e) => setNewCompany({ ...newCompany, attendeesCount: parseInt(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-[#B2BFEB]/60 text-sm focus:outline-none focus:border-[#883F9B]"
                >
                  <option value={1}>1 delegado</option>
                  <option value={2}>2 delegados</option>
                  <option value={3}>3 delegados (Máximo institucional)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#883F9B] hover:bg-[#723282] text-white font-bold shadow-sm"
                >
                  Generar Acreditación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
