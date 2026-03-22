import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { colors } from "@/Theme/color";
import { Ionicons } from "@expo/vector-icons";

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.faqItemContainer}>
      <TouchableOpacity 
        style={styles.faqQuestionRow} 
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <Text style={[styles.faqQuestionText, isExpanded && { color: colors.navbar.pink }]} numberOfLines={2}>
          {question}
        </Text>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={isExpanded ? colors.navbar.pink : "#9CA3AF"} 
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.faqAnswerContainer}>
          <Text style={styles.faqAnswerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const ContactButton = ({ icon, title, subtitle, color, onPress }: any) => (
  <TouchableOpacity style={styles.contactButton} onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.contactIconBox, { backgroundColor: color + "15" }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <View style={styles.contactTextContainer}>
      <Text style={styles.contactTitle}>{title}</Text>
      <Text style={styles.contactSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="open-outline" size={18} color="#CCC" />
  </TouchableOpacity>
);


export default function HelperScreen() {
  
  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/6281234567890?text=Halo%20Tulang%20Rusukku,%20saya%20butuh%20bantuan');
  };

  const openEmail = () => {
    Linking.openURL('mailto:support@tulangrusukku.com?subject=Bantuan%20Aplikasi');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Pusat Bantuan" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hubungi Kami</Text>
            <Text style={styles.sectionSubtitle}>Tim kami siap membantu kamu 24/7.</Text>
          </View>

          <ContactButton 
            icon="logo-whatsapp" 
            title="Chat via WhatsApp" 
            subtitle="Respon cepat (1-3 Menit)"
            color="#25D366"
            onPress={openWhatsApp}
          />

          <ContactButton 
            icon="mail-outline" 
            title="Kirim Email" 
            subtitle="Untuk kendala teknis & akun"
            color={colors.navbar.blue || "#8DA4F7"}
            onPress={openEmail}
          />

          <View style={styles.divider} />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pertanyaan Umum (FAQ)</Text>
          </View>

          <View style={styles.faqWrapper}>
            <FAQItem 
              question="Bagaimana cara mengubah foto profil saya?" 
              answer="Kamu bisa pergi ke menu Profil > Tentang Saya, lalu klik ikon kamera yang ada di pojok kanan bawah foto profilmu untuk mengganti avatar atau mengunggah foto baru." 
            />
            <FAQItem 
              question="Kenapa akun saya belum mendapatkan match?" 
              answer="Algoritma kami mencari kecocokan berdasarkan profil, keimanan, dan preferensi. Pastikan kamu sudah melengkapi semua data profilmu agar peluang match semakin besar!" 
            />
            <FAQItem 
              question="Apakah data NIK KTP saya aman?" 
              answer="Sangat aman. Kami menggunakan NIK KTP hanya untuk verifikasi keamanan internal memastikan tidak ada akun palsu (scam). Data ini dienkripsi dan tidak akan ditampilkan ke publik." 
            />
            {/* <FAQItem 
              question="Bagaimana cara menggunakan fitur Ghost Mode?" 
              answer="Pergi ke menu Pengaturan Aplikasi, lalu aktifkan 'Mode Penyamaran'. Selama mode ini aktif, profilmu tidak akan disarankan ke pengguna baru, namun kamu tetap bisa chat dengan match yang sudah ada." 
            /> */}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary || "#FFF5F7",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 25,
  },
  
  // Styles untuk Contact Button
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  contactIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 13,
    color: "#888",
  },

  // Styles untuk FAQ Accordion
  faqWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  faqItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#444",
    marginRight: 16,
    lineHeight: 22,
  },
  faqAnswerContainer: {
    paddingBottom: 16,
    paddingRight: 16,
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
});