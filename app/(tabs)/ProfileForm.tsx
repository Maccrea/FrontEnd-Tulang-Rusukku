import CustomCheckbox from '@/components/CustomCheckBox';
import CustomDropdown from '@/components/CustomDropdown';
import CustomInput from '@/components/CustomInput';
import CustomStepper from '@/components/CustomStepper';
import { aliranGerejaIndonesia } from '@/constants/data/aliranGerejaIndo';
import { sukuIndonesia } from '@/constants/data/suku';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');   

export default function ProfilDasarScreenHorizontal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [nama, setNama] = useState(typeof params.nama === 'string' ? params.nama : '');
  const [suku, setSuku] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [DoB, setDoB] = useState(
    { day: '', month: '', year: '' });
  const [statusNikah, setStatusNikah] = useState('');
  const [punyaAnak, setPunyaAnak] = useState<boolean | null>(true);
  const [dataAnak, setDataAnak] = useState([
    { id: 1, gender: '', DoB: { day: '', month: '', year: '' } }]);
  const [cities, setCities] = useState<string[]>([]);
  const [aliranGereja, setAliranGereja] = useState('');
  const [errors, setErrors] = useState({ 
    nama:'', suku:'', tempatLahir:'', DoB:'', statusNikah:'', anak:'' ,
    aliranGereja:'', pelayanan:'', phone:'',
    penyakit:'', anakKe:'', dariSaudara:'', umurAyah:'', umurIbu:'',
    penghasilan:'', domisili:'', kendaraan:''
  });
  const [pelayanan, setPelayanan] = useState<string[]>([]);
  const [namaMentor, setNamaMentor] = useState(typeof params.namaMentor === 'string' ? params.namaMentor : '');
  const [phone, setPhone] = useState(typeof params.phone === 'string' ? params.phone : '');
  const [tinggi, setTinggi] = useState(165);
  const [berat, setBerat] = useState(50);
  const [penyakit, setPenyakit] = useState('');
  const [anakKe, setAnakKe] = useState('');
  const [dariSaudara, setDariSaudara] = useState('');
  const [umurAyah, setUmurAyah] = useState('');
  const [umurIbu, setUmurIbu] = useState('');
  const [penghasilan, setPenghasilan] = useState('');
  const [domisili, setDomisili] = useState('');
  const [kendaraan, setKendaraan] = useState('');

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetch("https://emsifa.github.io/api-wilayah-indonesia/api/regencies/32.json") 
      .then(res => res.json())
      .then(data => {
        const cityNames = data.map((item: any) => item.name).sort((a: string, b: string) => a.localeCompare(b));
        setCities(cityNames);
      })
      .catch(err => console.log(err));
  }, []);

  const tambahAnak = () => setDataAnak(
    prev => [...prev, { id: prev.length+1, gender:'', DoB:{day:'',month:'',year:''} }]
  );
  
  const kurangAnak = () => setDataAnak(
    prev => prev.length === 1 ? prev : prev.slice(0,-1)
  );

  const updateDOB = (
    id:number, field:any, value:any) => setDataAnak(
      prev => prev.map(a => a.id===id ? {...a, DoB:{...a.DoB,[field]:value}} : a)
    );
  
  const updateGender = (
    id:number, value:string) => setDataAnak(prev => prev.map(a => a.id===id ? {...a, gender:value} : a)
  );

  const tambahTinggi = () => setTinggi(prev => prev + 1);
  const kurangTinggi = () => setTinggi(prev => (prev > 0 ? prev - 1 : 0));

  const tambahBerat = () => setBerat(prev => prev + 1);
  const kurangBerat = () => setBerat(prev => (prev > 0 ? prev - 1 : 0));

  const handleNext = () => {
    const newErrors = { 
      nama:'', suku:'', tempatLahir:'', DoB:'', statusNikah:'', anak:'',
      aliranGereja:'', pelayanan:'', phone:'',
      penyakit:'', anakKe:'', dariSaudara:'', umurAyah:'', umurIbu:'',
      penghasilan:'', domisili:'', kendaraan:''
    };

    // SLIDE 0 → PROFIL DASAR
    if(currentSlide === 0){
      if(!nama) newErrors.nama="Nama wajib diisi";
      if(!suku) newErrors.suku="Suku wajib dipilih";
      if(!tempatLahir) newErrors.tempatLahir="Tempat lahir wajib dipilih";
      if(!DoB.day || !DoB.month || !DoB.year) newErrors.DoB="Tanggal lahir belum lengkap";
      if(!statusNikah) newErrors.statusNikah="Status pernikahan wajib dipilih";

      if(punyaAnak){
        const incompleteAnak = dataAnak.some(
          a=>!a.gender||!a.DoB.day||!a.DoB.month||!a.DoB.year
        );
        if(incompleteAnak) newErrors.anak="Lengkapi data semua anak";
      }
    }

    // SLIDE 1 → KEIMANAN
    if(currentSlide === 1){
      if(!aliranGereja) newErrors.aliranGereja="Pilih aliran gereja";
      if(pelayanan.length===0) newErrors.pelayanan="Pilih minimal satu pelayanan";
      if(!phone) newErrors.phone="Nomor mentor wajib diisi";
    }

    // SLIDE 2 → LATAR BELAKANG PERSONAL
    if(currentSlide === 2){
      if(!penyakit) newErrors.penyakit = "Isi penyakit atau tulis Tidak ada";
      if(!anakKe) newErrors.anakKe = "Isi anak ke berapa";
      if(!dariSaudara) newErrors.dariSaudara = "Isi jumlah saudara";
      if(!umurAyah) newErrors.umurAyah = "Isi umur ayah";
      if(!umurIbu) newErrors.umurIbu = "Isi umur ibu";
    }

    // SLIDE 3 → FINANSIAL
    if(currentSlide === 3){
      if(!penghasilan) newErrors.penghasilan="Pilih penghasilan";
      if(!domisili) newErrors.domisili="Pilih domisili";
      if(!kendaraan) newErrors.kendaraan="Isi kendaraan";
    }

    setErrors(newErrors);

    if(Object.values(newErrors).some(e=>e!=='')) return;

    // kalau lolos validasi
    if(flatListRef.current && currentSlide < slides.length-1){
      flatListRef.current.scrollToIndex({ index: currentSlide + 1 });
    }else{
      router.push('/SoulnSpiritForm');
    }
  };
  // KALAU MAU NEXT SLIDE TESTING

  // const goNextSlide = () => {
  //   if(flatListRef.current && currentSlide < slides.length - 1){
  //     flatListRef.current.scrollToIndex({ index: currentSlide + 1 });
  //   } else {
  //     // kalau udah slide terakhir, bisa pakai router atau submit form
  //     router.push('/SoulnSpiritForm');
  //   }
  // };

  const goBackSlide = () => {
    if (flatListRef.current && currentSlide > 0) {
      flatListRef.current.scrollToIndex({ index: currentSlide - 1 });
    } else {
      router.back();
    }
  };

  const slides = [
    { key: 'profilDasar', title: 'Profil Dasar' },
    { key: 'keimananKerohanian', title: 'Keimanan & Kerohanian' },
    { key: 'latarBelakangPersonal', title: 'Latar Belakang Personal' },
    { key: 'stabilitasFinansial', title: 'Stabilitas Finansial' },
    { key: 'mbti', title: 'MBTI' },
  ] as const;
  const currentTitle = slides[currentSlide].title;

  const renderSlide = ({ item }: any) => {
    if(item.key==='profilDasar') return (
      <>
        <ScrollView style={styles.slide} contentContainerStyle={{ paddingBottom: 40 }}>

          <Text style={[typography.variants.body, styles.subtitle]}>
            Lengkapi identitas dasar Anda untuk memulai koneksi yang bermakna
          </Text>

          <CustomInput 
          label="Siapa nama panggilan kamu?" 
          placeholder="Nama kamu" 
          value={nama} 
          onChangeText={setNama} />
          {errors.nama!=='' && 
            <Text style={styles.errorText}>{errors.nama}</Text>
          }

          <CustomDropdown 
          label="Apa suku kamu?" 
          placeholder="Pilih suku" value={suku} onSelect={setSuku} data={sukuIndonesia}/>
          {errors.suku!=='' && <Text style={styles.errorText}>{errors.suku}</Text>}

          <CustomDropdown label="Di mana tempat lahir kamu?" placeholder="Pilih tempat lahir" value={tempatLahir} onSelect={setTempatLahir} data={cities}/>
          {errors.tempatLahir!=='' && <Text style={styles.errorText}>{errors.tempatLahir}</Text>}

          <View style={styles.inputGap}>
            <Text style={styles.label}>Kapan kamu lahir?</Text>
            <View style={styles.rowContainer}>
              <View style={{flex:1,marginRight:8,marginTop:-28}}>
                <CustomDropdown label="" placeholder="dd" value={DoB.day} onSelect={v=>setDoB({...DoB,day:v})} data={Array.from({length:31},(_,i)=>(i+1).toString())}/>
              </View>
              <View style={{flex:1,marginRight:8,marginTop:-28}}>
                <CustomDropdown label="" placeholder="mm" value={DoB.month} onSelect={v=>setDoB({...DoB,month:v})} data={["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"]}/>
              </View>
              <View style={{flex:1,marginTop:-28}}>
                <CustomDropdown label="" placeholder="yy" value={DoB.year} onSelect={v=>setDoB({...DoB,year:v})} data={Array.from({length:60},(_,i)=>(1965+i).toString())}/>
              </View>
            </View>
            {errors.DoB!=='' && <Text style={styles.errorText}>{errors.DoB}</Text>}
          </View>

          <CustomDropdown label="Apa status pernikahan kamu?" placeholder="Pilih status" value={statusNikah} onSelect={setStatusNikah} data={['Belum Menikah','Menikah','Cerai Hidup','Cerai Mati']}/>
          {errors.statusNikah!=='' && <Text style={styles.errorText}>{errors.statusNikah}</Text>}

          <View style={styles.inputGap}>
            <Text style={styles.label}>Apakah anda memiliki anak?</Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity style={[styles.toggleButton,punyaAnak===true && styles.toggleActive]} onPress={()=>setPunyaAnak(true)}>
                <Text style={[styles.toggleText,punyaAnak===true&&styles.toggleTextActive]}>Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toggleButton,punyaAnak===false && styles.toggleActive]} onPress={()=>setPunyaAnak(false)}>
                <Text style={[styles.toggleText,punyaAnak===false&&styles.toggleTextActive]}>Tidak</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dividerLine}/>
          {errors.anak!=='' && <Text style={[styles.errorText,{paddingBottom:-20}]}>{errors.anak}</Text>}
          {punyaAnak && dataAnak.map((anak,index)=>(
            <View key={anak.id}>
              <Text style={[typography.variants.h3,{marginBottom:12}]}>Anak Ke-{index+1}</Text>
              <CustomDropdown label="Jenis kelamin anak" placeholder="Pilih jenis kelamin" value={anak.gender} onSelect={v=>updateGender(anak.id,v)} data={['Laki-laki','Perempuan']}/>
              <Text style={styles.label}>Tanggal lahir anak</Text>
              <View style={styles.rowContainer}>
                <View style={{flex:1,marginRight:8,marginTop:-28}}>
                  <CustomDropdown label="" placeholder="dd" value={anak.DoB.day} onSelect={v=>updateDOB(anak.id,'day',v)} data={Array.from({length:31},(_,i)=>(i+1).toString())}/>
                </View>
                <View style={{flex:1,marginRight:8,marginTop:-28}}>
                  <CustomDropdown label="" placeholder="mm" value={anak.DoB.month} onSelect={v=>updateDOB(anak.id,'month',v)} data={["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"]}/>
                </View>
                <View style={{flex:1,marginTop:-28}}>
                  <CustomDropdown label="" placeholder="yy" value={anak.DoB.year} onSelect={v=>updateDOB(anak.id,'year',v)} data={Array.from({length:60},(_,i)=>(1965+i).toString())}/>
                </View>
              </View>
            </View>
          ))}

          {punyaAnak && (
            <View style={[styles.rowContainer,{gap:12,marginTop:16}]}>
              <TouchableOpacity style={styles.addButton} onPress={kurangAnak}>
                <Ionicons name="remove" size={20} color={colors.neutral[900]}/>              
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={tambahAnak}>
                <Ionicons name="add" size={20} color={colors.neutral[900]}/>
                {/* <Text style={[typography.variants.label,{marginLeft:8}]}>Tambah</Text> */}
              </TouchableOpacity>
            </View>
          )}

          {/* <TouchableOpacity style={styles.lanjutkanButtonContainer} onPress={handleNext}>
            <LinearGradient colors={[colors.navbar.blue,colors.navbar.pink]} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.lanjutkanButton}>
              <Text style={typography.variants.button}>Form selanjutnya</Text>
            </LinearGradient>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.lanjutkanButtonContainer} onPress={handleNext}>
            <LinearGradient 
              colors={[colors.navbar.blue,colors.navbar.pink]} 
              start={{x:0,y:0}} end={{x:1,y:0}} 
              style={styles.lanjutkanButton}
            >
              <Text style={typography.variants.button}>Form selanjutnya</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </>
    );

    if(item.key==='keimananKerohanian') return (
      <ScrollView style={styles.slide} contentContainerStyle={{ paddingBottom: 40 }}>

        <Text style={[typography.variants.body, styles.subtitle]}>
          Fondasi hubungan berawal dari sini. Yuk, kenali sisi rohanimu lebih jauh!
        </Text>

        {/* Form isian keimanan & kerohanian bisa ditambah di sini */}
        <CustomDropdown
          label="Apa aliran gereja kamu?" 
          placeholder="Pilih aliran gerejamu" 
          value={aliranGereja} 
          onSelect={setAliranGereja} 
          data={aliranGerejaIndonesia}
        />
        {errors.aliranGereja!=='' && <Text style={styles.errorText}>{errors.aliranGereja}</Text>}

        <CustomCheckbox
          label="Apa status pelayanan kamu?"
          options={['Tidak ada', 
            'Jemaat Biasa / Belum Pelayanan ⛪', 
            'Pemusik / Pemain Musik 🎸', 
            'Singer / Worship / Choir 🎤', 
            'Guru Sekolah Minggu 👧👦', 
            'Multimedia / Sound / Tim Kreatif 💻',
            'Usher / Penyambut Jemaat 🤝',
            'Pengurus Pemuda / Aktivis 📋'
          ]}
          selected={pelayanan}
          onChange={(values) => setPelayanan(values)}
        />
        {errors.pelayanan!=='' && 
          <Text style={styles.errorText}>{errors.pelayanan}</Text>
        }
        <View style={styles.inputGap}>
          {/* Label Utama */}
          <Text style={styles.label}>Berapa nomer handphone mentor kamu?</Text>
          
          <View style={styles.rowContainer}>
            {/* Kotak +62 (Statis/Tidak bisa diedit) */}
            <View style={styles.prefixBox}>
              <Text style={styles.prefixText}>+62</Text>
            </View>

            {/* Kotak Input Nomor */}
            <View style={styles.phoneInputWrapper}>              
              <CustomInput
                label="" // Kosongkan karena label sudah ada di atas
                placeholder="8132 - "
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>          
          </View>
          {errors.phone !== '' && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.lanjutkanButtonContainer} onPress={handleNext}>
          <LinearGradient 
            colors={[colors.navbar.blue,colors.navbar.pink]} 
            start={{x:0,y:0}} end={{x:1,y:0}} 
            style={styles.lanjutkanButton}
          >
            <Text style={typography.variants.button}>Form selanjutnya</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    );

  if(item.key==='latarBelakangPersonal') return (
    <ScrollView style={styles.slide} contentContainerStyle={{ paddingBottom: 40 }}>
    
      <Text style={[typography.variants.body, styles.subtitle]}>
        Ceritain sedikit dari mana kamu berasal. Siapa tahu latar belakang kita mirip
      </Text>

      {/* Form isian keimanan & kerohanian bisa ditambah di sini */}
      <CustomStepper 
        label="Berapa tinggi badan kamu (cm)"
        value={tinggi}
        onIncrement={tambahTinggi}
        onDecrement={kurangTinggi}
      />

      <CustomStepper 
        label="Berapa berat badan kamu (kg)"
        value={berat}
        onIncrement={tambahBerat}
        onDecrement={kurangBerat}
      />

      <CustomInput
        label="Apakah kamu punya penyakit bawaan?" 
        placeholder="Tidak ada / Amnesia, Diabetes, ..." 
        value={penyakit} 
        onChangeText={setPenyakit} 
      />
      {errors.penyakit!=='' && 
        <Text style={styles.errorText}>{errors.penyakit}</Text>
      }

      <View style={styles.inputGap}>
        <Text style={styles.label}>Kamu anak ke-berapa dari berapa saudara?</Text>
        <View style={styles.horizontalInputGroup}>
          <Text style={[styles.inlineLabel, { marginLeft: 0 }]}>ke</Text>
          <View style={styles.smallInputWrapper}>
            <CustomInput 
              label="" 
              placeholder="2" 
              value={anakKe} 
              onChangeText={setAnakKe} 
              keyboardType="numeric"
            />
          </View>
          
          <Text style={[styles.inlineLabel, { marginLeft: 10 }]}>dari</Text>
          <View style={styles.mediumInputWrapper}>
            <CustomInput 
              label="" 
              placeholder="4" 
              value={dariSaudara} 
              onChangeText={setDariSaudara} 
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
      {errors.anakKe!=='' && 
        <Text style={[styles.errorText]}>{errors.anakKe}</Text>
      }
      {errors.dariSaudara!=='' && 
        <Text style={styles.errorText}>{errors.dariSaudara}</Text>
      }

      <View style={styles.inputGap}>
        <Text style={styles.label}>Berapa umur ayah dan ibu kamu?</Text>
        <View style={styles.horizontalInputGroup}>
          
          {/* BAGIAN AYAH */}
          <Text style={[styles.inlineLabel, { marginLeft: 0 }]}>Ayah</Text>
          <View style={styles.mediumInputWrapper}>
            <CustomInput 
              label="" 
              placeholder="45" 
              value={umurAyah} 
              onChangeText={setUmurAyah} 
              keyboardType="numeric"
            />
            {/* Error Ayah ditaruh di sini agar sejajar di bawah input ayah */}
            {errors.umurAyah !== '' && (
              <Text style={styles.errorRowText}>{errors.umurAyah}</Text>
            )}
          </View>

          {/* BAGIAN IBU */}
          <Text style={[styles.inlineLabel, { marginLeft: 10 }]}>Ibu</Text>
          <View style={styles.mediumInputWrapper}>
            <CustomInput 
              label="" 
              placeholder="42" 
              value={umurIbu} 
              onChangeText={setUmurIbu} 
              keyboardType="numeric"
            />
            {/* Error Ibu ditaruh di sini agar sejajar di bawah input ibu */}
            {errors.umurIbu !== '' && (
              <Text style={styles.errorRowText}>{errors.umurIbu}</Text>
            )}
          </View>
          
        </View>
      </View>

      <TouchableOpacity style={styles.lanjutkanButtonContainer} onPress={handleNext}>
        <LinearGradient 
          colors={[colors.navbar.blue,colors.navbar.pink]} 
          start={{x:0,y:0}} end={{x:1,y:0}} 
          style={styles.lanjutkanButton}
        >
          <Text style={typography.variants.button}>Lanjutkan</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  if(item.key==='stabilitasFinansial') return (
      <>
        <ScrollView style={styles.slide} contentContainerStyle={{ paddingBottom: 40 }}>

          <Text style={[typography.variants.body, styles.subtitle]}>
            Cuma pertanyaan singkat soal kesiapanmu. Data ini 100% aman dan dikunci rapat 🔒
          </Text>

          <CustomDropdown 
            label="Berapa penghasilan bulanan kamu?" 
            placeholder="kisaran" value={penghasilan} onSelect={setPenghasilan} 
            data={['< Rp 5 Juta', '> Rp 5 Juta', '> Rp 10 Juta', '> Rp 20 Juta', '> Rp 50 Juta', '> Rp 100 Juta', '> Rp 500 Juta', '> Rp 1 Miliar']}
          />
          {errors.penghasilan!=='' && 
            <Text style={styles.errorText}>{errors.penghasilan}</Text>
          }
          
          <CustomDropdown 
            label="Sekarang lagi stay di mana nih?" 
            placeholder="Anda menetap di .." value={domisili} onSelect={setDomisili} 
            data={['Apartemen', 'kost', 'rumah pribadi', 'rumah wali', 'kontrak']}
          />
          {errors.domisili!=='' && <Text style={styles.errorText}>{errors.domisili}</Text>}

          <CustomInput
            label="Ada kendaraan apa saja?" 
            placeholder="2 mobil, 1 motor, ..." 
            value={kendaraan} 
            onChangeText={setKendaraan} 
          />
          {errors.kendaraan!=='' && <Text style={styles.errorText}>{errors.kendaraan}</Text>}

          {/* <TouchableOpacity style={styles.lanjutkanButtonContainer} onPress={handleNext}>
            <LinearGradient colors={[colors.navbar.blue,colors.navbar.pink]} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.lanjutkanButton}>
              <Text style={typography.variants.button}>Form selanjutnya</Text>
            </LinearGradient>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.lanjutkanButtonContainer} onPress={handleNext}>
            <LinearGradient 
              colors={[colors.navbar.blue,colors.navbar.pink]} 
              start={{x:0,y:0}} end={{x:1,y:0}} 
              style={styles.lanjutkanButton}
            >
              <Text style={typography.variants.button}>Lanjutkan</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  if(item.key==='mbti') return (
      <>
        <ScrollView style={styles.slide} contentContainerStyle={{ paddingBottom: 40 }}>
          <TouchableOpacity style={styles.lanjutkanButtonContainer} onPress={handleNext}>
            <LinearGradient 
              colors={[colors.navbar.blue,colors.navbar.pink]} 
              start={{x:0,y:0}} end={{x:1,y:0}} 
              style={styles.lanjutkanButton}
            >
              <Text style={typography.variants.button}>Lanjutkan</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  return null;
}

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.topHeader, { paddingHorizontal: 24 }]}>
        <TouchableOpacity onPress={goBackSlide}>
          <Ionicons name="chevron-back" size={28} color={colors.neutral[900]}/>
        </TouchableOpacity>
        {/* Judul diambil dari const currentTitle yang sudah kamu buat */}
        <Text style={[typography.variants.h1, styles.headerTitle]}>
          {currentTitle}
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        scrollEnabled={false}
        style={{ flex: 1 }}
        onMomentumScrollEnd={ev => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / width);
          setCurrentSlide(index);
        }}
        getItemLayout={(data, index) => (
          { length: width, offset: width * index, index }
        )}
      />
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
  prefixBox: {
    width: 65, 
    height: 52,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    backgroundColor: colors.navbar.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  prefixText: {
    ...typography.variants.body,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  phoneInputWrapper: {
    flex: 1,
    marginTop: -28,
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

  errorRowText: {
    color: '#E53935',
    fontSize: 11,
    marginTop: -15, // Menarik error ke atas karena CustomInput punya marginBottom: 20
    marginBottom: 5,
    marginLeft: 16, // Agar teks error agak menjorok ke dalam kotak input
    lineHeight: 14,
  },

  slide: {
    width: width,              
    paddingHorizontal: 24,     
    paddingBottom: 40,
  },
  horizontalInputGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start', // PENTING: Ubah 'center' ke 'flex-start' supaya kalau error muncul, label "Ayah/Ibu" gak ikut turun ke tengah
    marginTop: 20,
  },
  inlineLabel: {
    ...typography.variants.body,
    color: colors.neutral[900],
    marginRight: 8,
    marginTop: 15, // Sesuaikan agar teks "Ayah/Ibu" tetap sejajar tengah dengan box input
  },
  smallInputWrapper: {
    width: 60,
    height: 50, // Sesuaikan dengan tinggi kotak input (Figma: 50px)
    justifyContent: 'center',
    marginTop: -28, // Menetralkan padding internal CustomInput
  },
  mediumInputWrapper: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    marginTop: -28, // Menetralkan padding internal CustomInput
  }
});