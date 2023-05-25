import React, { useEffect } from "react";
import "../App.css";

function InputCoin({
  coin,
  onCoinChanged,
  setTimerIsActive,
  setTotal,
  total,
  timerCount,
  setTimerCount,
}) {
  useEffect(() => {
    setTotal(coin);
  }, [coin]);

  const onCoinInserted = (value) => {
    const newTotal = total + value;
    setTotal(newTotal);
    onCoinChanged(newTotal);
    setTimerIsActive(true);
    if (timerCount < 300 && timerCount !== 0) {
      setTimerCount(timerCount);
    } else {
      setTimerIsActive(true);
      setTimerCount(300); // 5 dakika (300 saniye)
    }
  };

  return (
    <>
      <div className="pay-box">{coin} Birim Para</div>
      <div className="coin-box">
        <div className="coin-outter" onClick={() => onCoinInserted(1)}>
          <p className="coin">1</p>
        </div>
        <div className="coin-outter" onClick={() => onCoinInserted(5)}>
          <p className="coin">5</p>
        </div>
        <div className="coin-outter" onClick={() => onCoinInserted(10)}>
          <p className="coin">10</p>
        </div>
        <div className="coin-outter" onClick={() => onCoinInserted(20)}>
          <p className="coin">20</p>
        </div>
      </div>
    </>
  );
}

export default InputCoin;
