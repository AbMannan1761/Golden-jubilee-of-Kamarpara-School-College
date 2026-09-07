import { BatchCoordinator, EventNotice } from "@/types";

export const BATCH_COORDINATORS: BatchCoordinator[] = [
  {
    id: "batch-1987",
    batch: "1987",
    category: "80s",
    coordinators: [
      { name: "মোঃ ইমরান চৌধুরী", phone: "01711-XXXXXX", role: "প্রধান সমন্বয়ক" }
    ]
  },
  {
    id: "batch-1988-1991",
    batch: "1988-1991",
    category: "80s",
    coordinators: [
      { name: "মোঃ ওমর ফারুক", phone: "01819-XXXXXX", role: "সমন্বয়ক" },
      { name: "মোঃ জামাল হোসেন", phone: "01712-XXXXXX", role: "সহ-সমন্বয়ক" }
    ]
  },
  {
    id: "batch-1992",
    batch: "1992",
    category: "90s",
    coordinators: [
      { name: "মোঃ জসিম উদ্দিন", phone: "01911-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-1993",
    batch: "1993",
    category: "90s",
    coordinators: [
      { name: "মোঃ মনিরুজ্জামান (রোকনী)", phone: "01713-XXXXXX", role: "সমন্বয়ক" },
      { name: "জমির বক্স", phone: "01815-XXXXXX", role: "সমন্বয়ক" },
      { name: "সঞ্জয়", phone: "01912-XXXXXX", role: "সমন্বয়ক" },
      { name: "হেলাল", phone: "01611-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-1995",
    batch: "1995",
    category: "90s",
    coordinators: [
      { name: "বাবুল হোসেন", phone: "01714-XXXXXX", role: "সমন্বয়ক" },
      { name: "নূর আলম", phone: "01816-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-1997",
    batch: "1997",
    category: "90s",
    coordinators: [
      { name: "দেলোয়ার হোসেন", phone: "01715-XXXXXX", role: "সমন্বয়ক" },
      { name: "মানিক", phone: "01913-XXXXXX", role: "সহ-সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2000",
    batch: "2000",
    category: "2000s",
    coordinators: [
      { name: "মোঃ সালাউদ্দিন", phone: "01716-XXXXXX", role: "সমন্বয়ক" },
      { name: "শহীদুল্লা (রাসেল)", phone: "01817-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2001",
    batch: "2001",
    category: "2000s",
    coordinators: [
      { name: "উজ্জ্বল", phone: "01717-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2002",
    batch: "2002",
    category: "2000s",
    coordinators: [
      { name: "ইব্রাহিম", phone: "01718-XXXXXX", role: "সমন্বয়ক" },
      { name: "রিপন", phone: "01818-XXXXXX", role: "সমন্বয়ক" },
      { name: "রেজা", phone: "01914-XXXXXX", role: "সমন্বয়ক" },
      { name: "শাহিন", phone: "01612-XXXXXX", role: "সমন্বয়ক" },
      { name: "রিয়াজ", phone: "01511-XXXXXX", role: "সমন্বয়ক" },
      { name: "গিয়াস উদ্দিন", phone: "01719-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2004",
    batch: "2004",
    category: "2000s",
    coordinators: [
      { name: "মানিক", phone: "01720-XXXXXX", role: "সমন্বয়ক" },
      { name: "বাবুল", phone: "01819-XXXXXX", role: "সহ-সমন্বয়ক" },
      { name: "নাসির", phone: "01915-XXXXXX", role: "সহ-সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2006",
    batch: "2006",
    category: "2000s",
    coordinators: [
      { name: "মোঃ মোক্তার হোসেন", phone: "01721-XXXXXX", role: "সমন্বয়ক" },
      { name: "সোহেল", phone: "01820-XXXXXX", role: "সমন্বয়ক" },
      { name: "জামিল", phone: "01916-XXXXXX", role: "সমন্বয়ক" },
      { name: "শাহ আলম", phone: "01613-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2007",
    batch: "2007",
    category: "2000s",
    coordinators: [
      { name: "মোঃ রাসেল", phone: "01722-XXXXXX", role: "সমন্বয়ক" },
      { name: "সাইফুল", phone: "01821-XXXXXX", role: "সহ-সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2009",
    batch: "2009",
    category: "2000s",
    coordinators: [
      { name: "আকরাম", phone: "01723-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2010",
    batch: "2010",
    category: "2010s",
    coordinators: [
      { name: "মোঃ কাউসার", phone: "01724-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2011",
    batch: "2011",
    category: "2010s",
    coordinators: [
      { name: "হাসনাত (রুবেল)", phone: "01725-XXXXXX", role: "সমন্বয়ক" },
      { name: "মান্নান", phone: "01822-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2012",
    batch: "2012",
    category: "2010s",
    coordinators: [
      { name: "রনি আহমেদ", phone: "01726-XXXXXX", role: "সমন্বয়ক" }
    ]
  },
  {
    id: "batch-2018",
    batch: "2018",
    category: "2010s",
    coordinators: [
      { name: "মীম", phone: "01727-XXXXXX", role: "সমন্বয়ক" }
    ]
  }
];

export const EVENT_NOTICES: EventNotice[] = [
  {
    id: "notice-4",
    titleBn: "ব্যাচ সমন্বয়কদের সাথে সাধারণ সভা",
    dateBn: "প্রতি শুক্রবার বিকাল ৪:০০ টা",
    descriptionBn: "বিদ্যালয় অডিটোরিয়ামে সুবর্ণ জয়ন্তী প্রস্তুতি কমিটির সাপ্তাহিক ফলোআপ ও সমন্বয় সভা অনুষ্ঠিত হবে।",
    tagBn: "মিটিং",
    type: "info"
  },
  {
    id: "notice-1",
    titleBn: "অনলাইন রেজিস্ট্রেশনের সময়সীমা",
    dateBn: "১৫ নভেম্বর - ৩১ ডিসেম্বর ২০২৬",
    descriptionBn: "সকল প্রাক্তন ছাত্র-ছাত্রীদের নির্দিষ্ট সময়ের মধ্যে অনলাইনে রেজিস্ট্রেশন সম্পন্ন ও টি-শার্টের সাইজ নিশ্চিত করার জন্য অনুরোধ করা যাচ্ছে।",
    tagBn: "জরুরী ঘোষণা",
    type: "urgent"
  },
  {
    id: "notice-2",
    titleBn: "রেজিস্ট্রেশন ফি ও অতিথিদের তথ্য",
    dateBn: "ফি: ১,০০০ টাকা",
    descriptionBn: "মূল অ্যালামনাই রেজিস্ট্রেশন ফি ১,০০০ টাকা (স্মারক উপহার, টি-শার্ট ও খাবার অন্তর্ভুক্ত)। অতিরিক্ত প্রতি পরিবারের সদস্য/অতিথির জন্য ৫০০ টাকা।",
    tagBn: "ফি সংক্রান্ত",
    type: "info"
  },
  {
    id: "notice-3",
    titleBn: "সুবর্ণ জয়ন্তী মূল উৎসবের তারিখ",
    dateBn: "২২ ও ২৩ জানুয়ারি ২০২৭",
    descriptionBn: "প্রথম দিন বর্ণাঢ্য আনন্দ র‍্যালি, উদ্বোধনী অনুষ্ঠান ও স্মৃতিচারণ। দ্বিতীয় দিন গুণীজন সংবর্ধনা, সাংস্কৃতিক সন্ধ্যা ও গ্র্যান্ড ডিনার।",
    tagBn: "ইভেন্ট সূচি",
    type: "highlight"
  }
];
