export type ServiceId =
  | "individual"
  | "pareja"
  | "familiar"
  | "vocacional"
  | "adolescentes"
  | "organizacional"
  | "talleres";

export interface Service {
  id: ServiceId;
  title: string;
  shortDesc: string;
  fullDesc: string;
  focus: string[];
  targetAudience: string;
  iconName: string;
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  quote: string;
  servicesOffered: ServiceId[];
  avatarUrl: string;
}

export interface TimeSlot {
  time: string; // ej: "09:00", "10:30"
  isAvailable: boolean;
}

export interface DaySchedule {
  date: string; // Formato AAAA-MM-DD
  slots: TimeSlot[];
}

export interface BookingFormData {
  serviceId: ServiceId;
  modality: "presencial" | "virtual";
  therapistId: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  consultationReason?: string;
  consentAccepted: boolean;
}

export interface EventRSVP {
  companyName: string;
  representativeName: string;
  jobTitle: string;
  phone: string;
  email: string;
  attendeesCount: number;
}