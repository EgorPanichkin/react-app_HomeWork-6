import React, { useState, useEffect, useRef } from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(0);
  const [active, setActive] = useState(false)
  const [intervalValue, setIntervalValue] = useState(1000);
  const intervalRef = useRef();

  useEffect(() => {
    setActive(true)
    intervalRef.current = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
    }, intervalValue);

    return () => {
      clearInterval(intervalRef.current)
    };
  }, [intervalValue]);

  const handleStart= () => {
    setActive(!active)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      intervalRef.current = setInterval(() => {
        setCounter(prevCounter => prevCounter + 1);
      }, intervalValue);
    }
  };

  return (
    <div>
      <p>Счетчик: {counter}</p>
      <label>
        Интервал обновления (мс):
        <input type="number" value={intervalValue} onChange={e => setIntervalValue(e.target.value)} />
      </label>
      <button onClick={handleStart}>
        {active ? 'Стоп' : 'Старт'}
      </button>
    </div>
  );
};