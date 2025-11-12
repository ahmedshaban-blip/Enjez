import React, { useState } from "react";

function DateRangeCalendar({ value, onChange }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const range = value || { start: null, end: null };
  const { start, end } = range;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const handlePrevMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleDayClick = (dayNumber) => {
    if (!dayNumber) return;
    const clicked = new Date(year, month, dayNumber);

    if (!start || (start && end)) {
      onChange({ start: clicked, end: null });
    } else {
      if (clicked < start) {
        onChange({ start: clicked, end: start });
      } else if (clicked.getTime() === start.getTime()) {
        onChange({ start: null, end: null });
      } else {
        onChange({ start, end: clicked });
      }
    }
  };

  const isInRange = (dayNumber) => {
    if (!dayNumber) return false;
    const d = new Date(year, month, dayNumber);
    if (!start) return false;
    if (!end) {
      return d.toDateString() === start.toDateString();
    }
    return d >= start && d <= end;
  };

  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex items-center p-1 justify-between">
        <button
          type="button"
          aria-label="Previous month"
          className="text-slate-700 flex size-10 items-center justify-center"
          onClick={handlePrevMonth}
        >
          <span className="material-symbols-outlined text-lg">
            chevron_left
          </span>
        </button>
        <p className="text-slate-900 text-base font-bold leading-tight">
          {monthLabel}
        </p>
        <button
          type="button"
          aria-label="Next month"
          className="text-slate-700 flex size-10 items-center justify-center"
          onClick={handleNextMonth}
        >
          <span className="material-symbols-outlined text-lg">
            chevron_right
          </span>
        </button>
      </div>

      <div className="grid grid-cols-7 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <p
            key={d}
            className="text-slate-400 text-xs font-bold h-10 flex items-center justify-center"
          >
            {d}
          </p>
        ))}

        {days.map((day, idx) => {
          if (!day) {
            return <div key={idx} className="h-10 w-full" />;
          }

          const selected = isInRange(day);
          const base =
            "h-10 w-full text-sm font-medium leading-normal flex items-center justify-center rounded-full";
          const className = selected
            ? `${base} bg-blue-600 text-white`
            : `${base} text-slate-700 hover:bg-blue-50`;

          return (
            <button
              key={idx}
              type="button"
              className={className}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DateRangeCalendar;
