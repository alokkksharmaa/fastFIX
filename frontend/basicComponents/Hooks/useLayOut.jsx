import React, { useEffect, useState } from 'react'

const useLayOut = () => {
  const [number , setNumber] = useState(0);
    
    useEffect( () =>  {
      console.log(`I am useEffect ${number}`);
    },[number]);

  return (
    <div>
      <h1>Number: {number}</h1>
      <input type='number' value={number} onChange={(e) => setNumber(Number(e.target.value))} />
    </div>
  )
}

export default useLayOut;