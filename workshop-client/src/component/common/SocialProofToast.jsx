import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // 1. Import useLocation
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { socialProofMessages } from "../data/socialProofData";

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const location = useLocation(); // 2. Initialize location hook

  useEffect(() => {
    // 3. Only start the timer if we are on the home page
    if (location.pathname !== "/") return;

    const showTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % socialProofMessages.length);
      setVisible(true);

      setTimeout(() => setVisible(false), 4500);
    }, 7000);

    return () => clearInterval(showTimer);
  }, [location.pathname]); // 4. Add pathname as a dependency

  // 5. If not on home page, don't render anything
  if (location.pathname !== "/") return null;

  const data = socialProofMessages[index];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 bg-white border border-primary/30 shadow-xl rounded-xl p-4 max-w-sm"
        >
          <div className="flex items-center gap-3">
            <div className="text-sm leading-tight flex-1">
              <p className="text-dark">
                <span className="font-semibold text-primary">{data.name}</span>{" "}
                {data.action}
              </p>
              <p className="text-xs text-muted mt-1">from {data.location}</p>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="ml-auto text-muted hover:text-dark shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
