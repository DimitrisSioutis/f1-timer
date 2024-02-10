import React , {useState, useRef} from 'react'
import audio from '/assets/beep.mp3';

function Timer({ setStartCarAnimation}) {

  
  const background = 'radial-gradient(circle at center, #ff1900, rgba(219, 52, 52, 0.4))';

    const beep = new Audio(audio);

    const lights = new Array(5).fill('lights').map((light, index) => ({ classname: light, children: new Array(4).fill('light') }));
  
    const lightsRef = new Array(5).fill().map(() => new Array(4).fill(null).map(() => useRef()));
  
    const [reactionTime, setReactionTime] = useState(0);
    const [initialTime, setInitialTime] = useState(0);
    const [startTimer, setStartTimer] = useState(false);
    const [pointerEvents, setPointerEvents] = useState('auto');
  
    const min = 2000;
    const max = 4000;
    const [randomNum, setRandomNum] = useState(0);
  
  
    const openLights = () => {
      lightsRef.forEach((ref, index) => {
      setTimeout(() => {
            ref[2].current.style.background= background;
            ref[3].current.style.background = background;
            beep.play();
        }, 1000 * index);
      });
    };
  
    const closeLights = () => {
      lightsRef.forEach((ref, index) => {
        ref[2].current.style.background = 'none';
        ref[3].current.style.background = 'none';
      });
    };
  
    const onClick = () => {
      if (!startTimer) {                                                     //Initial click to start
        setStartCarAnimation(false);                                        //reset the car to its initial position
        openLights();                                                       //open the lights
        setRandomNum(Math.floor(Math.random() * (max - min + 1)) + min);    //random time b4 lights out
        setPointerEvents('none')

        setTimeout(() => {                                                  //wait for all the light to open                                       
          closeLights();                                                    //lights out
          setInitialTime(Date.now());                                       //set to true to use the onClick to measure time
          setPointerEvents('auto');
          setStartTimer(true);                                              //get the time the lights went out
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
    <>
      <div className='content-wrapper' onClick={onClick} style={{pointerEvents: pointerEvents}}>
            <div className='lights-container' >
                {lights.map((light, index) => (
                <div key={`light${index}`} className={light.classname}>
                    {light.children.map((child, childIndex) => (
                    <div key={childIndex} className={`${child}`} ref={lightsRef[index][childIndex]}></div>
                    ))}
                </div>
                ))}
            </div>
            <div className='timer-container' onClick={onClick}>
                <p className='timer'>
                {reactionTime}
                <span style={{ fontSize: '15px' }}>ms</span>
                </p>
                <p className='instruction'>{startTimer ? 'Click to Stop' : 'Click to Anywhere to Start'}</p>
            </div>

        </div>  
    </>

  )
}

export default Timer