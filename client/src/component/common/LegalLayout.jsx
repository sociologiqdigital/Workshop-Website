import React from "react";
import { motion } from "framer-motion";

const LegalLayout = ({ title, lastUpdated, children }) => {
  return (
    <div className="bg-background min-h-screen selection:bg-primary/20 font-body py-20">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="h-px w-8 bg-primary/30" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
              Legal Documentation
            </span>
            <span className="h-px w-8 bg-primary/30" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-dark mb-4">
            {title}
          </h1>
          <p className="text-muted text-sm italic">
            Last Updated: {lastUpdated}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="prose prose-stone max-w-none text-muted/90 leading-relaxed 
                     bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-dark/5 shadow-sm"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default LegalLayout;
