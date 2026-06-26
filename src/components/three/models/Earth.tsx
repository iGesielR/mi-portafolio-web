"use client";

import { Suspense, memo } from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import CanvasLoader from "@/components/Loader";
const Earth = memo(function Earth() {
  const earth = useGLTF("/models/planet/scene.gltf");
  return (
    <primitive object={earth.scene} scale={2.9} position-y={0} rotation-y={0} />
  );
});

useGLTF.preload("/models/planet/scene.gltf");

export default function EarthCanvas() {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      className="h-full w-full"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
