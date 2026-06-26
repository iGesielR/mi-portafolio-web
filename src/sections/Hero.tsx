"use client";

import { Suspense } from "react";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useMediaQuery } from "react-responsive";

import HeroText from "@/components/HeroText";
import Loader from "@/components/Loader";
import ParallaxBackground from "@/components/ParallaxBackground";
import Stats from "@/components/Stats";
import Astronaut from "@/components/three/models/Astronaut";

export default function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    // biome-ignore lint/correctness/useUniqueElementIds: ID estable para anclaje (#home) y deep-link
    <section
      id="home"
      data-section="home"
      aria-label="Hero section"
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
    >
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.8} />
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.08 : 0.15}
                targetY={isMobile ? 0.23 : 0.41}
                position={isMobile ? [-0.13, -1.5, 0] : [2, 5.5, -2.0]}
                rotation={[Math.PI / 0.2, 3.8, 3.5]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 px-4 pb-[env(safe-area-inset-bottom)]">
        <Stats />
      </div>
    </section>
  );
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
  return null;
}
