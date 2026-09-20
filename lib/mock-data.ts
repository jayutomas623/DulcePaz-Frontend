import { Service, Therapist, DaySchedule } from "@/types";

export const SERVICES_DATA: Service[] = [
  {
    id: "individual",
    title: "Psicoterapia Individual",
    shortDesc: "Espacio personal para trabajar en tu regulación emocional y autoconocimiento.",
    fullDesc: "Brindamos psicoterapia individualizada con bases científicas (TCC y Sistémica). Te acompañamos en procesos de superación del duelo, regulación de ansiedad, sintomatología depresiva y estrés cotidiano.",
    focus: ["Regulación emocional", "Ansiedad y depresión", "Duelo y transiciones"],
    targetAudience: "Personas adultas y jóvenes",
    iconName: "User",
  },
  {
    id: "pareja",
    title: "Terapia de Pareja",
    shortDesc: "Mejora la comunicación y fortalece el vínculo afectivo mutuo.",
    fullDesc: "Herramientas eficaces para optimizar canales de comunicación, resolver desacuerdos de convivencia, sanar heridas afectivas y mediar en dinámicas de parejas interculturales.",
    focus: ["Comunicación asertiva", "Parejas interculturales", "Acuerdos vinculares"],
    targetAudience: "Parejas en cualquier etapa de su relación",
    iconName: "HeartHandshake",
  },
  {
    id: "familiar",
    title: "Terapia Familiar",
    shortDesc: "Acompañamiento sistémico para transformar dinámicas y tensiones del hogar.",
    fullDesc: "Acompañamiento a todos los miembros del hogar para equilibrar dinámicas de comunicación, gestionar transiciones complejas, límites y resolver tensiones intergeneracionales.",
    focus: ["Límites saludables", "Mediación en crisis", "Dinámicas relacionales"],
    targetAudience: "Familias nucleares, extensas o reconstituidas",
    iconName: "Users",
  },
  {
    id: "vocacional",
    title: "Orientación Vocacional",
    shortDesc: "Pruebas psicométricas e identificación clara de aptitudes e intereses.",
    fullDesc: "Destinado a jóvenes y adultos en procesos de elección de carrera. Descubre tus fortalezas y aptitudes con evaluaciones confiables y asesoramiento psicopedagógico experto.",
    focus: ["Batería de tests psicométricos", "Proyecto de vida", "Elección de carrera"],
    targetAudience: "Estudiantes de colegio terminal, universitarios y adultos",
    iconName: "Compass",
  },
  {
    id: "adolescentes",
    title: "Terapia para Adolescentes (13+)",
    shortDesc: "Contención empática para transitar los cambios propios de la pubertad.",
    fullDesc: "Entorno empático de contención y orientación para transitar de forma adaptativa los retos de la adolescencia, desarrollo de identidad, autoestima y dinámicas escolares.",
    focus: ["Gestión de identidad", "Autoestima", "Presión académica y social"],
    targetAudience: "Adolescentes a partir de los 13 años",
    iconName: "Smile",
  },
  {
    id: "organizacional",
    title: "Psicología Organizacional",
    shortDesc: "Optimización del clima laboral, bienestar y selección estratégica.",
    fullDesc: "Apoyamos el crecimiento saludable de empresas en Bolivia. Programas de diagnóstico de clima laboral, reclutamiento ético y programas de salud mental corporativa.",
    focus: ["Clima y salud laboral", "Prevención de burnout", "Talleres de liderazgo"],
    targetAudience: "Instituciones, medianas y grandes empresas",
    iconName: "Building2",
  },
  {
    id: "talleres",
    title: "Psicoeducación (Talleres y Espacios de Escucha)",
    shortDesc: "Espacios grupales y reflexivos abiertos a la comunidad.",
    fullDesc: "Encuentros interactivos dedicados a transferir herramientas preventivas. Incluye los Espacios de Escucha mensuales sobre dependencia emocional y reconstrucción personal.",
    focus: ["Espacios de Escucha", "Dependencia emocional", "Gestión del estrés"],
    targetAudience: "Público general e instituciones",
    iconName: "CalendarDays",
  },
];

export const THERAPISTS_DATA: Therapist[] = [
  {
    id: "nikki-paz",
    name: "Lic. Nikki Paz",
    role: "Coordinadora General / Psicóloga Clínica",
    specialty: "Terapia de pareja, ansiedad, duelo y terapia intercultural bilingüe (Español/Inglés)",
    quote: "Nuestra prioridad es guiarte hacia un espacio de paz interna en medio de las complejidades cotidianas de la vida.",
    servicesOffered: ["individual", "pareja", "familiar", "talleres"],
    avatarUrl: "/team/nikki.jpg",
  },
  {
    id: "keila-vilar",
    name: "Lic. Keila Vilar",
    role: "Especialista Psicopedagógica",
    specialty: "Acompañamiento infanto-juvenil, hábitos de estudio y orientación vocacional",
    quote: "El aprendizaje florece cuando las niñas, niños y jóvenes se sienten escuchados, validados y acompañados con paciencia.",
    servicesOffered: ["vocacional", "adolescentes", "talleres"],
    avatarUrl: "/team/keila.jpg",
  },
  {
    id: "william-mendoza",
    name: "Lic. William Mendoza",
    role: "Psicólogo Organizacional",
    specialty: "Salud ocupacional, clima corporativo, consultoría y selección de talento",
    quote: "Organizaciones sanas y humanas logran resultados extraordinarios y sostenibles en el tiempo.",
    servicesOffered: ["organizacional", "talleres"],
    avatarUrl: "/team/william.jpg",
  },
];

// Generador de horarios para los próximos 14 días (Zona horaria Bolivia GMT-4)
export const MOCK_SCHEDULES: DaySchedule[] = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  const dateStr = d.toISOString().split("T")[0];
  const isWeekend = d.getDay() === 0; // Domingo cerrado

  return {
    date: dateStr,
    slots: isWeekend
      ? []
      : [
          { time: "09:00", isAvailable: true },
          { time: "10:30", isAvailable: i % 2 === 0 },
          { time: "12:00", isAvailable: false }, // Ocupado
          { time: "14:30", isAvailable: true },
          { time: "16:00", isAvailable: true },
          { time: "17:30", isAvailable: i % 3 !== 0 },
        ],
  };
});

export const FAQS_DATA = [
  {
    q: "¿Cuánto dura una sesión psicoterapéutica?",
    a: "Cada sesión estándar tiene una duración de 50 a 60 minutos, permitiendo abordar con profundidad y calma cada motivo de consulta.",
  },
  {
    q: "¿Cómo se confirma mi cita?",
    a: "Al completar el formulario web de reserva, el sistema genera tu cita y envía un comprobante inmediato por correo y WhatsApp con todos los detalles.",
  },
  {
    q: "¿Qué pasa si necesito cancelar o reprogramar?",
    a: "Te solicitamos avisar con al menos 24 horas de anticipación para que podamos reasignar ese espacio a otra persona en lista de espera.",
  },
  {
    q: "¿Atienden a personas que residen fuera de Bolivia?",
    a: "Sí. A través de nuestra modalidad virtual brindamos terapia en español e inglés a pacientes en cualquier país mediante enlaces seguros de Google Meet.",
  },
];