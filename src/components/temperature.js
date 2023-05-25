import React from "react";
import "../App.css";

function Temperature({
  temperature,
  setTemperature,
  energy,
  setMessage,
  setEnergy,
}) {
  // * Derece sabit 20'de başlar. 16-24 arasında değiştirilebilir. 20 oda sıcaklığı olarak kabul edilir. Dereceyi her arttırıp/azaltıldığında
  // * tüketilen enerji 0.5 artar/azalır.
  // * Enerjinin 5'den büyük bir değere gelememesi için engel konulmuştur.
  
  const increaseTemperature = () => {
    if (temperature < 24) {
      if (temperature > 19.5) {
        const newEnergy = energy + 0.5;
        if (newEnergy > 5) {
          setMessage(
            "Makine güç tüketimi fazla olduğu için bu özelliği kullanamazsınız."
          );
        } else {
          setTemperature(temperature + 1);
          setEnergy(newEnergy);
        }
      } else {
        const newEnergy = energy - 0.5;
        if (newEnergy > 5) {
          setMessage(
            "Makine güç tüketimi fazla olduğu için bu özelliği kullanamazsınız."
          );
        } else {
          setTemperature(temperature + 1);
          setEnergy(newEnergy);
        }
      }
    }
  };

  const decreaseTemperature = () => {
    if (temperature > 16) {
      if (temperature > 20) {
        const newEnergy = energy - 0.5;
        if (newEnergy > 5) {
          setMessage(
            "Makine güç tüketimi fazla olduğu için bu özelliği kullanamazsınız."
          );
        } else {
          setTemperature(temperature - 1);
          setEnergy(newEnergy);
        }
      } else {
        const newEnergy = energy + 0.5;
        if (newEnergy > 5) {
          setMessage(
            "Makine güç tüketimi fazla olduğu için bu özelliği kullanamazsınız."
          );
        } else {
          setTemperature(temperature - 1);

          setEnergy(newEnergy);
        }
      }
    }
  };

  return (
    <>
      <div className="temprature-plus" onClick={increaseTemperature}>
        +
      </div>
      <div className="temprature-minus" onClick={decreaseTemperature}>
        -
      </div>
      <div className="temprature-box">{temperature}°C</div>
    </>
  );
}

export default Temperature;
