"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";

interface SaleBannerClientProps {
  validUntil: string;
}

export default function SaleBannerClient({
  validUntil,
}: SaleBannerClientProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(validUntil);
      const difference = end.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [validUntil]);

  const timeUnits = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
    { label: "Seconds", value: timeLeft?.seconds },
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 mr-2 text-slate-600" />
            <span className="text-lg font-semibold text-slate-600">
              Time Left:
            </span>
          </div>
          <div className="flex justify-center space-x-4">
            <AnimatePresence>
              {timeLeft ? (
                timeUnits.map(({ label, value }) => (
                  <motion.div
                    key={label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="text-center"
                  >
                    <Badge
                      variant="outline"
                      className="text-2xl font-bold px-3 py-2"
                    >
                      {value?.toString().padStart(2, "0")}
                    </Badge>
                    <p className="text-xs mt-1 text-gray-600">{label}</p>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    Sale Ended
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

