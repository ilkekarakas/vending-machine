import React, { useEffect } from "react";

const Timer = ({ timerIsActive, timerCount, setTimerCount }) => {
  useEffect(() => {
    let interval = null;
    if (timerIsActive) {
      interval = setInterval(() => {
        setTimerCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (!timerIsActive && timerCount !== 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerIsActive, timerCount, setTimerCount]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="timer-count-text">
      <h6>Kalan Süre: {formatTime(timerCount)}</h6>
    </div>
  );
};

export default Timer;
