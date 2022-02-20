import React, { useEffect, useState } from "react";
import { getTimeUntil } from "../functions";

interface PropTypes {
  color: string;
}

export default function Countdown({ color }: PropTypes) {
  const [time, setTime] = useState([0, 0, 0]);

  const updateTime = () => {
    const [hours, mins, secs] = getTimeUntil();

    if (hours === 23 && mins === 59 && secs >= 55) window.location.reload();
    setTime([hours, mins, secs]);
  };

  useEffect(() => {
    setTime(getTimeUntil());
    setInterval(updateTime, 1000);
  }, []);

  return (
    <div className="countdown" style={{ color: color }}>
      {time[0] < 10 ? "0" + time[0] : time[0]}:
      {time[1] < 10 ? "0" + time[1] : time[1]}:
      {time[2] < 10 ? "0" + time[2] : time[2]}
    </div>
  );
}
