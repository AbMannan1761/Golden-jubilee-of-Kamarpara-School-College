import { AlumniRegistration } from "@/types";

const STORAGE_KEY = "jubilee_alumni_registrations";

// Helper to convert English digits to Bengali digits
export function toBengaliDigits(num: number | string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
}

// Format currency
export function formatBDT(amount: number): string {
  return `৳${toBengaliDigits(amount.toLocaleString("en-US"))}`;
}

export const INITIAL_REGISTRATIONS: AlumniRegistration[] = [
  {
    id: "SJ-2026-1001",
    fullNameBn: "মোঃ ইমরান চৌধুরী",
    fullNameEn: "Md. Imran Chowdhury",
    batch: "1987",
    phone: "01711234567",
    email: "imran.1987@gmail.com",
    profession: "ব্যবসায়ী / সিইও",
    address: "ধানমন্ডি, ঢাকা",
    tShirtSize: "XL",
    guestCount: 2,
    guestNames: "স্ত্রী ও পুত্র",
    baseFee: 1000,
    guestFee: 1000,
    totalFee: 2000,
    paymentMethod: "bkash",
    senderPhone: "01711234567",
    trxId: "BKS89X23MN",
    status: "verified",
    createdAt: "2026-11-16T10:30:00.000Z",
  },
  {
    id: "SJ-2026-1002",
    fullNameBn: "মোঃ মনিরুজ্জামান রোকনী",
    fullNameEn: "Md. Moniruzzaman Rokny",
    batch: "1993",
    phone: "01713456789",
    email: "rokny.1993@yahoo.com",
    profession: "অধ্যাপক, সরকারি কলেজ",
    address: "গুলশান-২, ঢাকা",
    tShirtSize: "L",
    guestCount: 1,
    guestNames: "স্ত্রী",
    baseFee: 1000,
    guestFee: 1000,
    totalFee: 2000,
    paymentMethod: "nagad",
    senderPhone: "01713456789",
    trxId: "NGD74T11QR",
    status: "verified",
    createdAt: "2026-11-17T14:15:00.000Z",
  },
  {
    id: "SJ-2026-1003",
    fullNameBn: "হাসনাত রুবেল",
    fullNameEn: "Hasnat Rubel",
    batch: "2011",
    phone: "01725112233",
    email: "hasnat.rubel@dev.com",
    profession: "সফটওয়্যার ইঞ্জিনিয়ার",
    address: "উত্তরা, ঢাকা",
    tShirtSize: "M",
    guestCount: 0,
    baseFee: 1000,
    guestFee: 0,
    totalFee: 1000,
    paymentMethod: "bkash",
    senderPhone: "01725112233",
    trxId: "BKS99W87AB",
    status: "verified",
    createdAt: "2026-11-18T09:40:00.000Z",
  },
  {
    id: "SJ-2026-1004",
    fullNameBn: "মোঃ মান্নান",
    fullNameEn: "Md. Mannan",
    batch: "2011",
    phone: "01822334455",
    email: "mannan@telecom.bd",
    profession: "টেলিকম বিশেষজ্ঞ",
    address: "আগারগাঁও, ঢাকা",
    tShirtSize: "L",
    guestCount: 1,
    guestNames: "সহধর্মিণী",
    baseFee: 1000,
    guestFee: 1000,
    totalFee: 2000,
    paymentMethod: "rocket",
    senderPhone: "018223344558",
    trxId: "RCK554312X",
    status: "verified",
    createdAt: "2026-11-19T11:20:00.000Z",
  },
  {
    id: "SJ-2026-1005",
    fullNameBn: "রনি আহমেদ",
    fullNameEn: "Rony Ahmed",
    batch: "2012",
    phone: "01726778899",
    email: "rony.ahmed@corp.bd",
    profession: "ব্যাংকার",
    address: "মতিঝিল, ঢাকা",
    tShirtSize: "M",
    guestCount: 0,
    baseFee: 1000,
    guestFee: 0,
    totalFee: 1000,
    paymentMethod: "bkash",
    senderPhone: "01726778899",
    trxId: "BKS11L22PP",
    status: "pending",
    createdAt: "2026-11-20T16:05:00.000Z",
  },
  {
    id: "SJ-2026-1006",
    fullNameBn: "মীম সুলতানা",
    fullNameEn: "Meem Sultana",
    batch: "2018",
    phone: "01727889900",
    email: "meem.sultana@student.bd",
    profession: "উচ্চশিক্ষা গবেষক",
    address: "মিরপুর-১০, ঢাকা",
    tShirtSize: "S",
    guestCount: 0,
    baseFee: 1000,
    guestFee: 0,
    totalFee: 1000,
    paymentMethod: "nagad",
    senderPhone: "01727889900",
    trxId: "NGD33K99JJ",
    status: "pending",
    createdAt: "2026-11-21T18:50:00.000Z",
  }
];

export function getStoredRegistrations(): AlumniRegistration[] {
  if (typeof window === "undefined") return INITIAL_REGISTRATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REGISTRATIONS));
      return INITIAL_REGISTRATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REGISTRATIONS;
  }
}

// Google Sheet Web App Endpoint (configurable)
export const GOOGLE_SHEET_WEBAPP_KEY = "jubilee_google_sheet_webapp_url";
export const DEFAULT_GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxnyox8U6qk1LjjD1Fq4VNaiSTM-7yOaY34ddrPZu_HoThzLt0f-1L6OQpnPnulfFFdOg/exec";

export async function syncToGoogleSheet(record: AlumniRegistration): Promise<boolean> {
  let endpoint = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL || "";
  if (typeof window !== "undefined" && !endpoint) {
    endpoint = localStorage.getItem(GOOGLE_SHEET_WEBAPP_KEY) || DEFAULT_GOOGLE_SHEET_WEBAPP_URL;
  }
  if (!endpoint) {
    endpoint = DEFAULT_GOOGLE_SHEET_WEBAPP_URL;
  }

  try {
    // Send as POST request (mode no-cors or standard fetch)
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });
    console.log("Synced successfully with Google Sheet Master!");
    return true;
  } catch (err) {
    console.error("Google Sheet sync failed:", err);
    return false;
  }
}

export function saveNewRegistration(data: Omit<AlumniRegistration, "id" | "createdAt" | "status">): AlumniRegistration {
  const current = getStoredRegistrations();
  const nextNum = 1000 + current.length + 1;
  const newRegistration: AlumniRegistration = {
    ...data,
    id: `SJ-2026-${nextNum}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const updated = [newRegistration, ...current];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Storage save failed", e);
    }
  }

  // Trigger Google Sheet Master sync
  syncToGoogleSheet(newRegistration).catch(() => {});

  return newRegistration;
}

export function updateRegistrationStatus(id: string, status: 'verified' | 'pending' | 'rejected'): AlumniRegistration[] {
  const current = getStoredRegistrations();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Storage update failed", e);
    }
  }
  return updated;
}

export function getRegistrationById(id: string): AlumniRegistration | undefined {
  const current = getStoredRegistrations();
  return current.find((item) => item.id.toUpperCase() === id.toUpperCase());
}

export function getRegistrationStats() {
  const list = getStoredRegistrations();
  const total = list.length;
  const verified = list.filter((r) => r.status === "verified").length;
  const pending = list.filter((r) => r.status === "pending").length;
  const rejected = list.filter((r) => r.status === "rejected").length;
  const totalGuests = list.reduce((acc, r) => acc + (r.guestCount || 0), 0);
  const totalAmount = list.reduce((acc, r) => acc + (r.totalFee || 1000), 0);
  const verifiedAmount = list
    .filter((r) => r.status === "verified")
    .reduce((acc, r) => acc + (r.totalFee || 1000), 0);

  // Batch breakdown
  const batchMap: Record<string, number> = {};
  list.forEach((r) => {
    batchMap[r.batch] = (batchMap[r.batch] || 0) + 1;
  });

  return {
    total,
    verified,
    pending,
    rejected,
    totalGuests,
    totalAmount,
    verifiedAmount,
    batchMap,
  };
}
