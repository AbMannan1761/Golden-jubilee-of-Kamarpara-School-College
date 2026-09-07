"use client";

import React, { useState, useMemo } from "react";
import { BATCH_COORDINATORS } from "@/data/coordinators";
import { Search, Users, Phone, ShieldCheck, Filter, UserCheck } from "lucide-react";
import { toBengaliDigits } from "@/lib/storage";

export default function CoordinatorDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", labelBn: "সকল ব্যাচ" },
    { key: "80s", labelBn: "৮০-এর দশক" },
    { key: "90s", labelBn: "৯০-এর দশক" },
    { key: "2000s", labelBn: "২০০০-এর দশক" },
    { key: "2010s", labelBn: "২০১০ ও পরবর্তী" },
  ];

  const filteredList = useMemo(() => {
    return BATCH_COORDINATORS.filter((item) => {
      // Category filter
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.batch.toLowerCase().includes(q) ||
        toBengaliDigits(item.batch).includes(q) ||
        item.coordinators.some((c) => c.name.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="coordinators" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3 border border-amber-200">
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>ব্যাচভিত্তিক প্রতিনিধি ও সমন্বয়ক তালিকা</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ব্যাচ সমন্বয়কবৃন্দ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            আপনার এসএসসি ব্যাচের রেজিস্ট্রেশন ও যে কোনো তথ্যের জন্য সংশ্লিষ্ট ব্যাচ সমন্বয়কের সাথে যোগাযোগ করুন।
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat.key
                    ? "bg-red-700 text-white shadow-md shadow-red-700/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.labelBn}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ব্যাচ বা সমন্বয়কের নাম খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-slate-50/50"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>মোট ব্যাচ গ্রুপ: {toBengaliDigits(filteredList.length)} টি প্রদর্শিত হচ্ছে</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-red-600 hover:underline font-medium"
            >
              সার্চ রিসেট করুন
            </button>
          )}
        </div>

        {/* Grid of Coordinators */}
        {filteredList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">কোনো সমন্বয়ক খুঁজে পাওয়া যায়নি।</p>
            <p className="text-xs text-slate-400 mt-1">অনুগ্রহ করে সঠিক ব্যাচের সাল বা নাম লিখুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Batch Badge */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                        এসএসসি ব্যাচ: {toBengaliDigits(item.batch)}
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
                      {item.coordinators.length > 1
                        ? `${toBengaliDigits(item.coordinators.length)} জন সমন্বয়ক`
                        : "সমন্বয়ক"}
                    </span>
                  </div>

                  {/* Coordinators List */}
                  <div className="space-y-3">
                    {item.coordinators.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-50/80 hover:bg-amber-50/60 border border-slate-100 transition-colors flex items-start justify-between gap-3"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                            <UserCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {c.name}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {c.role || "ব্যাচ সমন্বয়ক"}
                            </p>
                          </div>
                        </div>

                        <a
                          href={`tel:${c.phone || "01711234567"}`}
                          title="কল করুন"
                          className="shrink-0 p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 transition shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer badge */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    ভেরিফাইড ব্যাচ প্রতিনিধি
                  </span>
                  <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                    Batch {item.batch}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
