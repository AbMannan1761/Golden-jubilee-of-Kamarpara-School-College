"use client";

import React, { useRef } from "react";
import { AlumniRegistration } from "@/types";
import { QRCodeSVG } from "qrcode.react";
import { 
  Printer, 
  Download, 
  CheckCircle2, 
  Clock, 
  Award, 
  User, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  Shirt, 
  Users,
  Share2
} from "lucide-react";
import { toBengaliDigits, formatBDT } from "@/lib/storage";

interface EBadgeCardProps {
  registration: AlumniRegistration;
}

export default function EBadgeCard({ registration }: EBadgeCardProps) {
  const badgeRef = useRef<HTMLDivElement>(null);

  const isVerified = registration.status === "verified";
  const queryParams = new URLSearchParams({
    name: registration.fullNameBn || "",
    en: registration.fullNameEn || "",
    batch: registration.batch || "",
    tshirt: registration.tShirtSize || "L",
    fee: registration.totalFee?.toString() || "1000",
    trx: registration.trxId || "",
    status: registration.status || "pending",
  });
  const verificationQrValue = typeof window !== "undefined"
    ? `${window.location.origin}/badge/${registration.id}?${queryParams.toString()}`
    : `https://abmannan1761.github.io/Golden-jubilee-of-Kamarpara-School-College/?badge=${registration.id}`;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `সুবর্ণ জয়ন্তী ই-ব্যাজ - ${registration.fullNameBn}`,
        text: `আমার সুবর্ণ জয়ন্তী ও প্রাক্তন শিক্ষার্থী পুনর্মিলনী রেজিস্ট্রেশন স্লিপ। আইডি: ${registration.id}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("ব্যাজের লিংক ক্লিপবোর্ডে কপি করা হয়েছে!");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 px-4">
      {/* Action bar (No print) */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            রেজিস্ট্রেশন স্ট্যাটাস
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {isVerified ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> ফি অনুমোদিত (Verified)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> যাচাইকরণ প্রক্রিয়াধীন (Pending)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            title="শেয়ার করুন"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">শেয়ার</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-extrabold shadow-sm transition"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট / PDF সংরক্ষণ</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE BADGE */}
      <div
        id="printable-badge"
        ref={badgeRef}
        className="relative bg-white rounded-3xl overflow-hidden border-4 border-amber-500/80 shadow-2xl transition-all"
      >
        {/* Lanyard Hole Mockup */}
        <div className="w-16 h-3 bg-slate-200 rounded-full mx-auto mt-3 border border-slate-300" />

        {/* Badge Header with Festive Royal Red & Gold */}
        <div className="bg-gradient-to-r from-red-900 via-amber-700 to-red-900 text-white pt-4 pb-6 px-6 text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-amber-300 flex items-center justify-center mb-1.5 shadow-md">
              <Award className="w-7 h-7 text-amber-300" />
            </div>
            <h2 className="text-xl font-black tracking-wide text-amber-200">
              সুবর্ণ জয়ন্তী ও প্রাক্তন শিক্ষার্থী পুনর্মিলনী
            </h2>
            <p className="text-[11px] text-amber-100 font-medium">
              Golden Jubilee & Grand Alumni Reunion • 50 Years
            </p>
            <div className="inline-block mt-2 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black tracking-wider uppercase">
              অফিশিয়াল প্রবেশপত্র / Delegate Pass
            </div>
          </div>

          {/* Shimmer line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200" />
        </div>

        {/* Badge Body */}
        <div className="p-6 text-center">
          {/* Profile Photo */}
          <div className="relative -mt-14 mb-4 inline-block">
            <div className="w-28 h-28 rounded-2xl bg-white p-1.5 border-4 border-amber-400 shadow-xl overflow-hidden mx-auto">
              {registration.photoUrl ? (
                <img
                  src={registration.photoUrl}
                  alt={registration.fullNameBn}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>
            <span className="absolute bottom-0 right-0 bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow border border-white">
              {registration.tShirtSize} Size
            </span>
          </div>

          {/* Attendee Name & Batch */}
          <h3 className="text-2xl font-black text-slate-900 leading-tight">
            {registration.fullNameBn}
          </h3>
          <p className="text-sm font-semibold text-slate-600 mt-0.5">
            {registration.fullNameEn}
          </p>

          <div className="my-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-black text-base border border-amber-300">
            <span>এসএসসি ব্যাচ:</span>
            <span className="text-xl text-red-700">{toBengaliDigits(registration.batch)}</span>
            <span className="text-xs text-amber-700">({registration.batch})</span>
          </div>

          <p className="text-xs font-semibold text-slate-600">
            {registration.profession} • {registration.address}
          </p>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-bold block">রেজিস্ট্রেশন নম্বর</span>
              <span className="font-mono font-black text-slate-900 text-sm">{registration.id}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold block">অতিথি সংখ্যা</span>
              <span className="font-bold text-slate-900">
                {registration.guestCount > 0
                  ? `${toBengaliDigits(registration.guestCount)} জন সদস্য`
                  : "একক"}
              </span>
            </div>
            <div className="text-left pt-2 border-t border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold block">পরিশোধিত ফি</span>
              <span className="font-bold text-emerald-700">{formatBDT(registration.totalFee)}</span>
            </div>
            <div className="text-right pt-2 border-t border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold block">TrxID / পেমেন্ট</span>
              <span className="font-mono text-slate-700 text-[11px]">{registration.trxId}</span>
            </div>
          </div>

          {/* Gate Check-in QR Code */}
          <div className="mt-5 p-4 rounded-2xl bg-white border-2 border-dashed border-amber-400 inline-flex flex-col items-center">
            <QRCodeSVG
              value={verificationQrValue}
              size={120}
              level="H"
              includeMargin={false}
            />
            <span className="text-[10px] text-slate-500 font-mono mt-2 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              গেট ভেরিফিকেশন কোড: {registration.id}
            </span>
          </div>

          {/* Event Venue & Date footer */}
          <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-600" /> ২২ ও ২৩ জানুয়ারি
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-600" /> বিদ্যালয় অডিটোরিয়াম
            </span>
          </div>
        </div>

        {/* Security Barcode line mockup */}
        <div className="bg-slate-900 py-2 px-4 text-center">
          <p className="text-[10px] text-amber-400/90 font-mono tracking-widest">
            ★ GOLDEN JUBILEE CELEBRATION 50 YEARS DELEGATE CARD ★
          </p>
        </div>
      </div>
    </div>
  );
}
