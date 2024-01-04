import React, { useState } from 'react';
import '../NumbersCount/NumbersCount.css';
import Header from '../../Header';

function NumbersCount(){
const [counter, setCounter] = useState(1);
  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
     // > 1 ? counter - 1 : 1
    if(counter - 1 >= 0){
      setCounter(counter - 1);
    } else {
      alert("OOPS🫤 Counter cannot go below 0");
    }
  };

  return (
    <>
    <Header/>
    <div className='counter'>
      <h2>Let's Count Together! : {counter}</h2>
      <button onClick={handleIncrement}>Increase</button> &nbsp;
      <button onClick={handleDecrement}>Decrease</button>
    </div>
    </>
  );
}
export default NumbersCount;