"use client";
import { motion } from "framer-motion";

export const ScrollReveal = ({ children, className = "", delay = 0, y = 50 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = "", delayChildren = 0.2, staggerChildren = 0.1 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren, delayChildren } },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "", y = 50 }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
};
