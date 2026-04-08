import CustomDropdown2 from '@/components/CustomDropdown2';
import CustomRangeSlider from '@/components/CustomRangeSlider';
import CustomChipSelect from '@/components/CustomChipSelect';
import CustomBottomFooter from '@/components/CustomBottomFooter';
import { useIndonesiaCities } from '@/constants/data/wilayahIndo';
import { aliranGerejaIndonesia } from '@/constants/data/aliranGerejaIndo';
import { sukuIndonesia } from '@/constants/data/suku';
import { daftarPekerjaanMega } from '@/constants/data/pekerjaanUmum';
import { colors } from '@/Theme/color';
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfilDasarScreenHorizontal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [ageRange, setAgeRange] = useState<number[]>([25, 50]);
  const [statusNikah, setStatusNikah] = useState('Belum Menikah');
  const [regency, setRegency] = useState('Kota kota Jakarta Pusat');
  const [aliranGereja, setAliranGereja] = useState('Gereja Kristen Indonesia (GKI)');
  const [suku, setSuku] = useState('Jawa');
  const [tinggi, setTinggi] = useState<number[]>([150, 180]);
  const [berat, setBerat] = useState<number[]>([60, 90]);
  const [pelayanan, setPelayanan] = useState('Tidak ada');
  const [pekerjaan, setPekerjaan] = useState('Dokter Umum');
  const [penghasilan, setPenghasilan] = useState('> Rp 5 Juta');
  const [domisili, setDomisili] = useState('Sewa');
  const [kendaraan, setKendaraan] = useState('Motor');

  const handleSaveAndNext = async () => {
    try {
      const allData = {
        ageRange, statusNikah, regency, aliranGereja, suku,
        tinggi, berat, pelayanan, pekerjaan, penghasilan, domisili, kendaraan
      };
      await AsyncStorage.setItem('user_onboarding', JSON.stringify(allData));
      console.log("Data Berhasil Disimpan:", allData);
      // router.push("/NextPage");  // buat kembali ke home
    } catch (e) {
      console.error("Gagal menyimpan data:", e);
    }
  };

  const handleClear = () => {
    setAgeRange([18, 50]);
    setStatusNikah('');
    setRegency('');
    setAliranGereja('');
    setSuku('');
    setTinggi([100, 300]);
    setBerat([30, 250]);
    setPelayanan('');
    setPekerjaan('');
    setPenghasilan('');
    setDomisili('');
    setKendaraan('');
    // router.push("/NextPage");  // buat kembali ke home
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CustomRangeSlider
          label="Rentang Umur"
          unit="th"
          min={17}
          max={50}
          values={ageRange}
          onValuesChange={setAgeRange}
        />

        <CustomChipSelect
          label="Status Pernikahan"
          data={['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati']}
          selectedValue={statusNikah} // Menggunakan state statusNikah yang sudah ada
          onSelect={(val) => setStatusNikah(val)} // Mengupdate state yang sama
        />

        <CustomDropdown2
          label="Lokasi / Kota Domisili"
          value={regency}
          onSelect={(item) => setRegency(item)}
          data={useIndonesiaCities().cities}
        />

        <CustomDropdown2
          label="Jenis Gereja"
          value={aliranGereja}
          onSelect={(item) => setAliranGereja(item)}
          data={aliranGerejaIndonesia}
        />

        <CustomDropdown2
          label="Suku"
          value={suku}
          onSelect={(item) => setSuku(item)}
          data={sukuIndonesia}
        />

        <CustomRangeSlider
          label="Tinggi Badan"
          unit="cm"
          min={100}
          max={300}
          values={tinggi}
          onValuesChange={setTinggi}
        />

        <CustomRangeSlider
          label="Berat Badan"
          unit="kg"
          min={30}
          max={250}
          values={berat}
          onValuesChange={setBerat}
        />

        <CustomDropdown2
          label="Status Pelayanan"
          value={pelayanan}
          onSelect={(item) => setPelayanan(item)}
          data={['Tidak ada', 'Jemaat Biasa / Belum Pelayanan ⛪', 'Pemusik / Pemain Musik 🎸', 
            'Singer / Worship / Choir 🎤', 'Guru Sekolah Minggu 👧👦', 'Multimedia / Sound / Tim Kreatif 💻',
            'Usher / Penyambut Jemaat 🤝','Pengurus Pemuda / Aktivis 📋','Full Timer 🔥','Ketua Komsel ✝️']}
        />

        <CustomDropdown2
          label="Jenis Pekerjaan"
          value={pekerjaan}
          onSelect={(item) => setPekerjaan(item)}
          data={daftarPekerjaanMega}
        />

        <CustomDropdown2
          label="Penghasilan"
          value={penghasilan}
          onSelect={(item) => setPenghasilan(item)}
          data={['< Rp 5 Juta', '> Rp 5 Juta', '> Rp 10 Juta', '> Rp 20 Juta', '> Rp 50 Juta', '> Rp 100 Juta', '> Rp 500 Juta', '> Rp 1 Miliar']}
        />

        <CustomDropdown2
          label="Kepemilikan Tempat Tinggal"
          value={domisili}
          onSelect={(item) => setDomisili(item)}
          data={['Sewa', 'Milik Sendiri', 'Milik Keluarga']}
        />

        <CustomDropdown2
          label="Kepemilikan Kendaraan"
          value={kendaraan}
          onSelect={(item) => setKendaraan(item)}
          data={['Motor', 'Mobil']}
        />
        
      </ScrollView>
      <CustomBottomFooter 
        onClear={handleClear} 
        onNext={handleSaveAndNext} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: colors.background.primary,
  },
  scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 100,
  },
  
});