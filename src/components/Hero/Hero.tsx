import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "../../hooks/useLanguage"
import { weddingData } from "../../data/wedding"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { content, lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      const img = imageRef.current
      const overlay = img?.querySelector(".overlay")
      const textChildren = textRef.current?.children

      if (img) {
        tl.fromTo(img,
          { scale: 1.15 },
          { scale: 1, duration: 2.5, ease: "power2.out" }
        )
      }
      if (overlay) {
        tl.fromTo(overlay,
          { opacity: 1 },
          { opacity: 0.4, duration: 2, ease: "power2.out" },
          0
        )
      }
      if (textChildren) {
        tl.fromTo(textChildren,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out" },
          0.8
        )
      }
    }, sectionRef)

    const imgRef = imageRef.current
    if (imgRef) {
      gsap.to(imgRef, {
        y: () => window.innerHeight * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      })
    }

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#FAF8F2]">
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <div className="w-full h-[120%] bg-cover bg-center" style={{ backgroundImage: `url(${weddingData.heroImage})` }} />
        <div className="overlay absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#FAF8F2]" />
      </div>

      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div>
          <span className="text-[#D4AF37] font-serif text-sm md:text-base tracking-[0.3em] uppercase">
            {content.hero.subtitle}
          </span>
        </div>

        <h1 className={`text-5xl md:text-8xl font-display text-white tracking-wide leading-tight mt-4 mb-2 ${lang === "ar" ? "font-serif" : "italic"}`}>
          {weddingData.groomName}
        </h1>
        <span className="text-[#D4AF37] text-3xl md:text-5xl font-light italic">&#38;</span>
        <h1 className={`text-5xl md:text-8xl font-display text-white tracking-wide leading-tight mt-2 ${lang === "ar" ? "font-serif" : "italic"}`}>
          {weddingData.brideName}
        </h1>

        <p className="text-white/80 font-serif text-lg md:text-xl tracking-wide mt-6">
          {content.hero.date}
        </p>

        <div className="absolute bottom-12">
          <p className="text-white/50 font-sans text-xs tracking-[0.2em] uppercase animate-bounce-subtle">
            {content.hero.scrollDown}
          </p>
          <div className="w-[1px] h-10 bg-white/30 mx-auto mt-2 animate-bounce-subtle" />
        </div>
      </div>
    </section>
  )
}
