import React from "react";
import Link from "next/link";
import { Award, Phone, Mail, MapPin, Heart, Shield, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 border-t-4 border-amber-500 relative overflow-hidden">
      {/* Background festive glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">সুবর্ণ জয়ন্তী উৎসব</h3>
                <p className="text-xs text-amber-400">৫০ বছর পূর্তি ও পুনর্মিলনী</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              প্রিয় প্রাঙ্গণে আবার ফিরি স্মৃতির টানে। ৫০ বছরের সোনালী অতীত উদযাপন ও প্রাক্তন শিক্ষার্থীদের এক মহামিলনমেলা।
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              রেজিস্ট্রেশন চলছে (৩১ ডিসেম্বর পর্যন্ত)
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4 border-l-2 border-amber-400 pl-3">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/register" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> অনলাইন রেজিস্ট্রেশন ফরম
                </Link>
              </li>
              <li>
                <Link href="/badge" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> ই-ব্যাজ ও স্লিপ ডাউনলোড
                </Link>
              </li>
              <li>
                <Link href="/#coordinators" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> ব্যাচ সমন্বয়ক তালিকা
                </Link>
              </li>
              <li>
                <Link href="/#notices" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> নোটিশ বোর্ড ও ইভেন্ট রুটিন
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>›</span> অ্যাডমিন কন্ট্রোল প্যানেল
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Fee & Payment Help */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4 border-l-2 border-amber-400 pl-3">
              ফি ও বিকাশ/নগদ হেল্পলাইন
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1">
                <p className="text-amber-300 font-semibold">মূল রেজিস্ট্রেশন ফি: ১,০০০ টাকা</p>
                <p className="text-slate-300">অতিথি প্রতি: ১,০০০ টাকা (টি-শার্ট ব্যতীত)</p>
                <p className="text-slate-400">শিক্ষার্থীদের জন্য স্মরণিকা টি-শার্ট ও সবার জন্য গ্র্যান্ড বুফে খাবার অন্তর্ভুক্ত</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>হেল্পলাইন: ০১৭১১-২৩৪৫৬৭, ০১৮২২-৩৩৪৪৫৫</span>
              </div>
            </div>
          </div>

          {/* Col 4: Event Location */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4 border-l-2 border-amber-400 pl-3">
              অনুষ্ঠানস্থল ও সময়
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>বিদ্যালয় মূল প্রাঙ্গণ ও অডিটোরিয়াম</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md font-semibold border border-amber-500/30">
                  সম্ভাব্য তারিখ ২২ জানুয়ারী, ২০২৭
                </span>
              </div>
              <p className="text-xs text-slate-400 pt-2">
                সকাল ৮:৩০ টা থেকে রাত ৯:০০ টা পর্যন্ত বর্ণাঢ্য আয়োজন।
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© সুবর্ণ জয়ন্তী ও রি-ইউনিয়ন উদ্‌যাপন কমিটি। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1 text-slate-400">
            স্মৃতির বন্ধনে <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5" /> ৫০ বছরের মিলনমেলা
          </p>
        </div>
      </div>
    </footer>
  );
}
