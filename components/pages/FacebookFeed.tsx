"use client"

import { useEffect } from "react"

export function FacebookFeed() {
  useEffect(() => {
    // Evita cargar el SDK dos veces
    if (document.getElementById("facebook-jssdk")) return

    const script = document.createElement("script")
    script.id = "facebook-jssdk"
    script.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v20.0"
    script.async = true
    document.body.appendChild(script)

    ;(window as any).fbAsyncInit = function () {
      ;(window as any).FB?.init({ xfbml: true, version: "v20.0" })
    }
  }, [])

  // Cuando se renderiza/re-renderiza, vuelve a parsear el DOM
  useEffect(() => {
    ;(window as any).FB?.XFBML?.parse?.()
  })

  return (
    <div className="flex justify-center">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/NeumaticosAgricolaseIndustriales/"
        data-tabs="timeline"
        data-width="500"
        data-height="700" // ajusta este número para mostrar ~2 posts visibles
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
      />
    </div>
  )
}
