import React from "react";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import NoticeBoard from "@/components/NoticeBoard";
import CoordinatorDirectory from "@/components/CoordinatorDirectory";
import { 
  Award, 
  Sparkles, 
  UserPlus, 
  IdCard, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Users, 
  Heart,
  Music,
  Coffee,
  Gift
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-red-950 to-slate-900 text-white pt-4 pb-8 sm:pt-6 sm:pb-10 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Milestone Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-2 sm:mb-3 shadow-md shadow-amber-500/10">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>১৯৭৬ - ২০২৬ • ৫০ বছরের গৌরবোজ্জ্বল ইতিহাস</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            <span className="block text-white">সুবর্ণ জয়ন্তী ও</span>
            <span className="block mt-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              প্রাক্তন শিক্ষার্থী পুনর্মিলনী
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            স্মৃতির মায়ায় আবার বাঁধিব সুর, ফিরে চল চিরচেনা সেই প্রিয় প্রাঙ্গণে। ৫০ বছর পূর্তির আনন্দ উৎসবে সকল প্রাক্তন শিক্ষার্থীদের প্রাণঢালা আমন্ত্রণ।
          </p>

          {/* Date & Location Pill */}
          <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              সম্ভাব্য তারিখ ২২ জানুয়ারী, ২০২৭
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              বিদ্যালয় মূল প্রাঙ্গণ ও অডিটোরিয়াম
            </span>
          </div>

          {/* Live Countdown Timer */}
          <div className="mt-3 sm:mt-4">
            <CountdownTimer />
          </div>

          {/* Call to Actions */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>অনলাইন রেজিস্ট্রেশন করুন</span>
            </Link>

            <Link
              href="/badge"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
            >
              <IdCard className="w-4 h-4 text-amber-400" />
              <span>ই-ব্যাজ / স্লিপ সংগ্রহ</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS & HIGHLIGHTS TICKER */}
      <section className="bg-amber-500 py-6 border-b border-amber-600 text-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <span className="block text-3xl sm:text-4xl font-black">৫০ বছর</span>
              <span className="text-xs sm:text-sm font-bold text-amber-950">গৌরব ও ঐতিহ্যের পদচিহ্ন</span>
            </div>
            <div className="p-2">
              <span className="block text-3xl sm:text-4xl font-black">১৯৭০-২০২৬</span>
              <span className="text-xs sm:text-sm font-bold text-amber-950">সকল ব্যাচের মিলনমেলা</span>
            </div>
            <div className="p-2">
              <span className="block text-3xl sm:text-4xl font-black">৩,০০০+</span>
              <span className="text-xs sm:text-sm font-bold text-amber-950">প্রত্যাশিত প্রাক্তন শিক্ষার্থী</span>
            </div>
            <div className="p-2">
              <span className="block text-3xl sm:text-4xl font-black">২ দিনব্যাপী</span>
              <span className="text-xs sm:text-sm font-bold text-amber-950">উৎসব ও সাংস্কৃতিক মেগা সন্ধ্যা</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT SCHEDULE & PERKS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              যা থাকছে সুবর্ণ জয়ন্তী উৎসবে
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              দুই দিনব্যাপী নানা বর্ণাঢ্য আয়োজন ও প্রাক্তন শিক্ষার্থীদের পুনর্মিলনের এক স্মরণীয় মুহূর্ত
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition group">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">বিশেষ স্মরণিকা কিট</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                প্রতিটি রেজিস্ট্রেশনের সাথে মানসম্মত কাস্টম সুবর্ণ জয়ন্তী টি-শার্ট, সুভেনির স্মারক ম্যাগাজিন, মেমেন্টো ক্রেস্ট ও প্রবেশ পাস আইডি কার্ড।
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition group">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">ঐতিহ্যবাহী গ্র্যান্ড বুফে</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                সকালের সুস্বাদু নাস্তা, চায়ের আড্ডা, মধ্যাহ্ন গ্র্যান্ড বুফে ভোজ এবং রাতে রাজকীয় ঐতিহ্যবাহী ডিনার ও মিষ্টিমুখ।
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">সাংস্কৃতিক মহোৎসব</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                আনন্দ র‍্যালি, প্রিয় শিক্ষকদের গুণীজন সম্মাননা, স্মৃতিচারণ পর্ব এবং দেশের খ্যাতনামা শিল্পী ও ব্যান্ডের সরাসরি সুরের মূর্ছনা।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NOTICE BOARD COMPONENT */}
      <NoticeBoard />

      {/* 5. COORDINATOR DIRECTORY */}
      <CoordinatorDirectory />

      {/* 6. REGISTRATION CALL TO ACTION BANNER */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-red-600 flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-amber-500/20">
            <Heart className="w-8 h-8 fill-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            আপনার ব্যাচের সাথে পুনর্মিলনীতে যুক্ত হতে আর দেরি কেন?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            রেজিস্ট্রেশন ফি মাত্র ১,০০০ টাকা। অনলাইনে ফর্ম পূরণ করে বিকাশ, নগদ বা রকেটে পেমেন্ট সম্পন্ন করুন এবং তাত্ক্ষণিক ডিজিটাল আইডি ব্যাজ সংগ্রহ করুন।
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black text-base shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition"
            >
              রেজিস্ট্রেশন সম্পন্ন করুন
            </Link>
            <Link
              href="/badge"
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-slate-700 text-slate-200 font-bold text-sm transition"
            >
              ইতোমধ্যে রেজিস্টার করেছেন? ব্যাজ চেক করুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
