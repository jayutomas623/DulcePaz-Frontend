"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { THERAPISTS_DATA } from "@/lib/mock-data";

// Interfaces de datos para la vista maestra
interface MasterAppointment {
  id: string;
  therapistId: string;
  therapistName: string;
  time: string;
  date: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  modality: "presencial" | "virtual";
  serviceName: string;
  status: "Confirmada" | "Completada" | "Cancelada" | "No asistió";
}

interface CompanyRSVP {
  id: string;
  companyName: string;
  representativeName: string;
  jobTitle: string;
  phone: string;
  email: string;
  attendeesCount: number;
  registeredAt: string;
  status: "Confirmado" | "Pase Enviado";
}

// Datos consolidados mockeados de citas
const MASTER_APPOINTMENTS: MasterAppointment[] = [
  {
    id: "m-1",
    therapistId: "nikki-paz",
    therapistName: "Lic. Nikki Paz",
    time: "09:00",
    date: "2026-09-24",
    clientName: "Sofía Montenegro",
    clientPhone: "+591 76543210",
    clientEmail: "sofia.montenegro@gmail.com",
    modality: "presencial",
    serviceName: "Psicoterapia Individual",
    status: "Confirmada",
  },
  {
    id: "m-2",
    therapistId: "keila-vilar",
    therapistName: "Lic. Keila Vilar",
    time: "09:00",
    date: "2026-09-24",
    clientName: "Matías Calderón",
    clientPhone: "+591 77654321",
    clientEmail: "m.calderon@familia.bo",
    modality: "presencial",
    serviceName: "Terapia para Adolescentes (13+)",
    status: "Confirmada",
  },
  {
    id: "m-3",
    therapistId: "nikki-paz",
    therapistName: "Lic. Nikki Paz",
    time: "10:30",
    date: "2026-09-24",
    clientName: "Carlos Arguedas & Elena Rossi",
    clientPhone: "+591 71234567",
    clientEmail: "arguedas.rossi@outlook.com",
    modality: "virtual",
    serviceName: "Terapia de Pareja",
    status: "Confirmada",
  },
  {
    id: "m-4",
    therapistId: "william-mendoza",
    therapistName: "Lic. William Mendoza",
    time: "10:30",
    date: "2026-09-24",
    clientName: "Banco Sol - Dpto. RRHH",
    clientPhone: "+591 75998877",
    clientEmail: "rrhh@bancosol.com.bo",
    modality: "virtual",
    serviceName: "Psicología Organizacional",
    status: "Confirmada",
  },
  {
    id: "m-5",
    therapistId: "keila-vilar",
    therapistName: "Lic. Keila Vilar",
    time: "14:30",
    date: "2026-09-24",
    clientName: "Camila Vacaflor",
    clientPhone: "+591 76112233",
    clientEmail: "camila.vacaflor@edu.bo",
    modality: "virtual",
    serviceName: "Orientación Vocacional",
    status: "Confirmada",
  },
  {
    id: "m-6",
    therapistId: "nikki-paz",
    therapistName: "Lic. Nikki Paz",
    time: "16:00",
    date: "2026-09-24",
    clientName: "Familia Morales Rocha",
    clientPhone: "+591 78901234",
    clientEmail: "morales.rocha@gmail.com",
    modality: "presencial",
    serviceName: "Terapia Familiar",
    status: "Confirmada",
  },
  {
    id: "m-7",
    therapistId: "william-mendoza",
    therapistName: "Lic. William Mendoza",
    time: "16:00",
    date: "2026-09-24",
    clientName: "SOBOCE - Seguridad Ocupacional",
    clientPhone: "+591 72334455",
    clientEmail: "salud@soboce.com",
    modality: "presencial",
    serviceName: "Psicología Organizacional",
    status: "Confirmada",
  },
  {
    id: "m-8",
    therapistId: "nikki-paz",
    therapistName: "Lic. Nikki Paz",
    time: "11:00",
    date: "2026-09-25",
    clientName: "Andrea Guzmán",
    clientPhone: "+591 70123987",
    clientEmail: "andrea.guzman@mail.com",
    modality: "virtual",
    serviceName: "Psicoterapia Individual",
    status: "Confirmada",
  },
];

// Empresas registradas en el evento del 23 de octubre
const EVENT_COMPANIES: CompanyRSVP[] = [
  {
    id: "ev-1",
    companyName: "BancoSol S.A.",
    representativeName: "Lic. Claudia Villagómez",
    jobTitle: "Subgerente de Desarrollo y Bienestar",
    phone: "+591 71556677",
    email: "cvillagomez@bancosol.com.bo",
    attendeesCount: 3,
    registeredAt: "18 Sep 2026",
    status: "Pase Enviado",
  },
  {
    id: "ev-2",
    companyName: "Telecel Tigo Bolivia",
    representativeName: "Ing. Mauricio Torrico",
    jobTitle: "Director de Recursos Humanos",
    phone: "+591 70788990",
    email: "mtorrico@tigo.net.bo",
    attendeesCount: 2,
    registeredAt: "18 Sep 2026",
    status: "Pase Enviado",
  },
  {
    id: "ev-3",
    companyName: "Cervecería Boliviana Nacional (CBN)",
    representativeName: "Dra. Patricia Salamanca",
    jobTitle: "Médico Ocupacional y Seguridad",
    phone: "+591 72033445",
    email: "psalamanca@cbn.com.bo",
    attendeesCount: 3,
    registeredAt: "19 Sep 2026",
    status: "Pase Enviado",
  },
  {
    id: "ev-4",
    companyName: "Droguería INTI",
    representativeName: "Lic. Ramiro Peñaranda",
    jobTitle: "Jefe de Clima y Cultura",
    phone: "+591 76244556",
    email: "rpenaranda@inti.com.bo",
    attendeesCount: 2,
    registeredAt: "19 Sep 2026",
    status: "Confirmado",
  },
  {
    id: "ev-5",
    companyName: "Universidad Privada Boliviana (UPB)",
    representativeName: "Msc. Lorena Alarcón",
    jobTitle: "Coordinadora de Bienestar Estudiantil",
    phone: "+591 77211223",
    email: "lalarcon@upb.edu",
    attendeesCount: 2,
    registeredAt: "20 Sep 2026",
    status: "Confirmado",
  },
  {
    id: "ev-6",
    companyName: "Embol Coca-Cola",
    representativeName: "Lic. Hernán Arteaga",
    jobTitle: "Gerente de Personas y Sostenibilidad",
    phone: "+591 73099881",
    email: "harteaga@embol.com",
    attendeesCount: 3,
    registeredAt: "20 Sep 2026",
    status: "Pase Enviado",
  },
];

export default function CoordinacionPage() {
  // Pestaña activa
  const [activeTab, setActiveTab] = useState<"citas" | "evento">("citas");

  // Filtros de citas
  const [filterDate, setFilterDate] = useState<string>("2026-09-24");
  const [filterTherapist, setFilterTherapist] = useState<string>("all");
  const [filterModality, setFilterModality] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Citas filtradas
  const filteredAppointments = useMemo(() => {
    return MASTER_APPOINTMENTS.filter((apt) => {
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
  }, [filterDate, filterTherapist, filterModality, searchTerm]);

  // Métricas del evento 23 de octubre
  const totalEventAttendees = useMemo(() => {
    return EVENT_COMPANIES.reduce((acc, curr) => acc + curr.attendeesCount, 0);
  }, []);

  // Función para exportar los datos del evento a CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Empresa / Institución",
      "Delegado Principal",
      "Cargo",
      "WhatsApp",
      "Correo Corporativo",
      "Pases Confirmados",
      "Fecha de Registro",
      "Estado",
    ];

    const rows = EVENT_COMPANIES.map((item) => [
      item.id,
      `"${item.companyName.replace(/"/g, '""')}"`,
      `"${item.representativeName.replace(/"/g, '""')}"`,
      `"${item.jobTitle.replace(/"/g, '""')}"`,
      `"${item.phone}"`,
      `"${item.email}"`,
      item.attendeesCount,
      `"${item.registeredAt}"`,
      `"${item.status}"`,
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

  // Función para imprimir lista
  const handlePrint = () => {
    window.print();
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
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Panel Maestro de Coordinación Clínica
            </h1>
            <p className="text-xs sm:text-sm text-[#F7F7E8]/80 mt-1">
              Visión centralizada de agendas del equipo y registro de participantes para eventos institucionales.
            </p>
          </div>

          <div className="flex items-center gap-3">
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

      {/* Pestañas Maestras */}
      <div className="bg-white border-b border-[#B2BFEB]/40 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex gap-6 text-xs sm:text-sm font-bold">
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
            <span>Calendario Maestro de Citas ({MASTER_APPOINTMENTS.length})</span>
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
              Empresas Evento 23 de Octubre ({EVENT_COMPANIES.length} empresas /{" "}
              {totalEventAttendees} asistentes)
            </span>
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
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Filtrar por Fecha:
                  </label>
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

              {/* Botón reset filtro */}
              {(filterDate !== "2026-09-24" ||
                filterTherapist !== "all" ||
                filterModality !== "all" ||
                searchTerm !== "") && (
                <div className="mt-3 pt-3 border-t border-[#B2BFEB]/30 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setFilterDate("2026-09-24");
                      setFilterTherapist("all");
                      setFilterModality("all");
                      setSearchTerm("");
                    }}
                    className="text-xs text-[#883F9B] font-bold hover:underline"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              )}
            </div>

            {/* Tabla Consolidada de Citas */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#B2BFEB]/40 overflow-hidden">
              <div className="p-5 border-b border-[#B2BFEB]/30 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Citas Clínicas Sincronizadas
                  </h2>
                  <p className="text-xs text-gray-500">
                    Mostrando {filteredAppointments.length} citas programadas
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#883F9B]" />
                    Nikki Paz
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2A8ED1]" />
                    Keila Vilar
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    William Mendoza
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7E8] text-gray-700 font-bold uppercase tracking-wider text-[10px] border-b border-[#B2BFEB]/40">
                    <tr>
                      <th className="py-3 px-4">Hora / Fecha</th>
                      <th className="py-3 px-4">Terapeuta</th>
                      <th className="py-3 px-4">Paciente</th>
                      <th className="py-3 px-4">Servicio</th>
                      <th className="py-3 px-4">Modalidad</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 text-right">Contacto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#B2BFEB]/20">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-10 text-center text-gray-500 font-medium"
                        >
                          No se encontraron citas con los filtros especificados.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => {
                        const therapistColor =
                          apt.therapistId === "nikki-paz"
                            ? "bg-[#883F9B]/10 text-[#883F9B] border-[#883F9B]/30"
                            : apt.therapistId === "keila-vilar"
                            ? "bg-[#2A8ED1]/10 text-[#2A8ED1] border-[#2A8ED1]/30"
                            : "bg-emerald-50 text-emerald-800 border-emerald-300";

                        const cleanPhone = apt.clientPhone.replace(/\D/g, "");

                        return (
                          <tr
                            key={apt.id}
                            className="hover:bg-gray-50/80 transition-colors"
                          >
                            {/* Hora */}
                            <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span>{apt.time}</span>
                              </div>
                              <span className="text-[10px] text-gray-400 font-normal">
                                {apt.date}
                              </span>
                            </td>

                            {/* Terapeuta */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold border ${therapistColor}`}
                              >
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

                            {/* Estado */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {apt.status}
                              </span>
                            </td>

                            {/* Contacto Directo */}
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
            {/* Banner Informativo del Evento */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#B2BFEB]/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold text-[#A56A2E] uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Desayuno de Trabajo Corporativo
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] mt-1">
                  Salud Mental en las Organizaciones
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Viernes, 23 de octubre de 2026 &bull; 10:00 a 12:00 &bull; Auditorio Dulce Paz (Calacoto)
                </p>
              </div>

              {/* Botones de Exportación e Impresión */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Exportar a CSV / Excel</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#B2BFEB] bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Lista</span>
                </button>
              </div>
            </div>

            {/* Resumen de Métricas de Registro */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-[#B2BFEB]/40">
                <span className="text-xs font-semibold text-gray-500 block">
                  Empresas e Instituciones
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#883F9B] mt-1 block">
                  {EVENT_COMPANIES.length} confirmadas
                </span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#B2BFEB]/40">
                <span className="text-xs font-semibold text-gray-500 block">
                  Total Delegados y Asistentes
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#2A8ED1] mt-1 block">
                  {totalEventAttendees} / 50 cupos
                </span>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#2A8ED1] h-2 rounded-full"
                    style={{
                      width: `${(totalEventAttendees / 50) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-[#B2BFEB]/40">
                <span className="text-xs font-semibold text-gray-500 block">
                  Estado de Invitaciones
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 block">
                  100% Notificados
                </span>
                <span className="text-[11px] text-gray-500 block mt-1">
                  Pases QR despachados por WhatsApp
                </span>
              </div>
            </div>

            {/* Tabla de Empresas Registradas */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#B2BFEB]/40 overflow-hidden">
              <div className="p-5 border-b border-[#B2BFEB]/30">
                <h3 className="font-bold text-gray-900 text-base">
                  Nómina de Asistencia Institucional
                </h3>
                <p className="text-xs text-gray-500">
                  Registros generados a través del formulario QR 1 (/registro-evento)
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7E8] text-gray-700 font-bold uppercase tracking-wider text-[10px] border-b border-[#B2BFEB]/40">
                    <tr>
                      <th className="py-3 px-4">Empresa / Institución</th>
                      <th className="py-3 px-4">Delegado Principal</th>
                      <th className="py-3 px-4">Cargo</th>
                      <th className="py-3 px-4 text-center">Asistentes</th>
                      <th className="py-3 px-4">Contacto Corporativo</th>
                      <th className="py-3 px-4">Fecha Registro</th>
                      <th className="py-3 px-4 text-right">Pase Digital</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#B2BFEB]/20">
                    {EVENT_COMPANIES.map((emp) => {
                      const cleanPhone = emp.phone.replace(/\D/g, "");
                      return (
                        <tr
                          key={emp.id}
                          className="hover:bg-gray-50/80 transition-colors"
                        >
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
                              {emp.attendeesCount} {emp.attendeesCount === 1 ? "persona" : "personas"}
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

                          {/* Fecha */}
                          <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                            {emp.registeredAt}
                          </td>

                          {/* Estado / Pase */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" />
                              {emp.status}
                            </span>
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
      </div>
    </div>
  );
}
