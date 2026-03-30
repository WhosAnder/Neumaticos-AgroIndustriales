"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, MessageCircle, ArrowRight, Grid2X2, ShieldCheck } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/categorias", label: "Categorías" },
    { href: "/servicios", label: "Servicios" },
    { href: "/contacto", label: "Contacto" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  return (
    <>
      <header className="bg-white p-4 flex items-center justify-between w-full border-b border-gray-100 relative z-40">
        <div className="flex items-center gap-3 px-4 md:px-8 lg:px-16 xl:px-24">
          <Link href="/" className="focus:outline-none">
            <Image
              src="/images/logo-horizontal.png"
              alt="Neumáticos Agroindustriales Logo"
              width={280}
              height={80}
              className="h-14 w-auto cursor-pointer hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
        <div className="px-4 md:px-8 lg:px-16 xl:px-24 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-6 py-2 font-medium inline-flex items-center justify-center text-sm ${
                  isActive(item.href)
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-4 bg-[#D32F2F] hover:bg-[#b92828] text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md hover:shadow-red-900/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Solicitar cotización
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white p-4 shadow-lg absolute w-full z-30 flex flex-col">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-6 py-3 font-medium text-left ${
                  isActive(item.href)
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-[1px] bg-gray-100 my-2 w-full" />
            <button
              onClick={() => {
                setIsMenuOpen(false)
                setIsModalOpen(true)
              }}
              className="w-full bg-[#D32F2F] hover:bg-[#b92828] text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-[0.98]"
            >
              Solicitar cotización
            </button>
          </nav>
        </div>
      )}

      {/* ─── MODAL PREMIUM DE COTIZACIÓN ─────────────────────── */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Contenedor Flex Dos Columnas */}
          <div 
            className="w-full max-w-[850px] flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-800"
            onClick={(e) => e.stopPropagation()} 
            role="dialog"
            aria-modal="true"
          >
            {/* ── Panel Izquierdo Oscuro (Promesa de Marca) ── */}
            <div className="md:w-2/5 md:min-h-[480px] bg-[#0A0A0A] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
              {/* Patrón Grid de fondo (Estilo industrial) */}
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700" 
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
              />
              
              <div className="relative z-10 flex flex-col gap-6 h-full">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-[#D32F2F]" />
                  <span className="text-white font-bold tracking-widest text-sm uppercase">Soporte 24/7</span>
                </div>
                
                <div className="mt-8 md:mt-auto flex flex-col">
                  <h4 className="text-white text-3xl font-black leading-tight mb-4 tracking-tight">
                    La fuerza de tu maquinaria empieza aquí.
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Más de 15 años equipando al sector agrícola e industrial con las marcas más resistentes del mercado. Contamos con inventario inmediato.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Panel Derecho Blanco (Acciones UI) ── */}
            <div className="md:w-3/5 bg-white p-8 md:p-12 relative flex flex-col justify-center">
              {/* Botón Cerrar "X" Absoluto */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black hover:bg-gray-100 p-2 rounded-full transition-colors z-10"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="text-3xl font-black text-black tracking-tight leading-tight">
                  ¿Qué necesitas cotizar?
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
                  Selecciona la opción más rápida para contactarnos o sigue explorando nuestro catálogo.
                </p>
              </div>

              {/* Botones de Acción Múltiples */}
              <div className="flex flex-col gap-3 mt-8 relative z-10">
                
                {/* 1. Acción Principal: WhatsApp */}
                <button 
                  onClick={() => {
                    window.open("https://wa.me/2221283294?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20para%20neumáticos.", "_blank")
                    setIsModalOpen(false)
                  }}
                  className="group w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-base md:text-lg font-bold p-4 md:p-5 rounded-xl shadow-lg hover:shadow-green-900/20 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6" />
                    <span>Whatsapp urgente</span>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                </button>

                {/* 2. Acción Secundaria: Llamada Directa */}
                <button 
                  onClick={() => {
                    window.open("tel:2221283294", "_self")
                    setIsModalOpen(false)
                  }}
                  className="group w-full bg-white border-2 border-gray-200 hover:border-black text-black text-sm md:text-base font-bold p-4 rounded-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
                    <span>Llamar a un asesor experto</span>
                  </div>
                </button>
                
                {/* Separador visual elegante */}
                <div className="flex py-2 items-center justify-center opacity-60">
                  <div className="w-12 border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">O TAMBIÉN PUEDES</span>
                  <div className="w-12 border-t border-gray-300"></div>
                </div>

                {/* 3. Acción de Navegación: Categorías */}
                <Link 
                  href="/categorias"
                  onClick={() => setIsModalOpen(false)}
                  className="group w-full bg-[#151515] hover:bg-black text-white text-sm md:text-base font-bold p-4 rounded-xl shadow-md hover:shadow-black/20 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 text-center"
                >
                  <Grid2X2 className="w-5 h-5 opacity-70" />
                  Explorar catálogo de categorías
                </Link>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
