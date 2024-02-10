import React, { useRef,  useEffect } from "react";
import {  PerspectiveCamera } from "@react-three/drei";
import { useFrame,useLoader} from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export default function Scene({ startCarAnimation, setStartCarAnimation }) {
  
  const gltf = useLoader(GLTFLoader, '/assets/car/scene.gltf')
  const groupRef = useRef();
  const cameraRef = useRef();
  const targetPosition = -100;

  useEffect(()=>{
    groupRef.current.position.z = 0;
  },[startCarAnimation])

  useFrame((state, delta) => {
    if (startCarAnimation) {
        groupRef.current.position.z -= 1.5;
        gltf.materials.tyres.map.rotation += 0.1;

        if(groupRef.current.position.z <= targetPosition){
          setStartCarAnimation(false)
        }
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={30} position={[0, 0, 0.52]} />
      <group ref={groupRef}  position={[0, -0.9 , 0]} rotation={[0,Math.PI,0]} >
        <directionalLight intensity={8}  position={[0,0,1]}/>
        <ambientLight intensity={3}/>
        <primitive object={gltf.scene} />
      </group>
    </>

  );
}



