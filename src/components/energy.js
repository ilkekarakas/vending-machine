import React from "react";
import "../App.css";
import Temperature from "../components/temperature";

function Energy({ energy, setEnergy, temperature, setTemperature, setMessage }) {

  return (
    <>
      <Temperature temperature={temperature} setTemperature={setTemperature} energy={energy} setEnergy={setEnergy} setMessage={setMessage} />
      <div className="energy-box">
        <div className="energy-text">Harcanan Enerji: {energy.toFixed(2)}</div>
      </div>
    </>
  );
}

export default Energy;
