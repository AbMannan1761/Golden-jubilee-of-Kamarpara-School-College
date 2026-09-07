"use client";

import React, { useState, useEffect } from "react";
import { toBengaliDigits } from "@/lib/storage";
import { Clock, Calendar, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Target: January 22, 2027
  const targetDate = new Date("2027-01-22T09:00:00+06:00").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { labelBn: "দিন", labelEn: "Days", value: timeLeft.days },
    { labelBn: "ঘণ্টা", labelEn: "Hours", value: timeLeft.hours },
    { labelBn: "মিনিট", labelEn: "Minutes", value: timeLeft.minutes },
    { labelBn: "সেকেন্ড", labelEn: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-2 sm:my-3 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900/95 via-red-950/90 to-slate-900/95 border-2 border-amber-500/40 shadow-xl backdrop-blur-xl relative overflow-hidden">
      {/* Background festive ambient glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-500/15 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2 sm:mb-3">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>মহাউৎসবের ক্ষণগণনা (২২ ও ২৩ জানুয়ারি)</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
          {units.map((unit, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-white/5 border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-inner group"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white group-hover:scale-105 transition-transform">
                {isClient ? toBengaliDigits(unit.value.toString().padStart(2, "0")) : "--"}
              </span>
              <span className="text-xs font-bold text-amber-400 mt-0.5">
                {unit.labelBn}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium hidden sm:inline-block">
                {unit.labelEn}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[11px] sm:text-xs text-slate-300 mt-2 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>দিনটি স্মৃতির পাতায় অমর করে রাখতে দ্রুত রেজিস্ট্রেশন সম্পন্ন করুন</span>
        </p>
      </div>
    </div>
  );
}
