import React , { Suspense, useState ,useEffect} from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Timer from './Timer';

function App() {

  const [startCarAnimation, setStartCarAnimation] = useState(false)
  const [zPosition, setZPosition] = useState(0);

  return (
    <main >
      <Timer setStartCarAnimation={setStartCarAnimation}/>
      <Suspense fallback={null}>
          <Canvas shadows>
            <Scene startCarAnimation={startCarAnimation} setStartCarAnimation={setStartCarAnimation} zPosition={zPosition} setZPosition={setZPosition} />
          </Canvas>
      </Suspense>
    </main>
  );
}

export default App;
