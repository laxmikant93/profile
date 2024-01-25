import React, { useState } from "react";
function Detail2() {
  return (
    <div>
    <h3>laxmikantswain93@gmail.com</h3>
    <Detail3 />
    </div>
  )
}
function Detail() {
  return (
    <>
    <h2>9178628382</h2>
    <Detail2 />
    </>
  )
}
function Detail3() {
  return (
    <>
    <h4>Plot 1369 7621 Satyavihar bhubaneswar 10</h4></>
)}
function Home() {
const [value,setvalue] = useState(10);
const incrementvalue = () => {
  setvalue(value + 1);
  console.log(setvalue)
}
const decrementvalue = () => {
  setvalue(value - 1);
}
  return (
  <>
     <h1>Laxmikant Swain</h1>
     Currentvalue: <p>{value}</p>
     <button onClick={incrementvalue}>+</button>
     <button onClick={decrementvalue}>-</button>
   <Detail />
  </>
  )
}
export default Home;