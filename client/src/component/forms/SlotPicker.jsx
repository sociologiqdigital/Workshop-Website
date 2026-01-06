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
  const [selectedDate, setSelectedDate] = useState(value?.date || null);
  const [selectedSlot, setSelectedSlot] = useState(value?.time || "");

  const availableDates = Object.keys(slotData).map((date) => new Date(date));

  const slotsForSelectedDate =
    selectedDate && slotData[format(selectedDate, "yyyy-MM-dd")];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot("");
    onChange({ date, time: "" });
  };

  const handleSlotSelect = (time) => {
    setSelectedSlot(time);
    onChange({ date: selectedDate, time });
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

      {/* TIME SLOTS */}
      {slotsForSelectedDate && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slotsForSelectedDate.map((slot) => (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.available}
              onClick={() => handleSlotSelect(slot.time)}
              className={`w-full px-4 py-2 rounded-lg text-sm border text-left
                ${
                  slot.available
                    ? "border-primary text-primary hover:bg-primary/10"
                    : "border-gray-200 text-gray-400 cursor-not-allowed"
                }
                ${selectedSlot === slot.time ? "bg-primary text-white" : ""}
              `}
            >
              {slot.time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
