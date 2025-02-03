"use client ";
import type React from "react";
import { motion } from "framer-motion";

interface DiscountBadgeProps {
  discountAmount: number;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discountAmount }) => {
  return (


    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative -top-5 self-start bg-red-500 text-white text-xs font-bold rounded-full h-12 w-12 flex items-center justify-center transform -translate-y-1/2 translate-x-1/2"
      >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
          className="p-[10px]"
          >
        {discountAmount}% OFF
      </motion.span>
    </motion.div>

  );
};

export default DiscountBadge;

