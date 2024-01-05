// Pomodoro timer (pause, start, increment, decrement of break time & productivity time) in react with function.
import React, { useState, useEffect } from 'react';
import './PomorodoTimer.css';
import alarmSound from '../Sound/alert-alarm.mp3.mp3';

function PomodoroTimer(){
  const [breakTime, setBreakTime] = useState(5);
  const [productivityTime, setProductivityTime] = useState(25);

  // State for the timer
  const [timer, setTimer] = useState(productivityTime * 60);
  const [isActive, setIsActive] = useState(false);

  const alarmSoundMain = new Audio(alarmSound);
  alarmSoundMain.volume = 0.5;

  // Function to start or pause the timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setIsActive(false);
    setTimer(productivityTime * 60);
  };

  // Function to increment or decrement break time
  const adjustBreakTime = (amount) => {
    setBreakTime((prevTime) => Math.max(1, prevTime + amount));
  };

  // Function to increment or decrement productivity time
  const adjustProductivityTime = (amount) => {
    setProductivityTime((prevTime) => Math.max(1, prevTime + amount));
  };

  // Handle timer countdown
  useEffect(() => {
    let interval;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      // Switch between productivity and break time
      if (productivityTime > 0) {
        alarmSoundMain.play();
        //alert('Time to take a break!');
        setTimer(breakTime * 60);
        setProductivityTime(0);
      } else {
        alarmSoundMain.play();
        //alert('Time to get back to work!');
        setTimer(productivityTime * 60);
        setProductivityTime(breakTime);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timer, breakTime, productivityTime]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };
    return(
      <>
        <div className='pomorodo-timer'>
      <h1>Pomodoro Timer</h1>
      <div className='timing-details' id='timing-details'>
      <div>
        <p>Productivity Time: {productivityTime} minute(s)</p>
        <button onClick={() => adjustProductivityTime(-1)}>-</button>
        <button onClick={() => adjustProductivityTime(1)}>+</button>
      </div>
      <div>
        <p>Break Time: {breakTime} minute(s)</p>
        <button onClick={() => adjustBreakTime(-1)}>-</button>
        <button onClick={() => adjustBreakTime(1)}>+</button>
      </div>
      <div>
      <div className="timer-circle">
      <div className="progress"></div>
        <p>{formatTime(timer)}</p>
        </div>
        <div className="buttons">
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
        </div>
        </div>
      </div>
    </div>
    </>
    )
};

export default PomodoroTimer;