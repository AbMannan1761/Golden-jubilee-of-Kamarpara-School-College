"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AlumniRegistration } from "@/types";
import { 
  getStoredRegistrations, 
  updateRegistrationStatus, 
  getRegistrationStats, 
  toBengaliDigits, 
  formatBDT 
} from "@/lib/storage";
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Download, 
  Eye, 
  Filter, 
  Lock, 
  Unlock, 
  RefreshCw,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  // Passcode protection
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Data state
  const [registrations, setRegistrations] = useState<AlumniRegistration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedAttendee, setSelectedAttendee] = useState<AlumniRegistration | null>(null);

  const refreshData = () => {
    const list = getStoredRegistrations();
    setRegistrations(list);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin PIN: 2026 or admin123
    if (passcode === "2026" || passcode === "admin123" || passcode === "admin") {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleStatusChange = (id: string, newStatus: 'verified' | 'pending' | 'rejected') => {
    const updated = updateRegistrationStatus(id, newStatus);
    setRegistrations(updated);
    if (selectedAttendee && selectedAttendee.id === id) {
      setSelectedAttendee({ ...selectedAttendee, status: newStatus });
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = registrations.length;
    const verified = registrations.filter((r) => r.status === "verified").length;
    const pending = registrations.filter((r) => r.status === "pending").length;
    const rejected = registrations.filter((r) => r.status === "rejected").length;
    const totalAmount = registrations.reduce((acc, r) => acc + (r.totalFee || 1000), 0);
    const verifiedAmount = registrations
      .filter((r) => r.status === "verified")
      .reduce((acc, r) => acc + (r.totalFee || 1000), 0);
    const totalGuests = registrations.reduce((acc, r) => acc + (r.guestCount || 0), 0);

    return { total, verified, pending, rejected, totalAmount, verifiedAmount, totalGuests };
  }, [registrations]);

  // Unique batches for filter dropdown
  const uniqueBatches = useMemo(() => {
    const set = new Set(registrations.map((r) => r.batch));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [registrations]);

  // Filtered registrations
  const filteredList = useMemo(() => {
    return registrations.filter((r) => {
      const matchesBatch = selectedBatch === "all" || r.batch === selectedBatch;
      const matchesStatus = selectedStatus === "all" || r.status === selectedStatus;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        r.id.toLowerCase().includes(q) ||
        r.fullNameBn.toLowerCase().includes(q) ||
        r.fullNameEn.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.trxId.toLowerCase().includes(q);

      return matchesBatch && matchesStatus && matchesSearch;
    });
  }, [registrations, selectedBatch, selectedStatus, searchQuery]);

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = [
      "Registration ID",
      "Full Name (BN)",
      "Full Name (EN)",
      "SSC Batch",
      "Mobile Phone",
      "Email",
      "Profession",
      "Address",
      "T-Shirt Size",
      "Guest Count",
      "Total Fee (BDT)",
      "Payment Method",
      "Sender Mobile",
      "Transaction ID",
      "Status",
      "Registered At",
    ];

    const rows = filteredList.map((r) => [
      r.id,
      `"${r.fullNameBn}"`,
      `"${r.fullNameEn}"`,
      r.batch,
      `"${r.phone}"`,
      `"${r.email || ""}"`,
      `"${r.profession}"`,
      `"${r.address}"`,
      r.tShirtSize,
      r.guestCount,
      r.totalFee,
      r.paymentMethod,
      `"${r.senderPhone}"`,
      r.trxId,
      r.status,
      `"${new Date(r.createdAt).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `golden_jubilee_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Passcode modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-amber-200 shadow-xl text-center">
          <div className="w-16 h-16 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">অ্যাডমিন প্রবেশদ্বার</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
            রেজিস্ট্রেশন ডেটা ও পেমেন্ট ভেরিফিকেশন প্যানেলে প্রবেশ করতে এডমিন পাসকোড লিখুন। (ডিফল্ট: <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">2026</code>)
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="পাসকোড (যেমন: 2026)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center tracking-widest font-mono text-lg focus:ring-2 focus:ring-amber-500 outline-none"
              autoFocus
            />

            {loginError && (
              <p className="text-xs font-bold text-red-600">
                ভুল পাসকোড! অনুগ্রহ করে সঠিক কোড দিন (2026)।
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-md shadow-red-600/20"
            >
              ড্যাশবোর্ডে প্রবেশ করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              অ্যাডমিন কন্ট্রোল প্যানেল
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            সুবর্ণ জয়ন্তী অ্যালামনাই রেজিস্ট্রেশন ও পেমেন্ট অডিট সিস্টেম
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshData}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>রিফ্রেশ</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-2 transition shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Excel / CSV এক্সপোর্ট</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition"
            title="লগআউট"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">মোট রেজিস্ট্রেশন</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {toBengaliDigits(stats.total)} জন
              </span>
              <span className="text-xs text-slate-400">
                (+{toBengaliDigits(stats.totalGuests)} অতিথি)
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">অনুমোদিত পেমেন্ট</span>
            <span className="text-2xl font-black text-emerald-700">
              {toBengaliDigits(stats.verified)} টি
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">যাচাইকরণ অপেক্ষমাণ</span>
            <span className="text-2xl font-black text-amber-600">
              {toBengaliDigits(stats.pending)} টি
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">মোট সংগৃহীত তহবিল</span>
            <span className="text-2xl font-black text-indigo-900">
              {formatBDT(stats.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="আইডি, নাম, মোবাইল বা TrxID দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Batch Selector */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span>ব্যাচ:</span>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">সকল ব্যাচ ({toBengaliDigits(uniqueBatches.length)})</option>
              {uniqueBatches.map((b) => (
                <option key={b} value={b}>
                  ব্যাচ {toBengaliDigits(b)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span>স্ট্যাটাস:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">সকল স্ট্যাটাস</option>
              <option value="verified">অনুমোদিত (Verified)</option>
              <option value="pending">অপেক্ষমাণ (Pending)</option>
              <option value="rejected">বাতিল (Rejected)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Registrations Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">আইডি ও তারিখ</th>
                <th className="py-3.5 px-4">নাম ও ব্যাচ</th>
                <th className="py-3.5 px-4">যোগাযোগ</th>
                <th className="py-3.5 px-4">সাইজ ও অতিথি</th>
                <th className="py-3.5 px-4">পেমেন্ট বিবরণ</th>
                <th className="py-3.5 px-4">স্ট্যাটাস</th>
                <th className="py-3.5 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    কোনো তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredList.map((r) => (
                  <tr key={r.id} className="hover:bg-amber-50/40 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-900 block">{r.id}</span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(r.createdAt).toLocaleDateString("bn-BD")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 text-sm">{r.fullNameBn}</p>
                      <p className="text-[11px] text-slate-500">{r.fullNameEn}</p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                        ব্যাচ {toBengaliDigits(r.batch)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <span className="text-slate-900 font-bold block">{r.phone}</span>
                      <span className="text-slate-500 text-[11px] font-sans">{r.profession}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        {r.tShirtSize}
                      </span>
                      <span className="text-slate-500 block mt-1 text-[11px]">
                        {r.guestCount > 0 ? `+${toBengaliDigits(r.guestCount)} জন সদস্য` : "একক"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-emerald-700 block">{formatBDT(r.totalFee)}</span>
                      <span className="uppercase text-[11px] font-bold text-slate-500">
                        {r.paymentMethod} • <span className="font-mono">{r.trxId}</span>
                      </span>
                      <span className="block text-[10px] text-slate-400 font-mono">
                        From: {r.senderPhone}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={r.status}
                        onChange={(e) =>
                          handleStatusChange(r.id, e.target.value as 'verified' | 'pending' | 'rejected')
                        }
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          r.status === "verified"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : r.status === "pending"
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : "bg-red-50 text-red-700 border-red-300"
                        }`}
                      >
                        <option value="verified">অনুমোদিত (Verified)</option>
                        <option value="pending">অপেক্ষমাণ (Pending)</option>
                        <option value="rejected">বাতিল (Rejected)</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedAttendee(r)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition"
                          title="বিস্তারিত দেখুন"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/badge/${r.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700 transition"
                          title="ব্যাজ পেজ খুলুন"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendee Details Modal */}
      {selectedAttendee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedAttendee(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-600" />
              রেজিস্ট্রেশন বিবরণ ও অডিট
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-bold block">আইডি নম্বর:</span>
                  <span className="text-base font-black font-mono text-slate-900">
                    {selectedAttendee.id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 font-bold block">পেমেন্ট স্ট্যাটাস:</span>
                  <span className="font-bold capitalize text-emerald-700">
                    {selectedAttendee.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 font-bold">নাম (বাংলা):</span>
                  <p className="font-bold text-sm text-slate-900">{selectedAttendee.fullNameBn}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">Name (English):</span>
                  <p className="font-bold text-sm text-slate-900">{selectedAttendee.fullNameEn}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">এসএসসি ব্যাচ:</span>
                  <p className="font-bold text-slate-900">{selectedAttendee.batch}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">টি-শার্ট সাইজ:</span>
                  <p className="font-bold text-slate-900">{selectedAttendee.tShirtSize}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">মোবাইল:</span>
                  <p className="font-mono font-bold text-slate-900">{selectedAttendee.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">ইমেইল:</span>
                  <p className="text-slate-700">{selectedAttendee.email || "—"}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 font-bold">পেশা ও ঠিকানা:</span>
                  <p className="text-slate-900">{selectedAttendee.profession}, {selectedAttendee.address}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">অতিথি সংখ্যা:</span>
                  <p className="text-slate-900">
                    {selectedAttendee.guestCount} জন ({selectedAttendee.guestNames || "একক"})
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold">মোট ফি:</span>
                  <p className="font-black text-emerald-700 text-sm">
                    {formatBDT(selectedAttendee.totalFee)}
                  </p>
                </div>
                <div className="col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold block mb-1">পেমেন্ট যাচাইকরণ তথ্য:</span>
                  <p className="font-mono text-slate-800">
                    মাধ্যম: <strong className="capitalize">{selectedAttendee.paymentMethod}</strong> | প্রেরক: <strong>{selectedAttendee.senderPhone}</strong>
                  </p>
                  <p className="font-mono text-slate-800 mt-1">
                    TrxID: <strong className="text-amber-800">{selectedAttendee.trxId}</strong>
                  </p>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <Link
                  href={`/badge/${selectedAttendee.id}`}
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold transition"
                >
                  ই-ব্যাজ দেখুন
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedAttendee.id, "verified")}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition"
                  >
                    অনুমোদন করুন
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAttendee.id, "rejected")}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
