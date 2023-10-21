import React from 'react'
import '../styles/Loadder.css';
function Loadder({text}) {
  return (
    <div className="loading-box">
    <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div>{ text }</div>
</div>
  )
}

export default Loadder