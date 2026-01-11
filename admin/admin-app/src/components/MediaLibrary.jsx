import { useState } from "react";
import { Trash2 } from "lucide-react";

// src/components/MediaLibrary.jsx
export default function MediaLibrary({ onSelect, isPickerMode = false }) {
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      name: "React.jpg",
      type: "image",
    },
    // ... initial mock data
  ]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {mediaFiles.map((file) => (
        <div
          key={file.id}
          className="relative group rounded-xl overflow-hidden border"
        >
          <img src={file.url} className="h-32 w-full object-cover" />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            {isPickerMode ? (
              <button
                onClick={() => onSelect(file.url)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold"
              >
                Select Image
              </button>
            ) : (
              <button className="text-red-500 bg-white p-2 rounded-full">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
