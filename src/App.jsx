import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const targetDate = new Date("June 7, 2025 00:00:00").getTime();
  const [isEid, setIsEid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getInitialTime());

  function getInitialTime() {
    const now = new Date().getTime();
    const difference = targetDate - now;
    return calculateTime(difference);
  }

  function calculateTime(difference) {
    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days: formatTime(days),
      hours: formatTime(hours),
      minutes: formatTime(minutes),
      seconds: formatTime(seconds),
    };
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsEid(true);
        clearInterval(interval); // stop timer
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      } else {
        setTimeLeft(calculateTime(difference));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-green-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-8">
        Eid-ul-Azha Countdown
        <br />
        <span className="text-lg font-medium">
          On 7<sup>th</sup> June 2025
        </span>
      </h1>

      {isEid ? (
        <div className="text-3xl font-semibold text-green-700 bg-white p-6 rounded-xl shadow-lg">
          🎉 Eid-ul-Azha is here! 🎉
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-green-800">
            <div className="text-4xl font-bold">{timeLeft.days}</div>
            <div className="uppercase text-sm mt-2 font-medium">Days</div>
          </div>
          <div className="text-green-800">
            <div className="text-4xl font-bold">{timeLeft.hours}</div>
            <div className="uppercase text-sm mt-2 font-medium">Hours</div>
          </div>
          <div className="text-green-800">
            <div className="text-4xl font-bold">{timeLeft.minutes}</div>
            <div className="uppercase text-sm mt-2 font-medium">Minutes</div>
          </div>
          <div className="text-green-800">
            <div className="text-4xl font-bold">{timeLeft.seconds}</div>
            <div className="uppercase text-sm mt-2 font-medium">Seconds</div>
          </div>
        </div>
      )}

      <footer className="mt-10 text-gray-600 text-sm text-center">
        Made by <span className="font-semibold">Sajid Noor Muhammad</span>
      </footer>
    </div>
  );
}

export default App;
