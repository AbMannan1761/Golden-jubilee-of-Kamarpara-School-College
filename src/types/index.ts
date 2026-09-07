export interface AlumniRegistration {
  id: string; // e.g. SJ-2026-1001
  fullNameBn: string;
  fullNameEn: string;
  batch: string; // e.g. "2011"
  phone: string;
  email?: string;
  profession: string;
  address: string;
  tShirtSize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  guestCount: number;
  guestNames?: string;
  baseFee: number; // 1000
  guestFee: number; // 1000 per guest
  totalFee: number;
  photoUrl?: string;
  paymentMethod: 'bkash' | 'nagad' | 'rocket';
  senderPhone: string;
  trxId: string;
  status: 'verified' | 'pending' | 'rejected';
  createdAt: string;
}

export interface BatchCoordinator {
  id: string;
  batch: string;
  category: '80s' | '90s' | '2000s' | '2010s' | 'all';
  coordinators: {
    name: string;
    phone?: string;
    role?: string;
  }[];
  batchRepName?: string;
}

export interface EventNotice {
  id: string;
  titleBn: string;
  dateBn: string;
  descriptionBn: string;
  tagBn: string;
  type: 'urgent' | 'info' | 'highlight';
}
