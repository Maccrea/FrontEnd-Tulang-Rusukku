import CustomDropdown from '@/components/CustomDropdown';
import CustomInput from '@/components/CustomInput';
import { sukuIndonesia } from '@/constants/data/suku';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfilDasarScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [nama, setNama] = useState(typeof params.nama === 'string' ? params.nama : '');
  const [suku, setSuku] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [DoB, setDoB] = useState({ day: '', month: '', year: '' });
  const [statusNikah, setStatusNikah] = useState('');
  const [punyaAnak, setPunyaAnak] = useState<boolean | null>(true);
  const [dataAnak, setDataAnak] = useState([
    { id: 1, gender: '', DoB: { day: '', month: '', year: '' } },
  ]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    // {/*Belum lengkap data APInya*/}
    fetch("https://emsifa.github.io/api-wilayah-indonesia/api/regencies/32.json") 
    .then(res => res.json())
    .then(data => {

      const cityNames = data
        .map((item: any) => item.name)
        .sort((a: string, b: string) => a.localeCompare(b));

      setCities(cityNames);
    })
    .catch(err => console.log(err));

  }, []);

  const [errors, setErrors] = useState({
    nama: '',
    suku: '',
    tempatLahir: '',
    DoB: '',
    statusNikah: '',
    anak: ''

    
  });

  const tambahAnak = () => {
    setDataAnak(prev => [
      ...prev,
      {
        id: prev.length + 1,
        gender: '',
        DoB: { day: '', month: '', year: '' }
      }
    ]);
  };

  const kurangAnak = () => {
    setDataAnak(prev => {
      if (prev.length === 1) return prev; 
      return prev.slice(0, -1);
    });
  };

  const updateDOB = (id: number, field: any, value: any) => {
    setDataAnak(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, DoB: { ...item.DoB, [field]: value } }
          : item
      )
    );
  };

  const updateGender = (id: number, value: string) => {
    setDataAnak(prev =>
      prev.map(item =>
        item.id === id ? { ...item, gender: value } : item
      )
    );
  };

  const handleNext = () => {
    const newErrors = {
      nama: '',
      suku: '',
      tempatLahir: '',
      DoB: '',
      statusNikah: '',
      anak: ''
    };

    if (!nama) newErrors.nama = "Nama wajib diisi";
    if (!suku) newErrors.suku = "Suku wajib dipilih";
    if (!tempatLahir) newErrors.tempatLahir = "Tempat lahir wajib dipilih";
    if (!DoB.day || !DoB.month || !DoB.year) newErrors.DoB = "Tanggal lahir belum lengkap";
    if (!statusNikah) newErrors.statusNikah = "Status pernikahan wajib dipilih";

    if (punyaAnak) {
      const incompleteAnak = dataAnak.some(
        anak => !anak.gender || !anak.DoB.day || !anak.DoB.month || !anak.DoB.year
      );

      if (incompleteAnak) {
        newErrors.anak = "Lengkapi data semua anak";
      }
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(err => err !== '');

    if (hasError) return;
  

  // router.push({
  //   pathname: "/ProfileForm",
  //   params: {
  //     nama, 
  //     suku, 
  //     tempatLahir, 
  //     DoB: JSON.stringify(DoB),
  //     statusNikah,
  //     punyaAnak: punyaAnak ? 'true' : 'false',
  //     dataAnak: JSON.stringify(dataAnak)
  //   }
  // });
    router.push('/SoulnSpiritForm')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.back()}> {/* GANTI NAVIGASI BALIK*/}
          <Ionicons name="chevron-back" size={28} color={colors.neutral[900]} />
        </TouchableOpacity>
        <Text style={[typography.variants.h1, styles.headerTitle]}>Profil Dasar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[typography.variants.body, styles.subtitle]}>
          Lengkapi identitas dasar Anda untuk memulai koneksi yang bermakna
        </Text>

        {/* Nama Panggilan */}
        <CustomInput
          label="Siapa nama panggilan kamu?"
          placeholder="Nama kamu"
          value={nama}
          onChangeText={setNama}
        />

        {errors.nama !== '' && (
          <Text style={styles.errorText}>{errors.nama}</Text>
        )}

        {/* Suku */}
        <CustomDropdown
          label="Apa suku kamu?"
          placeholder="Pilih suku"
          value={suku}
          onSelect={setSuku}
          data={sukuIndonesia}
        />

        {errors.suku !== '' && (
          <Text style={styles.errorText}>{errors.suku}</Text>
        )}

        {/* Tempat Lahir */}
        <CustomDropdown
          label="Di mana tempat lahir kamu?"
          placeholder="Pilih tempat lahir"
          value={tempatLahir}
          onSelect={setTempatLahir}
          data={cities}
        />

        {errors.tempatLahir !== '' && (
          <Text style={styles.errorText}>{errors.tempatLahir}</Text>
        )}

        {/* Tanggal Lahir (Simplified) */}
        <View style={styles.inputGap}>
          <Text style={styles.label}>Kapan kamu lahir?</Text>

          <View style={styles.rowContainer}>

            <View style={{ flex: 1, marginRight: 8, marginTop: -28}}>
              <CustomDropdown
                label=""
                placeholder="dd"
                value={DoB.day}
                onSelect={(value) => setDoB({ ...DoB, day: value })}
                data={Array.from({ length: 31 }, (_, i) => (i + 1).toString())}
              />
            </View>

            <View style={{ flex: 1, marginRight: 8, marginTop: -28 }}>
              <CustomDropdown
                label=""
                placeholder="mm"
                value={DoB.month}
                onSelect={(value) => setDoB({ ...DoB, month: value })}
                data={[
                  "Jan","Feb","Mar","Apr","Mei","Jun",
                  "Jul","Agu","Sep","Okt","Nov","Des"
                ]}
              />
            </View>

            <View style={{ flex: 1, marginTop: -28 }}>
              <CustomDropdown
                label=""
                placeholder="yy"
                value={DoB.year}
                onSelect={(value) => setDoB({ ...DoB, year: value })}
                data={Array.from({ length: 60 }, (_, i) => (1965 + i).toString())}
              />
            </View>


          </View>
          {errors.DoB !== '' && (
            <Text style={styles.errorText}>{errors.DoB}</Text>
          )}
        </View>

        {/* Status Pernikahan */}
        <CustomDropdown
          label="Apa status pernikahan kamu?"
          placeholder="Pilih status"
          value={statusNikah}
          onSelect={setStatusNikah}
          data={['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati']}
        />
        {errors.statusNikah !== '' && (
          <Text style={styles.errorText}>{errors.statusNikah}</Text>
        )}

        {/* Apakah memiliki anak? */}
        <View style={styles.inputGap}>
          <Text style={styles.label}>Apakah anda memiliki anak?</Text>
          <View style={styles.rowContainer}>
              <TouchableOpacity 
                style={[styles.toggleButton, punyaAnak === true && styles.toggleActive]}
                onPress={() => setPunyaAnak(true)}
              >
              <Text style={[styles.toggleText, punyaAnak === true && styles.toggleTextActive]}>Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toggleButton, punyaAnak === false && styles.toggleActive]}
                onPress={() => setPunyaAnak(false)}
              >
                <Text style={[styles.toggleText, punyaAnak === false && styles.toggleTextActive]}>Tidak</Text>
              </TouchableOpacity>
          </View>
        </View>

        {/* Section Anak (Conditional Rendering) */}
        <View style={styles.dividerLine} />
        {errors.anak !== '' && (
          <Text style={[styles.errorText, { paddingBottom: -20 }]}>{errors.anak}</Text>
        )}
        {punyaAnak && (
          <View style={styles.childSection}>

            {dataAnak.map((anak, index) => (

              <View key={anak.id}>

                <Text style={[typography.variants.h3, { marginBottom: 12 }]}>
                  Anak Ke-{index + 1}
                </Text>

                <CustomDropdown
                  label="Jenis kelamin anak"
                  placeholder="Pilih jenis kelamin"
                  value={anak.gender}
                  onSelect={(value) => updateGender(anak.id, value)}
                  data={['Laki-laki', 'Perempuan']}
                />

                <Text style={styles.label}>Tanggal lahir anak</Text>

                <View style={styles.rowContainer}>

                  <View style={{ flex: 1, marginRight: 8, marginTop: -28}}>
                    <CustomDropdown
                      label=""
                      placeholder="dd"
                      value={anak.DoB.day}
                      onSelect={(value) => updateDOB(anak.id, "day", value)}
                      data={Array.from({ length: 31 }, (_, i) => (i + 1).toString())}
                    />
                  </View>

                  <View style={{ flex: 1, marginRight: 8, marginTop: -28 }}>
                    <CustomDropdown
                      label=""
                      placeholder="mm"
                      value={anak.DoB.month}
                      onSelect={(value) => updateDOB(anak.id, "month", value)}
                      data={[
                        "Jan","Feb","Mar","Apr","Mei","Jun",
                        "Jul","Agu","Sep","Okt","Nov","Des"
                      ]}
                    />
                  </View>

                  <View style={{ flex: 1, marginTop: -28 }}>
                    <CustomDropdown
                      label=""
                      placeholder="yy"
                      value={anak.DoB.year}
                      onSelect={(value) => updateDOB(anak.id, "year", value)}
                      data={Array.from({ length: 60 }, (_, i) => (1965 + i).toString())}
                    />
                  </View>

                </View>

              </View>

            ))}
            <View style={[styles.rowContainer, { gap: 12 }]}>
              <TouchableOpacity style={styles.addButton} onPress={kurangAnak}>
                <Ionicons name="remove" size={20} color={colors.neutral[900]} />
                <Text style={[typography.variants.label, { marginLeft: 8 }]}>
                  Kurangi
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addButton} onPress={tambahAnak}>
                <Ionicons name="add" size={20} color={colors.neutral[900]} />
                <Text style={[typography.variants.label, { marginLeft: 8 }]}>
                  Tambah
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
        <TouchableOpacity style={styles.lanjutkanButtonContainer} onPress={handleNext}>
          <LinearGradient
            colors={[colors.navbar.blue, colors.navbar.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.lanjutkanButton}
          >
            <Text style={typography.variants.button}>Lanjutkan</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary, 
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 30,
    paddingBottom: 10,
  },
  headerTitle: {
    marginLeft: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  subtitle: {
    color: colors.neutral[600],
    marginBottom: 32,
    lineHeight: 20,
  },
  label: {
    ...typography.variants.body,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.neutral[900],
  },
  lanjutkanButtonContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
    marginTop: 10, 
  },
  lanjutkanButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  inputGap: {
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dividerLine: {
    height: 1,
    backgroundColor: colors.navbar.pink,
    marginVertical: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.navbar.background,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  toggleActive: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.navbar.pink,
  },
  toggleText: {
    ...typography.variants.body,
    color: colors.neutral[500],
  },
  toggleTextActive: {
    color: colors.navbar.pink,
    fontWeight: '600',
  },
  childSection: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.navbar.background,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: colors.neutral[200],
    borderWidth: 1,
  },

  errorText: {
    color: '#E53935',
    marginTop: -15,
    marginBottom: 8,  
    fontSize: 12
  },
});