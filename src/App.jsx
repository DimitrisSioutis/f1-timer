import React , { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import Timer from './Timer';

function App() {

  const [startCarAnimation, setStartCarAnimation] = useState(false)

  return (
    <main >
      <Timer setStartCarAnimation={setStartCarAnimation}/>
      <Suspense fallback={null}>
          <Canvas shadows>
            <Scene startCarAnimation={startCarAnimation} setStartCarAnimation={setStartCarAnimation} />
          </Canvas>
      </Suspense>
    </main>
  );
}

export default App;
