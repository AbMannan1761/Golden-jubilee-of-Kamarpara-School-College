"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Users, 
  CreditCard, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Check, 
  Sparkles, 
  DollarSign,
  Shirt,
  Calendar,
  Camera
} from "lucide-react";
import confetti from "canvas-confetti";
import { saveNewRegistration, toBengaliDigits, formatBDT } from "@/lib/storage";

export default function RegistrationForm() {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    fullNameBn: "",
    fullNameEn: "",
    batch: "2011",
    phone: "",
    email: "",
    profession: "",
    address: "",
    tShirtSize: "L" as "S" | "M" | "L" | "XL" | "XXL",
    guestCount: 0,
    guestNames: "",
    photoUrl: "",
    paymentMethod: "bkash" as "bkash" | "nagad" | "rocket",
    senderPhone: "",
    trxId: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Payment numbers (Official Committee Payment Wallets)
  const paymentNumbers = {
    bkash: "01711234567 (মার্চেন্ট / পার্সোনাল)",
    nagad: "01822334455 (পার্সোনাল)",
    rocket: "019112233448 (পার্সোনাল)",
  };

  const copyToClipboard = (text: string, type: string) => {
    const rawNumber = text.split(" ")[0];
    navigator.clipboard.writeText(rawNumber);
    setCopiedNumber(type);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  // Fee calculation: Base 1000 Tk + 500 Tk per guest
  const baseFee = 1000;
  const guestFeePerPerson = 500;
  const totalGuestFee = formData.guestCount * guestFeePerPerson;
  const totalFee = baseFee + totalGuestFee;

  // Handle Photo Upload
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setErrorMsg("ছবির আকার সর্বোচ্চ ৪ মেগাবাইট হতে পারবে।");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData((prev) => ({ ...prev, photoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Batches from 1970 to 2026
  const batches = Array.from({ length: 2026 - 1970 + 1 }, (_, i) => (2026 - i).toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validations
    if (!formData.fullNameBn.trim()) {
      setErrorMsg("অনুগ্রহ করে আপনার নাম বাংলায় লিখুন।");
      return;
    }
    if (!formData.fullNameEn.trim()) {
      setErrorMsg("অনুগ্রহ করে আপনার নাম ইংরেজিতে লিখুন।");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 11) {
      setErrorMsg("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।");
      return;
    }
    if (!formData.senderPhone.trim()) {
      setErrorMsg("যে নম্বর থেকে পেমেন্ট করেছেন তা উল্লেখ করুন।");
      return;
    }
    if (!formData.trxId.trim()) {
      setErrorMsg("পেমেন্টের Transaction ID (TrxID) প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);

    try {
      const savedRecord = saveNewRegistration({
        fullNameBn: formData.fullNameBn,
        fullNameEn: formData.fullNameEn,
        batch: formData.batch,
        phone: formData.phone,
        email: formData.email,
        profession: formData.profession,
        address: formData.address,
        tShirtSize: formData.tShirtSize,
        guestCount: Number(formData.guestCount),
        guestNames: formData.guestNames,
        baseFee,
        guestFee: totalGuestFee,
        totalFee,
        photoUrl: formData.photoUrl || photoPreview || undefined,
        paymentMethod: formData.paymentMethod,
        senderPhone: formData.senderPhone,
        trxId: formData.trxId.toUpperCase(),
      });

      // Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Redirect to Badge view
      setTimeout(() => {
        router.push(`/badge/${savedRecord.id}`);
      }, 1200);
    } catch {
      setErrorMsg("রেজিস্ট্রেশন সংরক্ষণে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl shadow-xl border border-amber-200/70 overflow-hidden">
        {/* Form Banner */}
        <div className="bg-gradient-to-r from-red-900 via-amber-800 to-red-900 p-6 sm:p-8 text-white relative">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              অনলাইন ফর্ম
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              অ্যালামনাই রেজিস্ট্রেশন ফরম
            </h1>
            <p className="text-amber-100/90 text-sm mt-1 max-w-2xl">
              সুবর্ণ জয়ন্তী ও পুনর্মিলনীতে অংশগ্রহণের জন্য নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন।
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-radial-gradient from-amber-500/10 to-transparent pointer-events-none" />
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Personal Details */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-4 border-b border-slate-200 gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600" />
                ১. ব্যক্তিগত পরিচিতি
              </h2>

              {/* Photo Upload Option (Positioned at top right) */}
              <label htmlFor="reg-photo-input" className="cursor-pointer group flex items-center gap-2.5 bg-amber-50/90 hover:bg-amber-100/90 border border-amber-300 px-3 py-1.5 rounded-xl shadow-xs transition select-none self-start sm:self-auto">
                <div className="relative w-10 h-10 rounded-lg bg-white border border-dashed border-amber-400 flex items-center justify-center overflow-hidden shrink-0 shadow-inner group-hover:border-amber-600">
                  {photoPreview ? (
                    <img src={photoPreview} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <Camera className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800 flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-amber-600" /> ছবি আপলোড
                    </span>
                    <span className="text-[9px] font-bold bg-amber-200 text-amber-900 px-1 py-0.2 rounded">অপশনাল</span>
                  </div>
                  {photoPreview ? (
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">✓ ছবি সিলেক্ট হয়েছে</span>
                  ) : (
                    <p className="text-[10px] text-slate-500 leading-none mt-0.5">পাসপোর্ট সাইজ ছবি</p>
                  )}
                </div>
                <input
                  id="reg-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  পুরো নাম (বাংলায়) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ আব্দুল্লাহ আল মামুন"
                  value={formData.fullNameBn}
                  onChange={(e) => setFormData({ ...formData, fullNameBn: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name (In English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Md. Abdullah Al Mamun"
                  value={formData.fullNameEn}
                  onChange={(e) => setFormData({ ...formData, fullNameEn: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  এসএসসি/উত্তীর্ণের ব্যাচ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none appearance-none"
                  >
                    {batches.map((b) => (
                      <option key={b} value={b}>
                        ব্যাচ {toBengaliDigits(b)} ({b})
                      </option>
                    ))}
                  </select>
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ইমেইল ঠিকানা (ঐচ্ছিক)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  বর্তমান পেশা / পদবি <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="যেমন: শিক্ষক / প্রকৌশলী / ব্যবসায়ী / শিক্ষার্থী"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  বর্তমান ঠিকানা ও জেলা <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="যেমন: বাড়ি #১২, রোড #০৫, ধানমন্ডি, ঢাকা"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Photo & T-Shirt & Guests */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
              <Shirt className="w-5 h-5 text-amber-600" />
              ২. ছবি, টি-শার্ট ও অতিথিদের সংখ্যা
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo Upload */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  প্রোফাইল ছবি (আইডি ব্যাজের জন্য)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-amber-400 transition shadow-sm">
                      <Upload className="w-3.5 h-3.5 text-amber-600" />
                      <span>ছবি আপলোড করুন</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                    <p className="text-[11px] text-slate-400 mt-1">
                      JPG/PNG, সর্বোচ্চ ৪ মেগাবাইট
                    </p>
                  </div>
                </div>
              </div>

              {/* T-Shirt Size */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  টি-শার্ট সাইজ নির্বাচন করুন <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(["S", "M", "L", "XL", "XXL"] as const).map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setFormData({ ...formData, tShirtSize: size })}
                      className={`py-2 rounded-xl text-sm font-bold transition-all ${
                        formData.tShirtSize === size
                          ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 scale-105"
                          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  পুনর্মিলনী কিটের সাথে এই সাইজের অফিশিয়াল স্মরণিকা টি-শার্ট প্রদান করা হবে।
                </p>
              </div>

              {/* Guests Counter & Dynamic Calculation */}
              <div className="md:col-span-2 bg-gradient-to-r from-amber-50 to-orange-50/50 p-5 rounded-2xl border border-amber-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      অতিরিক্ত পরিবার সদস্য / অতিথি সংখ্যা (জন প্রতি ৫০০ টাকা)
                    </label>
                    <p className="text-xs text-slate-500 mt-0.5">
                      স্ত্রী/স্বামী বা সন্তান সাথে আনতে চাইলে সংখ্যা নির্বাচন করুন।
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          guestCount: Math.max(0, prev.guestCount - 1),
                        }))
                      }
                      className="w-10 h-10 rounded-xl bg-white border border-amber-300 text-slate-800 font-bold text-lg flex items-center justify-center hover:bg-amber-100 transition shadow-sm"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-xl font-extrabold text-slate-900">
                      {toBengaliDigits(formData.guestCount)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          guestCount: Math.min(5, prev.guestCount + 1),
                        }))
                      }
                      className="w-10 h-10 rounded-xl bg-white border border-amber-300 text-slate-800 font-bold text-lg flex items-center justify-center hover:bg-amber-100 transition shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {formData.guestCount > 0 && (
                  <div className="mt-4 pt-3 border-t border-amber-200/60">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      অতিথিদের নাম ও সম্পর্ক (যদি থাকে)
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: স্ত্রী ও এক সন্তান"
                      value={formData.guestNames}
                      onChange={(e) => setFormData({ ...formData, guestNames: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-300 text-sm bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. Fee Breakdown & Payment Details */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
              <CreditCard className="w-5 h-5 text-amber-600" />
              ৩. ফি হিসাব ও পেমেন্ট বিবরণ
            </h2>

            {/* Fee summary card */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-xs text-slate-400">মোট পরিশোধ্য রেজিস্ট্রেশন ফি:</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-amber-400">
                    {formatBDT(totalFee)}
                  </span>
                  <span className="text-xs text-slate-300">
                    (মূল ফি: {formatBDT(baseFee)} + অতিথি: {formatBDT(totalGuestFee)})
                  </span>
                </div>
              </div>
              <div className="text-xs text-right bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                <p className="text-emerald-400 font-semibold">✓ উপহার ব্যাগ ও স্যুভনির</p>
                <p className="text-emerald-400 font-semibold">✓ গ্র্যান্ড বুফে ভোজ</p>
              </div>
            </div>

            {/* Payment Wallets */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-700">
                পেমেন্ট মাধ্যম নির্বাচন করুন ও নিচের নম্বরে সেন্ড মানি করুন:
              </label>

              <div className="grid grid-cols-3 gap-3">
                {(["bkash", "nagad", "rocket"] as const).map((method) => {
                  const isSelected = formData.paymentMethod === method;
                  return (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setFormData({ ...formData, paymentMethod: method })}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? "border-red-600 bg-red-50/80 shadow-md ring-2 ring-red-500/30"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <span className="capitalize font-bold text-sm text-slate-900">
                        {method === "bkash" ? "বিকাশ (bKash)" : method === "nagad" ? "নগদ (Nagad)" : "রকেট (Rocket)"}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                          নির্বাচিত
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Number Copy Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-amber-900 block">
                    {formData.paymentMethod === "bkash" ? "বিকাশ" : formData.paymentMethod === "nagad" ? "নগদ" : "রকেট"} নম্বর:
                  </span>
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    {paymentNumbers[formData.paymentMethod]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(paymentNumbers[formData.paymentMethod], formData.paymentMethod)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-amber-300 hover:bg-amber-100 text-xs font-bold text-slate-800 flex items-center gap-1.5 transition shadow-sm shrink-0"
                >
                  {copiedNumber === formData.paymentMethod ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-600" />
                      <span>নম্বর কপি</span>
                    </>
                  )}
                </button>
              </div>

              {/* Transaction Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    যে নম্বর থেকে টাকা পাঠিয়েছেন (Sender Mobile) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.senderPhone}
                    onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Transaction ID (TrxID) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: BKS99X21MN"
                    value={formData.trxId}
                    onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono uppercase focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submission Action */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              সাবমিট করার সাথে সাথেই আপনি আপনার ডিজিটাল আইডি ব্যাজ ও রেজিস্ট্রেশন স্লিপ পাবেন।
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-extrabold text-base shadow-lg shadow-amber-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>প্রক্রিয়াধীন...</span>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>রেজিস্ট্রেশন নিশ্চিত করুন</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
