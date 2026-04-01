export interface BaseVendor {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Bunga' | 'Chocolate' | 'EO' | 'Konselor';
}

export interface ProductModel extends BaseVendor {
  type: 'product'; 
  actionText: 'Beli' | 'Pesan'; 
}

export interface ServiceModel extends BaseVendor {
  type: 'service'; 
  actionText: 'Pesan' | 'Jadwalkan'; 
  providerName: string; 
  availableDates: string[]; 
  availableTimes: string[]; 
  badgeType?: 'Gratis' | 'Profesional'; 
  durationSesi?: string; 
  affiliation?: string; // organisasi / instansi (gereja, klinik, dll.)
}

export type VendorModel = ProductModel | ServiceModel;

export const VENDOR_PLACEHOLDERS: Record<string, string> = {
  Bunga: 'Ketik pesan manismu di sini...',
  Chocolate: 'Tuliskan ucapan untuk si dia...',
  EO: 'Ada request khusus untuk menu atau dekorasi?',
  Konselor: 'Ceritakan singkat apa yang ingin dibahas agar konselor siap...',
};

export const dummyVendors: VendorModel[] = [
  {
    id: 'f1',
    type: 'product',
    category: 'Bunga',
    name: 'Buket Mawar Merah',
    price: 250000,
    image: 'https://unsplash.com/photos/red-rose-in-white-background-wIDQNEyW39k',
    actionText: 'Pesan',
  },
  {
    id: 'f2',
    type: 'product',
    category: 'Bunga',
    name: 'Buket Tulip Putih',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1610313838150-f8f4a1f6a62f?q=80&w=400',
    actionText: 'Pesan',
  },
  {
    id: 'c1',
    type: 'product',
    category: 'Chocolate',
    name: 'Cokelat Praline Box',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=400',
    actionText: 'Pesan',
  },
  {
    id: 'eo1',
    type: 'service',
    category: 'EO',
    name: 'Private Dinner VIP',
    providerName: 'by Luxury Date',
    price: 1500000,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400',
    actionText: 'Pesan',
    availableDates: ['Kam, 12', 'Jum, 13', 'Sab, 14'],
    availableTimes: ['18:00', '19:00', '20:00'],
  },
  {
    id: 'ko1',
    type: 'service',
    category: 'Konselor',
    name: 'Dr. Sarah, S.Psi.',
    providerName: 'Psikolog Klinis',
    affiliation: 'Klinik Sehat Bahagia',
    price: 200000,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    actionText: 'Jadwalkan',
    badgeType: 'Profesional',
    durationSesi: '1 Jam',
    availableDates: ['Kam, 12', 'Jum, 13', 'Sab, 14'],
    availableTimes: ['10:00', '13:00', '15:00'],
  },
  {
    id: 'ko2',
    type: 'service',
    category: 'Konselor',
    name: 'Kak Budi (Relawan)',
    providerName: 'Relawan Sebaya',
    price: 0,
    affiliation: 'Gereja Pelita Harapan',
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=400',
    actionText: 'Jadwalkan',
    badgeType: 'Gratis',
    durationSesi: '30 Menit',
    availableDates: ['Sen, 09', 'Sel, 10'],
    availableTimes: ['19:00', '20:00'],
  }
];