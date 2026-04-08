import { useState, useEffect } from 'react';

export const useIndonesiaCities = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const provRes = await fetch(
          "https://ihsaninh.github.io/wilayah-indonesia/provinces.json"
        );
        const provinces = await provRes.json();
        
        let citiesData: string[] = [];
        
        // Pakai Promise.all biar jauh lebih cepat daripada for-loop biasa
        const fetchAllRegencies = provinces.map((prov: any) =>
          fetch(`https://ihsaninh.github.io/wilayah-indonesia/${prov.id}/regencies.json`)
            .then(res => res.json())
        );

        const allResults = await Promise.all(fetchAllRegencies);
        
        allResults.forEach((regencies: any) => {
          const names = regencies.map(
            (item: any) => `${item.type} ${item.value}`
          );
          citiesData = [...citiesData, ...names];
        });

        citiesData.sort((a, b) => a.localeCompare(b));
        setCities(citiesData);
      } catch (err) {
        console.error("Gagal ambil data kota:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities };
};