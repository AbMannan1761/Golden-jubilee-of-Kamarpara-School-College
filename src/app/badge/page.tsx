"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, IdCard, ArrowRight, UserCheck, Phone, AlertCircle, ArrowLeft } from "lucide-react";
import { getStoredRegistrations, toBengaliDigits } from "@/lib/storage";
import { AlumniRegistration } from "@/types";

export default function BadgeSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AlumniRegistration[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    const list = getStoredRegistrations();
    const filtered = list.filter((r) => {
      return (
        r.id.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.senderPhone.includes(q) ||
        r.trxId.toLowerCase().includes(q) ||
        r.fullNameBn.toLowerCase().includes(q) ||
        r.fullNameEn.toLowerCase().includes(q)
      );
    });

    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="min-h-[85vh] py-12 bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-700 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মূল পাতায় ফিরে যান</span>
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-lg text-center mb-8">
          <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <IdCard className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            ই-ব্যাজ ও রেজিস্ট্রেশন স্লিপ খুঁজুন
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            আপনার রেজিস্ট্রেশন আইডি (যেমন: SJ-2026-1001), মোবাইল নম্বর অথবা TrxID লিখে স্লিপটি বের করুন।
          </p>

          <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="মোবাইল নম্বর / রেজিস্ট্রেশন আইডি লিখুন..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 outline-none font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-md transition shrink-0"
            >
              অনুসন্ধান করুন
            </button>
          </form>
        </div>

        {/* Results section */}
        {searched && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-600 px-1">
              খুঁজে পাওয়া ফলাফল ({toBengaliDigits(results.length)} টি):
            </h2>

            {results.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">কোনো তথ্য পাওয়া যায়নি!</p>
                <p className="text-xs text-slate-400 mt-1">
                  অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর বা রেজিস্ট্রেশন আইডি দিয়ে পুনরায় চেষ্টা করুন।
                </p>
                <Link
                  href="/register"
                  className="mt-4 inline-block text-xs font-bold text-red-600 hover:underline"
                >
                  এখনই নতুন রেজিস্ট্রেশন করুন →
                </Link>
              </div>
            ) : (
              results.map((item) => (
                <Link
                  key={item.id}
                  href={`/badge/${item.id}`}
                  className="block bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-mono shrink-0">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                            {item.fullNameBn}
                          </h3>
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                            ব্যাচ {toBengaliDigits(item.batch)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-mono">
                          আইডি: {item.id} • ফোন: {item.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                      <span className="hidden sm:inline">স্লিপ দেখুন</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
