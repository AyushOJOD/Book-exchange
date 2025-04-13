"use client"
import { motion, AnimatePresence } from "framer-motion";

export default function FadeWrapper({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}