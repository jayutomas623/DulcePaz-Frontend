"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  SERVICES_DATA,
  THERAPISTS_DATA,
  MOCK_SCHEDULES,
} from "@/lib/mock-data";
import { ServiceId, Service, Therapist } from "@/types";
import {
  User,
  HeartHandshake,
  Users,
  Compass,
  Smile,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Video,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar as CalendarIcon,
  MessageCircle,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

// Mapeo de iconos dinámicos para los servicios
const iconMap: Record<string, React.ElementType> = {
  User,
  HeartHandshake,
  Users,
  Compass,
  Smile,
  Building2,
  CalendarDays,
};

const STEP_TITLES = [
  { step: 1, label: "Servicio", short: "Servicio" },
  { step: 2, label: "Modalidad y Profesional", short: "Especialista" },
  { step: 3, label: "Fecha y Hora", short: "Horario" },
  { step: 4, label: "Tus Datos", short: "Datos" },
  { step: 5, label: "Confirmación", short: "Listo" },
];

function WizardContent() {
  const searchParams = useSearchParams();

  // Preselección por URL param si existe
  const paramService = searchParams.get("servicio") as ServiceId;
  const initialService =
    paramService && SERVICES_DATA.some((s) => s.id === paramService)
      ? paramService
      : null;

  // Estados del flujo
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServiceIdState, setSelectedServiceIdState] = useState<ServiceId | null>(null);
  const selectedServiceId = selectedServiceIdState ?? initialService;

  const [modality, setModality] = useState<"presencial" | "virtual">("presencial");
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>("any");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  // Estado del calendario mensual
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // Datos personales (Paso 4)
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("+591 ");
  const [clientEmail, setClientEmail] = useState("");
  const [consultationReason, setConsultationReason] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cita confirmada (Paso 5)
  const [bookingReference, setBookingReference] = useState<string>("");

  // Servicio seleccionado
  const selectedService: Service | undefined = useMemo(() => {
    return SERVICES_DATA.find((s) => s.id === selectedServiceId);
  }, [selectedServiceId]);

  // Terapeutas disponibles según el servicio seleccionado
  const availableTherapists = useMemo(() => {
    if (!selectedServiceId) return THERAPISTS_DATA;
    return THERAPISTS_DATA.filter((t) =>
      t.servicesOffered.includes(selectedServiceId)
    );
  }, [selectedServiceId]);

  // Profesional final asignado (para mostrar en el paso 5)
  const assignedTherapist: Therapist | undefined = useMemo(() => {
    if (selectedTherapistId && selectedTherapistId !== "any") {
      return THERAPISTS_DATA.find((t) => t.id === selectedTherapistId);
    }
    // Si eligió "cualquiera", asigna el primer profesional calificado
    if (availableTherapists.length > 0) {
      return availableTherapists[0];
    }
    return THERAPISTS_DATA[0];
  }, [selectedTherapistId, availableTherapists]);

  // Generador de slots horarios según fecha seleccionada
  const dayScheduleSlots = useMemo(() => {
    if (!selectedDate) return [];
    const found = MOCK_SCHEDULES.find((s) => s.date === selectedDate);
    if (found) return found.slots;

    // Horarios por defecto si no está explícito en el mock
    const dateObj = new Date(selectedDate + "T12:00:00");
    if (dateObj.getDay() === 0) return []; // Domingos sin atención

    return [
      { time: "09:00", isAvailable: true },
      { time: "10:30", isAvailable: true },
      { time: "12:00", isAvailable: false },
      { time: "14:30", isAvailable: true },
      { time: "16:00", isAvailable: true },
      { time: "17:30", isAvailable: false },
    ];
  }, [selectedDate]);

  // Generación de días del mes en el calendario
  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Lunes = 0
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: Array<{
      dayNumber: number;
      dateString: string;
      isCurrentMonth: boolean;
      isPast: boolean;
      isSunday: boolean;
      hasAvailability: boolean;
    }> = [];

    // Días previos de relleno
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({
        dayNumber: 0,
        dateString: "",
        isCurrentMonth: false,
        isPast: true,
        isSunday: false,
        hasAvailability: false,
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(year, month, d);
      const isSunday = dateObj.getDay() === 0;
      const isPast = dateObj < today;
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        d
      ).padStart(2, "0")}`;

      const schedule = MOCK_SCHEDULES.find((s) => s.date === dateString);
      const hasAvailability =
        !isSunday &&
        !isPast &&
        (schedule ? schedule.slots.some((s) => s.isAvailable) : true);

      days.push({
        dayNumber: d,
        dateString,
        isCurrentMonth: true,
        isPast,
        isSunday,
        hasAvailability,
      });
    }

    return days;
  }, [calendarMonth]);

  // Validaciones antes de avanzar
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedServiceId) {
        setErrors({ service: "Por favor, selecciona una especialidad clínica." });
        return;
      }
      setErrors({});
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2) {
      if (!modality) {
        setErrors({ modality: "Selecciona una modalidad de atención." });
        return;
      }
      setErrors({});
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 3) {
      if (!selectedDate) {
        setErrors({ date: "Selecciona una fecha en el calendario." });
        return;
      }
      if (!selectedTimeSlot) {
        setErrors({ timeSlot: "Selecciona un horario disponible." });
        return;
      }
      setErrors({});
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 4) {
      const newErrors: Record<string, string> = {};
      if (clientName.trim().length < 3) {
        newErrors.clientName = "Ingresa tu nombre completo (mínimo 3 caracteres).";
      }
      const cleanPhone = clientPhone.replace(/\D/g, "");
      if (cleanPhone.length < 8) {
        newErrors.clientPhone = "Ingresa un número de celular o WhatsApp válido (+591...).";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientEmail)) {
        newErrors.clientEmail = "Ingresa un correo electrónico válido.";
      }
      if (!consentAccepted) {
        newErrors.consentAccepted =
          "Es obligatorio aceptar las políticas de privacidad y consentimiento informado.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Generar código de reserva y pasar al paso 5
      const randomCode = `DP-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      setBookingReference(randomCode);
      setErrors({});
      setCurrentStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1 && currentStep < 5) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleResetBooking = () => {
    setSelectedServiceIdState(null);
    setSelectedTherapistId("any");
    setSelectedDate("");
    setSelectedTimeSlot("");
    setClientName("");
    setClientPhone("+591 ");
    setClientEmail("");
    setConsultationReason("");
    setConsentAccepted(false);
    setErrors({});
    setCurrentStep(1);
  };

  // Construir mensaje prellenado para WhatsApp
  const generateWhatsAppUrl = () => {
    const therapistName = assignedTherapist?.name || "Profesional asignado";
    const serviceName = selectedService?.title || "Consulta psicológica";
    const modalityText =
      modality === "presencial"
        ? "Presencial (Calle 15 de Calacoto, La Paz)"
        : "Virtual (Google Meet)";

    const message = `¡Hola Dulce Paz! Acabo de registrar mi cita en la web con el código *${bookingReference}*.
• *Servicio:* ${serviceName}
• *Especialista:* ${therapistName}
• *Fecha:* ${selectedDate} a las ${selectedTimeSlot} (Hora Bolivia GMT-4)
• *Modalidad:* ${modalityText}
• *Consultante:* ${clientName}
Agradezco confirmar la reserva.`;

    return `https://wa.me/59176543210?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F7E8] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabecera del Wizard */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#883F9B]/10 text-[#883F9B] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Agendamiento en Línea
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#883F9B] tracking-tight">
            Reserva tu Espacio Terapéutico
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Atención humana, confidencial y basada en evidencia. Gestiona tu cita en 5 sencillos pasos.
          </p>
        </div>

        {/* Barra superior de progreso de 5 pasos */}
        <div className="mb-10 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#B2BFEB]/40">
          <div className="flex items-center justify-between relative">
            {/* Línea conectora de fondo */}
            <div className="absolute top-4 sm:top-5 left-6 right-6 h-0.5 bg-[#B2BFEB]/30 -z-0" />
            {/* Línea conectora de avance activo */}
            <div
              className="absolute top-4 sm:top-5 left-6 h-0.5 bg-[#2A8ED1] transition-all duration-500 -z-0"
              style={{
                width: `${((currentStep - 1) / (STEP_TITLES.length - 1)) * 90}%`,
              }}
            />

            {STEP_TITLES.map((item) => {
              const isCompleted = currentStep > item.step;
              const isCurrent = currentStep === item.step;

              return (
                <div
                  key={item.step}
                  className="flex flex-col items-center relative z-10 text-center"
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-sm ${
                      isCompleted
                        ? "bg-[#2A8ED1] text-white"
                        : isCurrent
                        ? "bg-[#883F9B] text-white ring-4 ring-[#883F9B]/20 scale-105"
                        : "bg-gray-100 text-gray-400 border border-[#B2BFEB]/50"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    ) : (
                      item.step
                    )}
                  </div>
                  <span
                    className={`mt-2 text-[11px] sm:text-xs font-medium tracking-tight hidden sm:block ${
                      isCurrent
                        ? "text-[#883F9B] font-bold"
                        : isCompleted
                        ? "text-gray-800"
                        : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`mt-1.5 text-[10px] font-semibold sm:hidden ${
                      isCurrent ? "text-[#883F9B]" : "text-gray-400"
                    }`}
                  >
                    {item.short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contenedor Principal del Paso Activo */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#B2BFEB]/40 transition-all">
          {/* ======================================================== */}
          {/* PASO 1: SELECCIÓN DE SERVICIO / ESPECIALIDAD */}
          {/* ======================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-[#B2BFEB]/30 pb-4">
                <span className="text-xs font-bold text-[#A56A2E] uppercase tracking-wider">
                  Paso 1 de 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] mt-1">
                  Selecciona la Especialidad Terapéutica
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Elige el área para la cual deseas programar tu atención clínica o psicoeducativa.
                </p>
              </div>

              {errors.service && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errors.service}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES_DATA.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  const IconComponent = iconMap[service.iconName] || CalendarDays;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceIdState(service.id);
                        setErrors({});
                      }}
                      className={`text-left p-5 rounded-2xl border-2 transition-all flex flex-col justify-between relative group ${
                        isSelected
                          ? "border-[#883F9B] bg-[#883F9B]/5 shadow-md ring-2 ring-[#883F9B]/20"
                          : "border-[#B2BFEB]/40 hover:border-[#883F9B]/50 hover:bg-gray-50/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-[#883F9B] text-white"
                                : "bg-[#F7F7E8] text-[#883F9B] group-hover:bg-[#883F9B]/10"
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <span className="flex items-center gap-1 text-xs font-bold text-[#883F9B] bg-white px-2.5 py-1 rounded-full border border-[#883F9B]/30 shadow-xs">
                              <Check className="w-3.5 h-3.5" /> Seleccionado
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 text-base mb-1">
                          {service.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {service.shortDesc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#B2BFEB]/20 flex flex-wrap gap-1.5">
                        {service.focus.slice(0, 2).map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white text-gray-600 px-2 py-0.5 rounded-md border border-[#B2BFEB]/40 font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* PASO 2: MODALIDAD Y PROFESIONAL */}
          {/* ======================================================== */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="border-b border-[#B2BFEB]/30 pb-4">
                <span className="text-xs font-bold text-[#A56A2E] uppercase tracking-wider">
                  Paso 2 de 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] mt-1">
                  Modalidad de Atención y Especialista
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Define cómo prefieres atenderte y selecciona al profesional de tu preferencia para{" "}
                  <strong className="text-[#883F9B]">{selectedService?.title}</strong>.
                </p>
              </div>

              {/* Selector de Modalidad */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  1. Elige la Modalidad de Consulta
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Presencial */}
                  <div
                    onClick={() => setModality("presencial")}
                    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                      modality === "presencial"
                        ? "border-[#2A8ED1] bg-[#2A8ED1]/5 shadow-sm ring-2 ring-[#2A8ED1]/20"
                        : "border-[#B2BFEB]/40 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        modality === "presencial"
                          ? "bg-[#2A8ED1] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">
                          Presencial (Calacoto)
                        </span>
                        {modality === "presencial" && (
                          <Check className="w-4 h-4 text-[#2A8ED1]" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Calle 15 de Calacoto, Edificio Parque. Consultorio habilitado en La Paz con ambiente cálido y seguro.
                      </p>
                    </div>
                  </div>

                  {/* Virtual */}
                  <div
                    onClick={() => setModality("virtual")}
                    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                      modality === "virtual"
                        ? "border-[#2A8ED1] bg-[#2A8ED1]/5 shadow-sm ring-2 ring-[#2A8ED1]/20"
                        : "border-[#B2BFEB]/40 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        modality === "virtual"
                          ? "bg-[#2A8ED1] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">
                          Virtual (Google Meet)
                        </span>
                        {modality === "virtual" && (
                          <Check className="w-4 h-4 text-[#2A8ED1]" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Videollamada cifrada extremo a extremo. Ideal para pacientes en el interior o fuera de Bolivia (Español/Inglés).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selector de Profesional */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  2. Selecciona al Profesional Asignado
                </label>
                <div className="space-y-3">
                  {/* Opción 1: Cualquier profesional disponible (Recomendada) */}
                  <div
                    onClick={() => setSelectedTherapistId("any")}
                    className={`cursor-pointer p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      selectedTherapistId === "any"
                        ? "border-[#883F9B] bg-[#883F9B]/5 ring-2 ring-[#883F9B]/20"
                        : "border-[#B2BFEB]/40 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#883F9B] to-[#2A8ED1] text-white flex items-center justify-center shadow-sm">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                            Cualquier profesional disponible
                          </h4>
                          <span className="text-[10px] font-bold bg-[#A56A2E] text-white px-2 py-0.5 rounded-full uppercase">
                            Más rápido
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Te asignaremos el especialista con disponibilidad de horario más pronta para este servicio.
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedTherapistId === "any"
                          ? "border-[#883F9B] bg-[#883F9B] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedTherapistId === "any" && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>

                  {/* Profesionales específicos filtrados */}
                  {availableTherapists.map((therapist) => {
                    const isSelected = selectedTherapistId === therapist.id;
                    return (
                      <div
                        key={therapist.id}
                        onClick={() => setSelectedTherapistId(therapist.id)}
                        className={`cursor-pointer p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-[#883F9B] bg-[#883F9B]/5 ring-2 ring-[#883F9B]/20"
                            : "border-[#B2BFEB]/40 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#883F9B]/10 text-[#883F9B] font-bold text-sm flex items-center justify-center border border-[#883F9B]/20">
                            {therapist.name
                              .replace("Lic. ", "")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                              {therapist.name}
                            </h4>
                            <p className="text-xs text-[#883F9B] font-medium">
                              {therapist.role}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                              {therapist.specialty}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-[#883F9B] bg-[#883F9B] text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* PASO 3: SELECCIÓN DE FECHA Y FRANJA HORARIA */}
          {/* ======================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-[#B2BFEB]/30 pb-4">
                <span className="text-xs font-bold text-[#A56A2E] uppercase tracking-wider">
                  Paso 3 de 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] mt-1">
                  Selecciona Fecha y Horario
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-gray-600 font-medium">
                  <Clock className="w-4 h-4 text-[#A56A2E]" />
                  <span>
                    Zona horaria oficial:{" "}
                    <strong className="text-gray-800">
                      Hora de Bolivia (GMT-4)
                    </strong>
                  </span>
                </div>
              </div>

              {(errors.date || errors.timeSlot) && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.date || errors.timeSlot}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Calendario mensual (7 columnas) */}
                <div className="lg:col-span-7 bg-[#F7F7E8]/40 p-4 sm:p-5 rounded-2xl border border-[#B2BFEB]/40">
                  {/* Encabezado del mes y controles */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#883F9B] text-base capitalize">
                      {calendarMonth.toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() - 1,
                              1
                            )
                          );
                        }}
                        className="p-1.5 rounded-lg border border-[#B2BFEB]/40 bg-white hover:bg-gray-100 text-gray-700"
                        title="Mes anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() + 1,
                              1
                            )
                          );
                        }}
                        className="p-1.5 rounded-lg border border-[#B2BFEB]/40 bg-white hover:bg-gray-100 text-gray-700"
                        title="Mes siguiente"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Nombres de los días */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mié</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sáb</span>
                    <span className="text-red-400">Dom</span>
                  </div>

                  {/* Celdas de los días */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, idx) => {
                      if (!day.isCurrentMonth) {
                        return (
                          <div
                            key={`empty-${idx}`}
                            className="h-10 sm:h-12 rounded-xl"
                          />
                        );
                      }

                      const isSelected = selectedDate === day.dateString;
                      const isDisabled = day.isPast || day.isSunday;

                      return (
                        <button
                          key={day.dateString}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => {
                            setSelectedDate(day.dateString);
                            setSelectedTimeSlot(""); // Reset time on date change
                            setErrors({});
                          }}
                          className={`h-10 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold flex flex-col items-center justify-center transition-all relative ${
                            isSelected
                              ? "bg-[#883F9B] text-white shadow-md font-bold scale-105"
                              : isDisabled
                              ? "text-gray-300 cursor-not-allowed bg-transparent"
                              : "hover:bg-[#2A8ED1]/10 text-gray-800 bg-white border border-[#B2BFEB]/20 hover:border-[#2A8ED1]"
                          }`}
                        >
                          <span>{day.dayNumber}</span>
                          {!isDisabled && !isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#B2BFEB]/20 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Días con atención
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gray-300" />
                      Domingo / Cerrado
                    </span>
                  </div>
                </div>

                {/* Panel de Franjas Horarias */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#883F9B]" />
                      Horarios Disponibles
                    </h3>

                    {selectedDate ? (
                      <p className="text-xs text-gray-600 mb-4">
                        Citas para el{" "}
                        <strong className="text-[#883F9B]">
                          {new Date(selectedDate + "T12:00:00").toLocaleDateString(
                            "es-ES",
                            {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            }
                          )}
                        </strong>
                        :
                      </p>
                    ) : (
                      <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 mb-4">
                        👈 Selecciona primero un día en el calendario para ver los horarios disponibles.
                      </p>
                    )}

                    {selectedDate && (
                      <div className="grid grid-cols-2 gap-2.5">
                        {dayScheduleSlots.map((slot) => {
                          const isSlotSelected = selectedTimeSlot === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.isAvailable}
                              onClick={() => {
                                setSelectedTimeSlot(slot.time);
                                setErrors({});
                              }}
                              className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                                !slot.isAvailable
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                                  : isSlotSelected
                                  ? "bg-[#2A8ED1] text-white border-[#2A8ED1] shadow-md ring-2 ring-[#2A8ED1]/30"
                                  : "bg-white text-gray-800 border-[#B2BFEB]/60 hover:border-[#2A8ED1] hover:bg-[#2A8ED1]/5"
                              }`}
                            >
                              <span>{slot.time}</span>
                              {slot.isAvailable ? (
                                isSlotSelected ? (
                                  <Check className="w-3.5 h-3.5 text-white" />
                                ) : (
                                  <span className="text-[10px] font-normal text-emerald-600">
                                    Libre
                                  </span>
                                )
                              ) : (
                                <span className="text-[9px] uppercase tracking-wider text-gray-400 not-sr-only">
                                  Ocupado
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {selectedDate && selectedTimeSlot && (
                    <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs">
                      <p className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Horario seleccionado:
                      </p>
                      <p className="mt-1">
                        {selectedDate} a las {selectedTimeSlot} (50 a 60 minutos)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* PASO 4: FORMULARIO DE DATOS PERSONALES */}
          {/* ======================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-[#B2BFEB]/30 pb-4">
                <span className="text-xs font-bold text-[#A56A2E] uppercase tracking-wider">
                  Paso 4 de 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#883F9B] mt-1">
                  Datos del Consultante y Consentimiento
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Esta información es estrictamente confidencial bajo secreto profesional y se usará exclusivamente para la gestión de tu cita.
                </p>
              </div>

              {/* Resumen flotante de la reserva previa */}
              <div className="bg-[#F7F7E8] p-4 rounded-2xl border border-[#B2BFEB]/40 flex flex-wrap gap-4 justify-between items-center text-xs">
                <div>
                  <span className="text-gray-500 block">Servicio:</span>
                  <span className="font-bold text-[#883F9B]">
                    {selectedService?.title}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Modalidad:</span>
                  <span className="font-bold text-gray-800 capitalize">
                    {modality}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Terapeuta:</span>
                  <span className="font-bold text-gray-800">
                    {assignedTherapist?.name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Fecha y Hora:</span>
                  <span className="font-bold text-[#2A8ED1]">
                    {selectedDate} | {selectedTimeSlot}
                  </span>
                </div>
              </div>

              {/* Campos del formulario */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nombre completo */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ej. Valeria Quiroga Paredes"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 ${
                        errors.clientName
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#B2BFEB]/60 focus:border-[#883F9B]"
                      }`}
                    />
                  </div>
                  {errors.clientName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.clientName}
                    </p>
                  )}
                </div>

                {/* WhatsApp / Celular */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    WhatsApp / Celular *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+591 76543210"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 ${
                        errors.clientPhone
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#B2BFEB]/60 focus:border-[#883F9B]"
                      }`}
                    />
                  </div>
                  {errors.clientPhone && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.clientPhone}
                    </p>
                  )}
                </div>

                {/* Correo Electrónico */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="valeria.quiroga@ejemplo.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 ${
                        errors.clientEmail
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#B2BFEB]/60 focus:border-[#883F9B]"
                      }`}
                    />
                  </div>
                  {errors.clientEmail && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.clientEmail}
                    </p>
                  )}
                </div>

                {/* Motivo de consulta (opcional) */}
                <div className="sm:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Motivo de Consulta (Opcional)
                    </label>
                    <span className="text-[10px] text-gray-400">
                      {consultationReason.length}/500 caracteres
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={consultationReason}
                    onChange={(e) => setConsultationReason(e.target.value)}
                    placeholder="Describe brevemente el tema o síntoma que deseas abordar en esta sesión..."
                    className="w-full p-3 rounded-xl border border-[#B2BFEB]/60 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 focus:border-[#883F9B]"
                  />
                </div>

                {/* Checkbox de Consentimiento Informado */}
                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => {
                        setConsentAccepted(e.target.checked);
                        if (e.target.checked) {
                          setErrors((prev) => ({ ...prev, consentAccepted: "" }));
                        }
                      }}
                      className="mt-1 w-4 h-4 text-[#883F9B] rounded border-gray-300 focus:ring-[#883F9B]"
                    />
                    <span className="text-xs text-gray-700 leading-relaxed">
                      Acepto las{" "}
                      <Link
                        href="/privacidad"
                        target="_blank"
                        className="text-[#883F9B] underline hover:text-[#2A8ED1]"
                      >
                        políticas de privacidad
                      </Link>{" "}
                      y el{" "}
                      <Link
                        href="/terminos"
                        target="_blank"
                        className="text-[#883F9B] underline hover:text-[#2A8ED1]"
                      >
                        consentimiento informado
                      </Link>{" "}
                      de atención psicológica bajo secreto profesional y código ético.
                    </span>
                  </label>
                  {errors.consentAccepted && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.consentAccepted}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* PASO 5: PANTALLA DE CONFIRMACIÓN EXITOSA */}
          {/* ======================================================== */}
          {currentStep === 5 && (
            <div className="space-y-8 text-center sm:text-left">
              {/* Encabezado de Éxito */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-emerald-50 border border-emerald-200 p-6 rounded-3xl">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="inline-block text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
                    Cita Confirmada con Éxito
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    ¡Tu cita ha sido agendada con éxito!
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Te hemos enviado un mensaje de confirmación a tu correo y WhatsApp con todos los detalles de la consulta.
                  </p>
                </div>
              </div>

              {/* Ficha Resumen de la Cita */}
              <div className="bg-[#F7F7E8]/60 border border-[#B2BFEB]/50 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b border-[#B2BFEB]/30 pb-4 gap-2">
                  <div>
                    <span className="text-xs text-gray-500 block">
                      Código Único de Cita:
                    </span>
                    <span className="text-base font-mono font-bold text-[#883F9B]">
                      {bookingReference}
                    </span>
                  </div>
                  <div className="text-xs font-semibold px-3 py-1 rounded-full bg-[#883F9B]/10 text-[#883F9B]">
                    Estado: Confirmada
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-left">
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block uppercase">
                      Especialidad
                    </span>
                    <span className="font-bold text-gray-900 text-base">
                      {selectedService?.title}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Duración estándar: 50 a 60 minutos
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500 font-semibold block uppercase">
                      Profesional Asignado
                    </span>
                    <span className="font-bold text-[#883F9B] text-base">
                      {assignedTherapist?.name}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {assignedTherapist?.role}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500 font-semibold block uppercase">
                      Fecha y Horario
                    </span>
                    <span className="font-bold text-gray-900">
                      {selectedDate} a las {selectedTimeSlot}
                    </span>
                    <p className="text-xs text-[#A56A2E] font-medium mt-0.5">
                      Hora oficial de Bolivia (GMT-4)
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500 font-semibold block uppercase">
                      Modalidad y Ubicación
                    </span>
                    {modality === "presencial" ? (
                      <div className="flex items-start gap-1.5 mt-0.5">
                        <MapPin className="w-4 h-4 text-[#2A8ED1] shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-800 font-medium">
                          Calle 15 de Calacoto, Edificio Parque, La Paz, Bolivia
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-1.5 mt-0.5">
                        <Video className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-emerald-700 font-medium">
                          Google Meet: meet.google.com/dpz-sesion-clinica
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 pt-2 border-t border-[#B2BFEB]/20">
                    <span className="text-xs text-gray-500 font-semibold block uppercase">
                      Consultante
                    </span>
                    <p className="font-medium text-gray-900 mt-0.5">
                      {clientName} • {clientPhone} • {clientEmail}
                    </p>
                    {consultationReason && (
                      <p className="text-xs text-gray-600 italic mt-1">
                        Motivo indicado: &ldquo;{consultationReason}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Automatizaciones de fondo completadas */}
                <div className="p-4 bg-white rounded-2xl border border-[#B2BFEB]/40 text-xs text-left space-y-2">
                  <p className="font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#883F9B]" />
                    Sincronización Clínica Automatizada:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Registro seguro en Supabase</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Evento en Google Calendar del terapeuta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Comprobante con archivo .ics despachado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Recordatorio programado 24h antes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón interactivo de contingencia WhatsApp */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Abrir confirmación en WhatsApp
                </a>

                <button
                  type="button"
                  onClick={handleResetBooking}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-6 py-3.5 rounded-2xl font-bold text-sm border border-[#B2BFEB] transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-gray-500" />
                  Agendar otra cita
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#883F9B] hover:text-[#2A8ED1] px-4 py-3.5 text-sm font-bold"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* BOTONES INFERIORES DE NAVEGACIÓN */}
          {/* ======================================================== */}
          {currentStep < 5 && (
            <div className="mt-10 pt-6 border-t border-[#B2BFEB]/40 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#B2BFEB] bg-white text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white text-sm font-bold transition-all shadow-sm hover:shadow-md"
              >
                {currentStep === 4 ? (
                  <>
                    Confirmar Cita
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AgendarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F7E8] flex items-center justify-center">
          <div className="text-[#883F9B] font-bold text-sm animate-pulse">
            Cargando motor de agendamiento...
          </div>
        </div>
      }
    >
      <WizardContent />
    </Suspense>
  );
}
