'use client'
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SoftAurora from './SoftAurora';
const HeroSection = () => {

     const imageRef = useRef(null);

 useEffect(() => {
    const handleScroll = () => {
      const imageElement = imageRef.current;
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (!imageElement) return;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    
  return (
    <section className="w-full pt-36 md:pt-48 pb-10 relative overflow-hidden">
         <div className="absolute inset-0 w-full h-full z-0">
           <SoftAurora
             speed={0.6}
             scale={1.5}
             brightness={1}
             color1="#f7f7f7"
             color2="#e100ff"
             noiseFrequency={2.5}
             noiseAmplitude={1}
             bandHeight={0.5}
             bandSpread={1}
             octaveDecay={0.1}
             layerOffset={0}
             colorSpeed={1}
             enableMouseInteraction
             mouseInfluence={0.25}
           />
         </div>

         <div className="space-y-6 text-center relative z-10">

        <div className="space-y-6 mx-auto">
             <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-gray-400 via-gray-200 to-white "> AI Career Coach for 
                <br />
                Professional Success
            </h1>
                      <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>

              <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
            <Button size="lg" className="px-8">Get Started</Button></Link>

        </div>

         {/* <div className="hero-image-wrapper mt-5 md:mt-0 md:block hidden">
            <div ref={imageRef}>
                <Image
                    src={"/banner.png"}
                    width={1280}
                    height={720}
                    alt="Dashboard Preview"
                                  className="rounded-lg shadow-2xl border mx-auto"
              priority
                />
            </div>
        </div> */}
    </div>
</section>
  )
}

export default HeroSection