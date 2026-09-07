"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRegistrationById, getStoredRegistrations } from "@/lib/storage";
import { AlumniRegistration } from "@/types";
import EBadgeCard from "@/components/EBadgeCard";
import Link from "next/link";
import { ArrowLeft, Search, AlertCircle } from "lucide-react";

export default function BadgeDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [registration, setRegistration] = useState<AlumniRegistration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const found = getRegistrationById(id);
      if (found) {
        setRegistration(found);
      } else if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("name")) {
          setRegistration({
            id: id,
            fullNameBn: urlParams.get("name") || "",
            fullNameEn: urlParams.get("en") || "",
            batch: urlParams.get("batch") || "2011",
            phone: "তথ্য সংরক্ষিত",
            profession: "অ্যালামনাই",
            address: "বাংলাদেশ",
            tShirtSize: (urlParams.get("tshirt") as "S" | "M" | "L" | "XL" | "XXL") || "L",
            guestCount: 0,
            baseFee: 1000,
            guestFee: 0,
            totalFee: parseInt(urlParams.get("fee") || "1000", 10),
            paymentMethod: "bkash",
            senderPhone: "",
            trxId: urlParams.get("trx") || "VERIFIED",
            status: (urlParams.get("status") as "verified" | "pending" | "rejected") || "verified",
            createdAt: new Date().toISOString(),
          });
        }
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600" />
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">রেজিস্ট্রেশন পাওয়া যায়নি!</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            আইডি <strong>&quot;{id}&quot;</strong> এর বিপরীতে কোনো তথ্য খুঁজে পাওয়া যায়নি। আইডিটি সঠিক কিনা যাচাই করুন অথবা মোবাইল নম্বর দিয়ে খুঁজুন।
          </p>
          <div className="space-y-3">
            <Link
              href="/badge"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition"
            >
              <Search className="w-4 h-4" />
              <span>আইডি বা মোবাইল দিয়ে খুঁজুন</span>
            </Link>
            <Link
              href="/register"
              className="inline-block text-xs font-bold text-red-600 hover:underline"
            >
              নতুন রেজিস্ট্রেশন করতে এখানে ক্লিক করুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 bg-slate-100 min-h-[85vh]">
      <div className="max-w-xl mx-auto px-4 mb-2 no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মূল পাতায় ফিরে যান</span>
        </Link>
      </div>

      <EBadgeCard registration={registration} />
    </div>
  );
}
