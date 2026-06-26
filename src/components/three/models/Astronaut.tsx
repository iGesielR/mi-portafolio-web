"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { type ThreeElements, useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import type { AnimationClip, Group } from "three";

type AstronautProps = ThreeElements["group"] & {
  initialY?: number;
  targetY?: number;
};

interface GLTFResult {
  scene: Group;
  animations: AnimationClip[];
}

export default function Astronaut({
  initialY = 5,
  targetY = -1,
  rotation,
  scale,
  position,
  ...rest
}: AstronautProps) {
  const group = useRef<Group>(null);

  const { scene, animations } = useGLTF(
    "/models/astronaut.glb"
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  // Animación del GLB (si trae clips)
  useEffect(() => {
    if (animations && animations.length > 0) {
      const first = animations[0].name;
      const act = actions[first];
      act?.reset().play();
      return () => {
        act?.stop();
      };
    }
    return;
  }, [actions, animations]);

  const y = useMotionValue(initialY);
  const ySpring = useSpring(y, { damping: 30, stiffness: 100, mass: 1.2 });

  useEffect(() => {
    ySpring.set(targetY);
  }, [targetY, ySpring]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = ySpring.get();
    }
  });

  const defaultRotation: [number, number, number] = [-Math.PI / 2, -0.2, 2.2];
  const defaultScale: number = 0.3;
  const defaultPosition: [number, number, number] = [1.3, -1, 0];

  const rotationProp = (rotation ?? defaultRotation) as [
    number,
    number,
    number
  ];
  const scaleProp = (scale ?? defaultScale) as
    | number
    | [number, number, number];
  const positionProp = (position ?? defaultPosition) as [
    number,
    number,
    number
  ];

  return (
    <group
      ref={group}
      rotation={rotationProp}
      scale={scaleProp}
      position={positionProp}
      dispose={null}
      {...rest}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/astronaut.glb");
