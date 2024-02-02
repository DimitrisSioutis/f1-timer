import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import audio from './assets/beep.mp3';
import Car from './Car';

function App() {
  const beep = new Audio(audio);

  const lights = new Array(5)
    .fill('lights')
    .map((light, index) => ({ classname: light, children: new Array(4).fill('light') }));

  const lightsRef = new Array(5).fill().map(() => new Array(4).fill(null).map(() => useRef()));

  const [reactionTime, setReactionTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [startCarAnimation, setStartCarAnimation] = useState(false);
  const [maskIndex,setMaskIndex] = useState(-1);

  const min = 2000;
  const max = 5000;
  const [randomNum, setRandomNum] = useState(0);


  const openLights = () => {
    lightsRef.forEach((ref, index) => {
    setTimeout(() => {
          ref[2].current.style.backgroundColor = 'red';
          ref[3].current.style.backgroundColor = 'red';
          beep.play();
      }, 1000 * index);
    });
  };

  const closeLights = () => {
    lightsRef.forEach((ref, index) => {
      ref[2].current.style.backgroundColor = 'rgb(65, 65, 65)';
      ref[3].current.style.backgroundColor = 'rgb(65, 65, 65)';
    });
  };

  const onClick = () => {
    if (!startTimer) {                                                     //Initial click to start
      setStartCarAnimation(false);                                        //reset the car to its initial position
      openLights();                                                       //open the lights
      setMaskIndex(2);
      setRandomNum(Math.floor(Math.random() * (max - min + 1)) + min);    //random time b4 lights out

      setTimeout(() => {                                                  //wait for all the light to open                                       
        closeLights();                                                    //lights out
        setStartTimer(true);                                              //set to true to use the onClick to measure time
        setInitialTime(Date.now());                                       //get the time the lights went out
        setMaskIndex(-1);
      }, 5000 + randomNum);
    } 
    else {                                                                //click after lights out
      setReactionTime(Date.now() - initialTime);                          //calculate reaction time
      setStartCarAnimation(true);                                         //initiate car animation
      setStartTimer(false);                                               //revert back to false state
      setInitialTime(0);
      
    }
  };

  return (
    <main >
      <div className='mask' style={{zIndex:maskIndex}} ></div>
      <div className='content-wrapper' onClick={onClick}>
        <div className='lights-container' >
          {lights.map((light, index) => (
            <div key={`light${index}`} className={light.classname}>
              {light.children.map((child, childIndex) => (
                <div  className={`${child}`} ref={lightsRef[index][childIndex]}></div>
              ))}
            </div>
          ))}
        </div>
        <div className='timer-container'>
          <p className='timer'>
            {reactionTime}
            <span style={{ fontSize: '15px' }}>ms</span>
          </p>
          <p className='instruction'>{startTimer ? 'Click to Stop' : 'Click to Anywhere to Start'}</p>
        </div>
        <Canvas>
          <Car startCarAnimation={startCarAnimation} setStartCarAnimation={setStartCarAnimation} />
        </Canvas>
      </div>
    </main>
  );
}

export default App;
