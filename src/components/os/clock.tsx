"use client";

import { useState, useEffect } from 'react';

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-right text-xs px-3">
      <div>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      <div>{date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</div>
    </div>
  );
};

export default Clock;
