import React, { useRef, useState, useEffect, Children } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import scene from './assets/scene.glb'

export default function Car({ startCarAnimation, setStartCarAnimation }) {
  const car = useGLTF(scene);
  const groupRef = useRef();
  const [scale, setScale] = useState(4);

  useEffect(()=>{
    if(!startCarAnimation){
        setScale(4);
    }
  },[startCarAnimation])

  useFrame((state, delta) => {
    
    groupRef.current.position.z = scale;
    groupRef.current.position.y = -0.4;

    if (startCarAnimation) {
        const targetScale = -15;
        setScale((prevScale) => Math.max(prevScale - 0.25, targetScale));
        car.materials.tyres.map.rotation += 0.1; // Adjust the rotation value as needed
        
        if (scale <= targetScale) {
            setStartCarAnimation(false);
        }
    }
    
  });

  return (
    <group ref={groupRef} rotation={[0, Math.PI, 0]}>
      <ambientLight intensity={1} />
      <directionalLight intensity={10} position={[0, 10, 5]} color="white" />
      <primitive object={car.scene} />
    </group>
  );
}



