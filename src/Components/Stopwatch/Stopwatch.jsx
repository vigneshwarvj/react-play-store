import React, { useState, useEffect } from 'react';
import '../Stopwatch/Stopwatch.css';
import watchSound from '../Sound/clock-time-sound.mp3';
import Header from '../../Header';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const watchSoundMain = new Audio(watchSound);
  watchSoundMain.volume = 1.0;

  useEffect(() => {
    let interval;

    const handleAudioEnded = () => { //to play the sound, continously
      watchSoundMain.currentTime = 0;
      watchSoundMain.play();
    };

    watchSoundMain.addEventListener('ended', handleAudioEnded);

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      watchSoundMain.play(); // If timer starts, audio starts.
    } else {
      watchSoundMain.pause(); // Pause the sound, when time stop
      watchSoundMain.currentTime = 0; // Reset the sound to the beginning
    }
    return () => {
      clearInterval(interval);
      watchSoundMain.removeEventListener('ended', handleAudioEnded);
    }
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);

    // Pause the sound and reset to the beginning when resetting
    watchSoundMain.pause();
    watchSoundMain.currentTime = 0;
  };

  const addLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <>
    <Header/>
    <div className="stopwatch">
      <div className="timer">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={addLap} disabled={!isRunning}>
          Lap
        </button>
      </div>
      {laps.length > 0 && (
        <div className="laps">
          <h2>Lap(s)</h2>
          <table>
            <thead>
              <tr>
                <th>Lap</th>
                <th>Lap time</th>
                <th>Overall time</th>
              </tr>
            </thead>
            <tbody>
            {laps.map((lap, index, lapArray) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {index > 0 &&
                      formatTime(lap - lapArray[index - 1])}
                  </td>
                  <td>{formatTime(lap)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

const formatTime = (timeInMilliseconds) => {
  const minutes = Math.floor(timeInMilliseconds / 60000);
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
  const milliseconds = timeInMilliseconds % 1000;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0').slice(0, 2)}`;
};

export default Stopwatch;