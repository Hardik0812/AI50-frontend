import { useState, useEffect } from "react";

const useCountdown = (expires) => {
  const calculateTimeLeft = () => {
    const difference = expires * 1000 - Date.now();
    return difference > 0 ? Math.floor(difference / 1000) : 0;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft <= 0) {
        clearInterval(intervalId);
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expires]);

  return timeLeft;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return (
    <span className="text-customGreen underline">
      {minutes}:{remainingSeconds < 10 ? "0" : ""}
      {remainingSeconds}s
    </span>
  );
};

export { useCountdown, formatTime };
