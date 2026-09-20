"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  ArrowRight,
  Smartphone,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Cuentas institucionales predefinidas para simulación ágil
  const PRESET_ACCOUNTS = [
    {
      name: "Lic. Nikki Paz",
      role: "Coordinadora / Psicología Clínica",
      email: "nikki@dulcepaz.com",
      target: "/admin/coordinacion",
    },
    {
      name: "Lic. Keila Vilar",
      role: "Especialista Psicopedagógica",
      email: "keila@dulcepaz.com",
      target: "/admin/agenda?therapist=keila-vilar",
    },
    {
      name: "Lic. William Mendoza",
      role: "Psicólogo Organizacional",
      email: "william@dulcepaz.com",
      target: "/admin/agenda?therapist=william-mendoza",
    },
  ];

  const handleSelectPreset = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword("dulcepaz2026");
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor, ingresa tu correo institucional y contraseña.");
      return;
    }

    if (!email.toLowerCase().endsWith("@dulcepaz.com")) {
      setError("El acceso está restringido a cuentas oficiales @dulcepaz.com");
      return;
    }

    setIsLoading(true);

    // Simulación de autenticación Supabase Auth con RLS
    setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase().includes("nikki")) {
        router.push("/admin/coordinacion");
      } else {
        const found = PRESET_ACCOUNTS.find(
          (a) => a.email.toLowerCase() === email.toLowerCase()
        );
        router.push(found ? found.target : "/admin/agenda");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F7F7E8] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logotipo y Título Institucional */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#883F9B] text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
            DP
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#883F9B] tracking-tight">
            Portal de Gestión Clínica
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#A56A2E] font-medium tracking-wide">
            Sistema Administrativo y Agenda PWA &bull; Dulce Paz
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-[#B2BFEB]/40 rounded-3xl space-y-6">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Campo Correo Institucional */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Correo Institucional (@dulcepaz.com)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="profesional@dulcepaz.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#B2BFEB]/60 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 focus:border-[#883F9B] transition-all"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#B2BFEB]/60 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#883F9B]/30 focus:border-[#883F9B] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón de Ingreso */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#2A8ED1] hover:bg-[#883F9B] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Verificando credenciales...</span>
                ) : (
                  <>
                    <span>Ingresar al Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Acceso Rápido de Prueba (Simulador de Equipo) */}
          <div className="pt-4 border-t border-[#B2BFEB]/30">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2 text-center">
              Acceso Rápido de Prueba (Demo):
            </span>
            <div className="space-y-1.5">
              {PRESET_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectPreset(acc.email)}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-[#F7F7E8] border border-transparent hover:border-[#B2BFEB]/50 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-gray-800 group-hover:text-[#883F9B] block">
                      {acc.name}
                    </span>
                    <span className="text-[10px] text-gray-500">{acc.role}</span>
                  </div>
                  <UserCheck className="w-4 h-4 text-gray-400 group-hover:text-[#2A8ED1]" />
                </button>
              ))}
            </div>
          </div>

          {/* Insignia PWA */}
          <div className="p-3 bg-[#F7F7E8] rounded-xl border border-[#B2BFEB]/40 flex items-center gap-2.5 text-xs text-gray-600">
            <Smartphone className="w-4 h-4 text-[#883F9B] shrink-0" />
            <span>
              <strong>PWA Instalable:</strong> Puedes anclar este portal a la pantalla de inicio de tu celular.
            </span>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-[#883F9B] transition-colors"
            >
              ← Volver al sitio público de Dulce Paz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
