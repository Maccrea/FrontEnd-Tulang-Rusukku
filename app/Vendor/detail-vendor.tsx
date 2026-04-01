import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { CustomHeader } from '@/components/ui/CustomHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { dummyVendors, VENDOR_PLACEHOLDERS } from '@/data/dummy-vendor';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VendorDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>(); 

    const vendor = dummyVendors.find((v) => v.id === id);

    const [notes, setNotes] = useState('');
    
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [tempDay, setTempDay] = useState<string>('01');
    const [tempMonth, setTempMonth] = useState<string>('01');
    const [tempYear, setTempYear] = useState<string>(new Date().getFullYear().toString());

    const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
    const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const CURRENT_YEAR = new Date().getFullYear();
    const YEARS = Array.from({ length: 5 }, (_, i) => String(CURRENT_YEAR + i));

    if (!vendor) {
        return (
            <SafeAreaView style={styles.container}>
                <CustomHeader title="Detail Tidak Ditemukan" />
                <View style={styles.centerContent}>
                    <Text style={typography.variants.body}>Vendor tidak ditemukan.</Text>
                    <PrimaryButton title="Kembali" onPress={() => router.back()} style={{ marginTop: 20, width: 200 }} />
                </View>
            </SafeAreaView>
        );
    }

    const getHeaderTitle = () => {
        if (vendor.category === 'EO') return 'Pemesanan EO';
        if (vendor.category === 'Konselor') return 'Penjadwalan Konselor';
        return 'Pembelian Hadiah'; 
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title={getHeaderTitle()} />

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    <Image source={{ uri: vendor.image }} style={styles.mainImage} />

                    <View style={styles.infoHeader}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.vendorTitle}>{vendor.name}</Text>
                            {vendor.type === 'service' && vendor.providerName  && (
                                <View >
                                    <Text style={[styles.providerName, { flex: 1 }]} numberOfLines={1}>{vendor.providerName}</Text>
                                    {vendor.affiliation ? (
                                        <Text numberOfLines={1}>{vendor.affiliation}</Text>
                                    ) : null}
                                </View>
                            )}
                        </View>
                        <Text style={styles.vendorPrice}>
                            {vendor.price === 0 ? 'Gratis' : `Rp ${vendor.price.toLocaleString('id-ID')}`}
                        </Text>
                    </View>

                  
                    {vendor.type === 'product' ? (
                        <View style={styles.formSection}>
                            <Text style={styles.sectionLabel}>Pesan / Kartu Ucapan:</Text>
                            <View style={styles.textAreaContainer}>
                                {/* <Ionicons name="pencil" size={16} color="#9CA3AF" style={{ marginTop: 4, marginRight: 8 }} /> */}
                                <TextInput
                                    style={styles.textArea}
                                    multiline
                                    placeholder={VENDOR_PLACEHOLDERS[vendor.category] || "Ketik pesan di sini..."}
                                    placeholderTextColor="#9CA3AF"
                                    value={notes}
                                    onChangeText={setNotes}
                                />
                            </View>

                            <Text style={styles.sectionLabel}>Tanggal Pengiriman</Text>
                            <View style={styles.dateDropdownRow}>
                                <TouchableOpacity
                                    style={styles.mockDropdown}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        // initialize temp values from selectedDate if present
                                        if (selectedDate) {
                                            const parts = selectedDate.split('-');
                                            if (parts.length === 3) {
                                                setTempDay(parts[0]);
                                                setTempMonth(parts[1]);
                                                setTempYear(parts[2]);
                                            }
                                        }
                                        setDateModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.mockDropdownText}>{selectedDate ? selectedDate.split('-')[0] : 'dd'}</Text>
                                    <Ionicons name="chevron-down" size={14} color="#666"/>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.mockDropdown}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        if (selectedDate) {
                                            const parts = selectedDate.split('-');
                                            if (parts.length === 3) {
                                                setTempDay(parts[0]);
                                                setTempMonth(parts[1]);
                                                setTempYear(parts[2]);
                                            }
                                        }
                                        setDateModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.mockDropdownText}>{selectedDate ? selectedDate.split('-')[1] : 'mm'}</Text>
                                    <Ionicons name="chevron-down" size={14} color="#666"/>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.mockDropdown}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        if (selectedDate) {
                                            const parts = selectedDate.split('-');
                                            if (parts.length === 3) {
                                                setTempDay(parts[0]);
                                                setTempMonth(parts[1]);
                                                setTempYear(parts[2]);
                                            }
                                        }
                                        setDateModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.mockDropdownText}>{selectedDate ? selectedDate.split('-')[2] : 'yyyy'}</Text>
                                    <Ionicons name="chevron-down" size={14} color="#666"/>
                                </TouchableOpacity>
                            </View>

                            <Modal
                                visible={dateModalVisible}
                                transparent
                                animationType="fade"
                                onRequestClose={() => setDateModalVisible(false)}
                            >
                                <Pressable style={styles.modalOverlay} onPress={() => setDateModalVisible(false)}>
                                    <Pressable style={styles.modalContent}>
                                        <View style={styles.modalHeader}>
                                            <Text style={styles.modalTitle}>Pilih Tanggal Pengiriman</Text>
                                            <TouchableOpacity onPress={() => setDateModalVisible(false)}>
                                                <Ionicons name="close-circle" size={24} color="#9CA3AF" />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.pickerRow}>
                                            <ScrollView style={styles.pickerColumn}>
                                                {DAYS.map((d) => (
                                                    <TouchableOpacity key={d} style={styles.pickerItem} onPress={() => setTempDay(d)}>
                                                        <Text style={[styles.pickerItemText, tempDay === d && styles.pickerItemActive]}>{d}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>

                                            <ScrollView style={styles.pickerColumn}>
                                                {MONTHS.map((m) => (
                                                    <TouchableOpacity key={m} style={styles.pickerItem} onPress={() => setTempMonth(m)}>
                                                        <Text style={[styles.pickerItemText, tempMonth === m && styles.pickerItemActive]}>{m}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>

                                            <ScrollView style={styles.pickerColumn}>
                                                {YEARS.map((y) => (
                                                    <TouchableOpacity key={y} style={styles.pickerItem} onPress={() => setTempYear(y)}>
                                                        <Text style={[styles.pickerItemText, tempYear === y && styles.pickerItemActive]}>{y}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
                                            <TouchableOpacity style={{ marginRight: 12 }} onPress={() => setDateModalVisible(false)}>
                                                <Text style={{ color: '#666' }}>Batal</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                setSelectedDate(`${tempDay}-${tempMonth}-${tempYear}`);
                                                setDateModalVisible(false);
                                            }}>
                                                <Text style={{ color: '#EF4444', fontWeight: '700' }}>Pilih</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Pressable>
                                </Pressable>
                            </Modal>
                        </View>
                    ) : (
                        <View style={styles.formSection}>
                            <Text style={styles.sectionLabel}>
                                Pilih Tanggal {vendor.category === 'Konselor' ? 'Konseling' : 'Kencan'}:
                            </Text>
                            <View style={styles.pillsRow}>
                                {vendor.availableDates.map((date) => (
                                    <TouchableOpacity 
                                        key={date} 
                                        style={[styles.pillBtn, selectedDate === date && styles.pillBtnActive]}
                                        onPress={() => setSelectedDate(date)}
                                    >
                                        <Text style={[styles.pillText, selectedDate === date && styles.pillTextActive]}>{date}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.sectionLabel}>
                                Pilih Jam {vendor.category === 'Konselor' ? 'Luang' : ''}:
                            </Text>
                            <View style={styles.pillsRow}>
                                {vendor.availableTimes.map((time) => (
                                    <TouchableOpacity 
                                        key={time} 
                                        style={[styles.pillBtn, selectedTime === time && styles.pillBtnActive]}
                                        onPress={() => setSelectedTime(time)}
                                    >
                                        <Text style={[styles.pillText, selectedTime === time && styles.pillTextActive]}>{time}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.sectionLabel}>
                                {vendor.category === 'Konselor' ? 'Topik / Keluhan (Opsional):' : 'Catatan Khusus (Opsional):'}
                            </Text>
                            <View style={styles.textAreaContainer}>
                                <Ionicons name="pencil" size={16} color="#9CA3AF" style={{ marginTop: 4, marginRight: 8 }} />
                                <TextInput
                                    style={styles.textArea}
                                    multiline
                                    placeholder={VENDOR_PLACEHOLDERS[vendor.category] || "Ketik catatan di sini..."}
                                    placeholderTextColor="#9CA3AF"
                                    value={notes}
                                    onChangeText={setNotes}
                                />
                            </View>
                        </View>
                    )}

                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.bottomSection}>
                <PrimaryButton 
                    title={`Bayar Langsung - Rp ${vendor.price.toLocaleString('id-ID')}`} 
                    onPress={() => console.log('Proses Pembayaran')}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary || '#FFF5F7',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 10,
    },
    
    mainImage: {
        width: '100%',
        height: 300,
        borderRadius: 24,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 25,
    },
    titleWrapper: {
        flex: 1,
        paddingRight: 10,
    },
    vendorTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    providerName: {
        fontSize: 13,
        color: '#888',
    },
    affiliationText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    vendorPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },

    formSection: {
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
        marginTop: 5,
    },
    
    textAreaContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        borderColor: '#E5E5EA',
        borderRadius: 16,
        padding: 15,
        marginBottom: 25,
        minHeight: 100,
    },
    textArea: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        textAlignVertical: 'top',
    },

    pillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 25,
    },
    pillBtn: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 2,
        borderColor: '#E5E5EA',
    },
    pillBtnActive: {
        backgroundColor: colors.background.pink || '#FDF2F8',
        borderColor: colors.navbar.pink || '#EFA7C2',
    },
    pillText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    pillTextActive: {
        color: '#333',
        fontWeight: '700',
    },

    dateDropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    mockDropdown: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        borderColor: '#E5E5EA',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginHorizontal: 4, 
    },
    mockDropdownText: {
        fontSize: 14,
        color: '#666',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        maxHeight: '60%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pickerColumn: {
        flex: 1,
        marginHorizontal: 6,
    },
    pickerItem: {
        paddingVertical: 10,
    },
    pickerItemText: {
        textAlign: 'center',
        color: '#444',
    },
    pickerItemActive: {
        color: '#EF4444',
        fontWeight: '700',
    },

    bottomSection: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: colors.background.primary || '#FFF5F7',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
});