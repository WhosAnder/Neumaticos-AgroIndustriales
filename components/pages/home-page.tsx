"use client"

import Image from "next/image"
import Link from "next/link"

export function HomePage() {
  return (
    <main className="w-full flex flex-col font-sans">
      
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full h-[600px] lg:h-[700px] flex flex-col justify-center overflow-hidden">
        <Image
          src="/images/hero-background.png"
          alt="Neumáticos agrícolas e industriales para trabajo pesado."
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay idéntico al pencil, gradient or solid dark */}
        <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-6 px-6 lg:px-20 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-4xl tracking-tight">
            Neumáticos agrícolas e industriales<br className="hidden lg:block" />
            para trabajo pesado.
          </h1>
          <p className="text-lg lg:text-xl font-normal text-gray-300 leading-relaxed max-w-3xl">
            Soluciones integrales, robustas y duraderas para tractores, cosechadoras, montacargas, camiones y maquinaria pesada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/contacto"
              className="bg-[#D32F2F] hover:bg-[#b92828] text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-900/40 hover:shadow-red-900/60 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center"
            >
              Solicitar cotización
            </Link>
            <Link
              href="/categorias"
              className="bg-[#333333] hover:bg-[#222222] text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg shadow-black/40 hover:shadow-black/60 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ───────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] w-full px-6 lg:px-20 py-16 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-24 border-b border-[#1A1A1A]">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-bold text-[#D32F2F] leading-none">15+</span>
            <span className="text-xl lg:text-2xl font-bold text-white leading-none">años</span>
          </div>
          <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase mt-1">
            DE EXPERIENCIA COMPROBADA
          </p>
        </div>
        
        <div className="hidden lg:block w-[1px] h-12 bg-gray-800" />
        
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-bold text-[#D32F2F] leading-none">100%</span>
            <span className="text-xl lg:text-2xl font-bold text-white leading-none">robustos</span>
          </div>
          <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase mt-1">
            SOLUCIONES AGRÍCOLAS E INDUSTRIALES
          </p>
        </div>

        <div className="hidden lg:block w-[1px] h-12 bg-gray-800" />

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-bold text-[#D32F2F] leading-none">24/7</span>
            <span className="text-xl lg:text-2xl font-bold text-white leading-none">soporte</span>
          </div>
          <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase mt-1">
            ATENCIÓN ESPECIALIZADA
          </p>
        </div>
      </section>

      {/* ─── CATEGORÍAS ──────────────────────────────────────── */}
      <section className="bg-white w-full px-6 lg:px-20 py-24 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 w-full max-w-7xl">
          <p className="text-[#D32F2F] text-xs font-bold tracking-[0.2em] uppercase">
            NUESTROS PRODUCTOS
          </p>
          <h2 className="text-black text-3xl lg:text-5xl font-bold text-center tracking-tight">
            Soluciones específicas para su sector
          </h2>
          <p className="text-gray-500 text-lg text-center max-w-2xl mt-2">
            Ingeniería y durabilidad diseñadas para soportar las condiciones más extremas.
          </p>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {/* Agrícola */}
            <div className="bg-[#151515] flex flex-col w-full rounded-none">
              <div className="relative w-full h-[300px] bg-[#1A1A1A] border-b border-gray-800 flex items-center justify-center overflow-hidden">
                {/* Checkered pattern to replicate the image top half */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <Image
                  src="/images/agricultural-machinery-new.png"
                  alt="Neumáticos Agrícolas"
                  fill
                  className="object-cover object-center opacity-70"
                />
              </div>
              <div className="flex flex-col items-start p-10 lg:p-14 gap-6">
                <h3 className="text-white text-2xl lg:text-3xl font-bold">Neumáticos Agrícolas</h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Maximiza la tracción y minimiza la compactación del suelo. Diseñados para prolongar la vida útil de tractores y equipos de cosecha pesados.
                </p>
                <Link
                  href="/categorias/agricola"
                  className="bg-[#D32F2F] hover:bg-[#b92828] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-red-900/20 hover:shadow-red-900/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex justify-center items-center mt-4"
                >
                  Explorar catálogo agrícola <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
            
            {/* Industrial */}
            <div className="bg-[#151515] flex flex-col w-full rounded-none">
              <div className="relative w-full h-[300px] bg-[#1A1A1A] border-b border-gray-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <Image
                  src="/images/industrial-machinery.png"
                  alt="Neumáticos Industriales"
                  fill
                  className="object-cover object-center opacity-70"
                />
              </div>
              <div className="flex flex-col items-start p-10 lg:p-14 gap-6">
                <h3 className="text-white text-2xl lg:text-3xl font-bold">Neumáticos Industriales</h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Resistencia superior a cortes y desgaste para las condiciones más exigentes en construcción, minería y logística pesada.
                </p>
                <Link
                  href="/categorias/industrial"
                  className="bg-[#D32F2F] hover:bg-[#b92828] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-red-900/20 hover:shadow-red-900/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex justify-center items-center mt-4"
                >
                  Explorar catálogo industrial <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARCAS ─────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] w-full px-6 lg:px-20 py-24 flex flex-col items-center border-t border-gray-900">
        <div className="flex flex-col items-center gap-4 w-full max-w-7xl">
          <p className="text-[#D32F2F] text-xs font-bold tracking-[0.2em] uppercase">
            NUESTRAS MARCAS
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-bold text-center tracking-tight">
            Distribuidores multimarca
          </h2>

          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
            {[
              { id: "pirelli", name: "Pirelli", src: "/images/marcas/pirelli.png" },
              { id: "seba", name: "SEBA", src: "/images/marcas/seba.png" },
              { id: "goodyear", name: "Goodyear", src: "/images/marcas/goodyear.png" },
              { id: "eurogrip", name: "Eurogrip", src: "/images/marcas/eurogrip.png" },
              { id: "samson", name: "Samson", src: "/images/marcas/samson.png" },
              { id: "galaxy", name: "Galaxy", src: "/images/marcas/galaxy.png" },
              { id: "numa", name: "Numa", src: "/images/marcas/numa.png" },
            ].map((marca) => (
              <div key={marca.id} className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-800 hover:border-[#D32F2F] hover:-translate-y-2 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-red-900/10">
                <div className="relative w-full aspect-video flex-1 p-6 flex items-center justify-center bg-white">
                  {marca.src ? (
                    <Image 
                      src={marca.src} 
                      alt={`Logo ${marca.name}`} 
                      fill 
                      className="object-contain p-5 group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest text-center">
                      PENDIENTE
                    </span>
                  )}
                </div>
                <div className="bg-[#0A0A0A] p-4 text-center border-t border-gray-200">
                  <span className="text-white text-sm font-black uppercase tracking-widest group-hover:text-[#D32F2F] transition-colors">{marca.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIFERENCIADORES ─────────────────────────────────── */}
      <section className="bg-white w-full px-6 lg:px-20 py-24 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 w-full max-w-7xl">
          <p className="text-[#D32F2F] text-xs font-bold tracking-[0.2em] uppercase">
            NUESTRA PROMESA
          </p>
          <h2 className="text-black text-3xl lg:text-4xl font-bold text-center tracking-tight">
            ¿Por qué elegir Neumáticos Agroindustriales?
          </h2>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                n: "01",
                t: "Asesoría Técnica",
                d: "Garantice el retorno de inversión. Indicamos el rodamiento y compuesto exacto para su operación.",
              },
              {
                n: "02",
                t: "Alta Durabilidad",
                d: "Neumáticos probados en minería y campo asegurando resistencia extrema al desgaste y cortes.",
              },
              {
                n: "03",
                t: "Logística Exprés",
                d: "Surtimos urgente porque sabemos que sus equipos detenidos son pérdidas incosteables.",
              },
            ].map((item) => (
              <div key={item.n} className="bg-[#F9F9F9] rounded-none p-10 flex flex-col items-start gap-4">
                <span className="text-[#D32F2F] text-3xl font-bold leading-none mb-2">{item.n}</span>
                <h3 className="text-black text-xl font-bold leading-tight">{item.t}</h3>
                <p className="text-gray-500 text-sm font-normal leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIOS ─────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] w-full px-6 lg:px-20 py-24 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 w-full max-w-7xl">
          <p className="text-[#D32F2F] text-xs font-bold tracking-[0.2em] uppercase">
            NUESTROS CLIENTES
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-bold text-center tracking-tight">
            Confianza respaldada por la industria
          </h2>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {[
              {
                q: "La asesoría fue clave para nuestra flota. Redujimos costos operativos cambiando a las llantas correctas en menos tiempo de lo esperado.",
                n: "ROBERTO MARTÍNEZ",
                r: "Jefe de Flota, Logística S.A.",
                i: "RM",
              },
              {
                q: "Excelente atención y rapidez. Los neumáticos agrícolas llegaron justo para la temporada de cosecha, ahorrándonos miles en pérdida de tiempo.",
                n: "CARLOS SANTANA",
                r: "Productor Agrícola",
                i: "CS",
              },
            ].map((t) => (
              <div key={t.n} className="bg-[#151515] rounded-none p-10 lg:p-12 flex flex-col gap-8 border border-gray-800/50">
                <div className="flex gap-6">
                  <div className="w-[3px] bg-gray-600 flex-shrink-0" />
                  <p className="text-gray-300 text-base lg:text-lg font-normal leading-relaxed italic">
                    "{t.q}"
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{t.i}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold tracking-wide uppercase">{t.n}</span>
                    <span className="text-gray-500 text-xs">{t.r}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ───────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] w-full px-6 py-24 flex flex-col items-center border-t border-gray-900 border-b">
        <h2 className="text-white text-3xl lg:text-4xl font-bold text-center tracking-tight max-w-3xl mb-4 mt-8">
          ¿Listo para maximizar el rendimiento de tu maquinaria?
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-2xl mb-10">
          Nuestros expertos están listos para recomendarte la solución ideal para tus equipos.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mb-8 mt-4">
          <Link
            href="/contacto"
            className="bg-[#D32F2F] hover:bg-[#b92828] text-white text-base font-bold px-10 py-4 rounded-xl uppercase tracking-wider shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex justify-center items-center"
          >
            Contactar ahora
          </Link>
          <button
            onClick={() => window.open("https://wa.me/2221283294?text=Hola", "_blank")}
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-base font-bold px-10 py-4 rounded-xl uppercase tracking-wider shadow-lg shadow-green-900/20 hover:shadow-green-900/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex justify-center items-center"
          >
            WhatsApp
          </button>
        </div>
      </section>

    </main>
  )
}
