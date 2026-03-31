export type OrderStatus = 
  | 'Menunggu Konfirmasi' 
  | 'Diproses' 
  | 'On The Way' 
  | 'Selesai' 
  | 'Menunggu Jadwal' 
  | 'Siap Dimulai'
  | 'Sesi Berakhir';

export type OrderCategory = 'Coklat' | 'Bunga' | 'EO' | 'Konselor';

export interface OrderHistoryModel {
  id: string;
  bundleId: string;
  category: OrderCategory;
  title: string;
  vendorName: string;
  image: string;
  dateStr: string; 
  timeStr?: string; 
  itemCount?: number; 
  location?: string; 
  priceDiamonds: number; 
  status: OrderStatus;
}

export const dummyOrderHistory: OrderHistoryModel[] = [
  {
    id: 'ord-1',
    bundleId: 'Part of Bundle #489092 | Jabar',
    category: 'Bunga',
    title: 'Buket Bunga Merah',
    vendorName: 'Toko Bunga Merekah',
    image: 'https://images.unsplash.com/photo-1599388147690-36e7a2b27076?q=80&w=400',
    dateStr: 'Sabtu, 14 Feb',
    itemCount: 1,
    priceDiamonds: 45,
    status: 'Menunggu Konfirmasi',
  },
  
  {
    id: 'ord-2',
    bundleId: 'Part of Bundle #489092',
    category: 'Coklat', 
    title: 'Piece of chocolate',
    vendorName: 'Cokelat Klasik',
    image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=400',
    dateStr: 'Sabtu, 14 Feb',
    itemCount: 1,
    priceDiamonds: 45,
    status: 'Diproses',
  },
  {
    id: 'ord-3',
    bundleId: 'Part of Bundle #489092',
    category: 'Coklat',
    title: 'Piece of chocolate',
    vendorName: 'Cokelat Klasik',
    image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=400',
    dateStr: 'Sabtu, 14 Feb',
    itemCount: 1,
    priceDiamonds: 45,
    status: 'On The Way',
  },

  {
    id: 'ord-4',
    bundleId: 'Part of Bundle #489092',
    category: 'EO',
    title: 'Romantic Dinner',
    vendorName: 'Luxury Date', 
    location: 'Hotel HOM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400',
    dateStr: 'Sabtu, 14 Feb',
    priceDiamonds: 45,
    status: 'Menunggu Konfirmasi',
  },

  {
    id: 'ord-5',
    bundleId: 'Sesi Khusus',
    category: 'Konselor',
    title: 'Sesi Konseling MBTI',
    vendorName: 'Dr. Sarah',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    dateStr: '60 Menit • Sabtu, 14 Feb',
    timeStr: '19:00 - 20:00 WIB',
    priceDiamonds: 45,
    status: 'Menunggu Jadwal', 
  },
  {
    id: 'ord-6',
    bundleId: 'Sesi Khusus',
    category: 'Konselor',
    title: 'Sesi Konseling MBTI',
    vendorName: 'Dr. Sarah',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    dateStr: '60 Menit • Sabtu, 14 Feb',
    timeStr: '19:00 - 20:00 WIB',
    priceDiamonds: 45,
    status: 'Siap Dimulai', 
  },
  {
    id: 'ord-7',
    bundleId: 'Sesi Khusus',
    category: 'Konselor',
    title: 'Sesi Konseling MBTI',
    vendorName: 'Dr. Sarah',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    dateStr: '60 Menit • Sabtu, 14 Feb',
    timeStr: '19:00 - 20:00 WIB',
    priceDiamonds: 45,
    status: 'Sesi Berakhir', 
  }
];