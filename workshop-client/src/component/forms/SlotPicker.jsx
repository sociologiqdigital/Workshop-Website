import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

// Mock slot data
const slotData = {
  "2025-12-25": [
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "12:00 PM", available: true },
  ],
  "2025-12-26": [
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: true },
  ],
};


export default function SlotPicker({ value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(value || null);

  const availableDates = Object.keys(slotData).map((date) => new Date(date));

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div className="space-y-4">
      {/* DATE PICKER */}
      <div className="rounded-xl border border-dark/10 bg-white p-4 shadow-sm">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={(date) =>
            !availableDates.some((d) => d.toDateString() === date.toDateString())
          }
          className="w-full"
        />
      </div>

    </div>
  );
}
