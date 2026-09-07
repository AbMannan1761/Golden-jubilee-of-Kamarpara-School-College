import React from "react";
import { EVENT_NOTICES } from "@/data/coordinators";
import { Bell, Calendar, DollarSign, Users, AlertCircle, Info, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function NoticeBoard() {
  return (
    <section id="notices" className="py-16 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-800 text-xs font-semibold mb-3 border border-red-200">
            <Bell className="w-3.5 h-3.5 text-red-600" />
            <span>জরুরী নোটিশ ও সময়সূচি</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            গুরুত্বপূর্ণ তথ্যাবলী ও উৎসব নির্দেশিকা
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            সুবর্ণ জয়ন্তী ও পুনর্মিলনীর যাবতীয় দিকনির্দেশনা এবং সময়সূচি
          </p>
        </div>

        {/* Notice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENT_NOTICES.map((notice) => {
            const isUrgent = notice.type === "urgent";
            const isHighlight = notice.type === "highlight";
            const isMeeting = notice.tagBn === "মিটিং" || notice.id === "notice-4";

            return (
              <div
                key={notice.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                  isUrgent
                    ? "bg-gradient-to-br from-red-50 to-orange-50/80 border-2 border-red-200 shadow-md shadow-red-500/5"
                    : isHighlight
                    ? "bg-gradient-to-br from-amber-50 to-yellow-50/80 border-2 border-amber-300 shadow-md shadow-amber-500/10"
                    : isMeeting
                    ? "bg-gradient-to-br from-blue-50 to-indigo-50/70 border-2 border-blue-400 shadow-md shadow-blue-500/10 ring-1 ring-blue-400/30"
                    : "bg-white border border-slate-200/90 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isUrgent
                          ? "bg-red-600 text-white"
                          : isHighlight
                          ? "bg-amber-600 text-white"
                          : isMeeting
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {notice.tagBn}
                    </span>
                    {isUrgent && <AlertCircle className="w-4 h-4 text-red-600" />}
                    {isHighlight && <Sparkles className="w-4 h-4 text-amber-600" />}
                    {isMeeting && <Calendar className="w-4 h-4 text-blue-600" />}
                    {!isUrgent && !isHighlight && !isMeeting && <Info className="w-4 h-4 text-slate-400" />}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {notice.titleBn}
                  </h3>

                  <div
                    className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg mb-3 shadow-2xs ${
                      isMeeting
                        ? "text-blue-900 bg-blue-100/90 border border-blue-200/80"
                        : "text-amber-800 bg-amber-100/80"
                    }`}
                  >
                    {notice.dateBn}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {notice.descriptionBn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>উদ্‌যাপন কমিটি</span>
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> সক্রিয়
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlights Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-red-900 via-amber-900 to-slate-900 p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
              <DollarSign className="w-6 h-6 text-amber-400" />
              রেজিস্ট্রেশন ফি ও সুবিধাসমূহ
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              মূল অ্যালামনাই ফি ১,০০০ টাকা। এর অন্তর্ভুক্ত রয়েছে: মানসম্মত সুবর্ণ জয়ন্তী বিশেষ টি-শার্ট, সুভেনির ম্যাগাজিন, আইডি ব্যাজ, ঐতিহ্যবাহী নাস্তা, লাঞ্চ/ডিনার ও সাংস্কৃতিক সন্ধ্যায় অংশগ্রহণ।
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-extrabold text-base shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            এখনই রেজিস্ট্রেশন করুন
          </Link>
        </div>
      </div>
    </section>
  );
}
