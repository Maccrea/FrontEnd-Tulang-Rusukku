import { colors } from '@/Theme/color';
import { CustomHeader } from '@/components/ui/CustomHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { dummyOrderHistory, OrderCategory, OrderStatus } from '@/data/dummy-order';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const orderData = dummyOrderHistory.find((o) => o.id === id);

    const [liveStatus, setLiveStatus] = useState<OrderStatus | null>(orderData ? orderData.status : null);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const [showCopyModal, setShowCopyModal] = useState(false);

    useEffect(() => {
        if (orderData?.category === 'Konselor' && liveStatus === 'Menunggu Jadwal') {
            const timer = setTimeout(() => {
                setIsUpdating(true);
                setTimeout(() => {
                    setLiveStatus('Siap Dimulai');
                    setIsUpdating(false);
                }, 1500); 
            }, 4000); 
            return () => clearTimeout(timer);
        }
    }, [orderData, liveStatus]);

    if (!id || !orderData || !liveStatus) {
        return (
            <SafeAreaView style={styles.container}>
                <CustomHeader title="Detail Pesanan" />
                <View style={styles.centerContent}>
                    <Ionicons name="document-text-outline" size={60} color="#D1D5DB" />
                    <Text style={styles.errorText}>Pesanan tidak ditemukan atau ID tidak valid.</Text>
                    <PrimaryButton title="Kembali" onPress={() => router.back()} style={{ marginTop: 20, width: 150 }} />
                </View>
            </SafeAreaView>
        );
    }

    const getStepperData = (category: OrderCategory) => {
        if (category === 'Coklat' || category === 'Bunga') return ['Menunggu Konfirmasi', 'Diproses', 'On The Way', 'Selesai'];
        if (category === 'EO') return ['Menunggu Konfirmasi', 'Diproses', 'Selesai'];
        return ['Menunggu Jadwal', 'Siap Dimulai', 'Sesi Berakhir']; 
    };

    const steps = getStepperData(orderData.category);
    const currentStepIndex = steps.indexOf(liveStatus);
    const isOrderCompleted = liveStatus === 'Selesai' || liveStatus === 'Sesi Berakhir';

    const handleCopyId = () => {
        setShowCopyModal(true);
        setTimeout(() => {
            setShowCopyModal(false);
        }, 2000); 
    };

    const ProgressStepper = () => (
        <View style={styles.stepperContainer}>
            {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                
                return (
                    <View key={step} style={styles.stepWrapper}>
                        <View style={[
                            styles.stepCircle,
                            isCompleted ? styles.stepCircleCompleted : (isActive ? styles.stepCircleActive : null)
                        ]}>
                            {isCompleted ? (
                                <Ionicons name="checkmark" size={14} color="#FFF" />
                            ) : (
                                <View style={[styles.innerCircle, isActive ? styles.innerCircleActive : null]} />
                            )}
                        </View>
                        <Text style={[styles.stepLabel, (isActive || isCompleted) && styles.stepLabelActive]}>
                            {step}
                        </Text>
                        {index !== steps.length - 1 && (
                            <View style={[styles.stepLine, isCompleted && styles.stepLineCompleted]} />
                        )}
                    </View>
                );
            })}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title="Detail Pesanan" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.card}>
                    <View style={styles.orderIdRow}>
                        <View>
                            <Text style={styles.orderIdLabel}>No. Pesanan</Text>
                            <Text style={styles.orderIdValue}>{orderData.id.toUpperCase()}-TR2026</Text>
                        </View>
                        <TouchableOpacity style={styles.copyBtn} onPress={handleCopyId}>
                            <Text style={styles.copyBtnText}>Salin</Text>
                            <Ionicons name="copy-outline" size={14} color={colors.navbar.pink || '#EFA7C2'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.sectionTitle}>Status Pesanan</Text>
                        {isUpdating && <ActivityIndicator size="small" color={colors.navbar.pink || '#EFA7C2'} />}
                    </View>
                    
                    <ProgressStepper />

                    {liveStatus === 'Siap Dimulai' && (
                        <View style={styles.realtimeAlertBox}>
                            <Ionicons name="notifications" size={16} color="#10B981" />
                            <Text style={styles.realtimeAlertText}>
                                Sesi telah dimulai! Konselor sudah menunggu Anda.
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Rincian {orderData.category}</Text>
                    
                    <View style={styles.productRow}>
                        <Image source={{ uri: orderData.image }} style={styles.productImg} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productTitle}>{orderData.title}</Text>
                            {orderData.itemCount && <Text style={styles.productMeta}>{orderData.itemCount} Item</Text>}
                            <Text style={styles.productMeta}>{orderData.dateStr}</Text>
                            {orderData.timeStr && <Text style={styles.productMeta}>{orderData.timeStr}</Text>}
                        </View>
                    </View>

                    <View style={styles.notesBox}>
                        <Text style={styles.notesLabel}>Catatan / Kartu Ucapan:</Text>
                        <Text style={styles.notesText}>
                            {orderData.message
                                ? orderData.message
                                : (orderData.category === 'Coklat' || orderData.category === 'Bunga'
                                    ? '"Semoga kamu suka ya! Happy Valentine sayang ❤️"'
                                    : 'Tolong disiapkan dengan baik ya, terima kasih.')}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={[styles.sectionTitle, { fontSize: 14, marginBottom: 10 }]}>Rincian Pembayaran</Text>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Harga {orderData.category}</Text>
                        <View style={styles.priceBadgeMini}>
                            <Text style={styles.priceTextMini}>{orderData.priceDiamonds}</Text>
                            <Ionicons name="diamond" size={12} color="#3DA9FC" style={{ marginLeft: 2 }} />
                        </View>
                    </View>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Biaya Layanan</Text>
                        <View style={styles.priceBadgeMini}>
                            <Text style={styles.priceTextMini}>0</Text>
                            <Ionicons name="diamond" size={12} color="#3DA9FC" style={{ marginLeft: 2 }} />
                        </View>
                    </View>
                    <View style={[styles.paymentRow, { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F3F4F6' }]}>
                        <Text style={[styles.paymentLabel, { fontWeight: '700', color: '#333' }]}>Total Pembayaran</Text>
                        <View style={styles.priceBadge}>
                            <Text style={styles.priceText}>{orderData.priceDiamonds}</Text>
                            <Ionicons name="diamond" size={16} color="#3DA9FC" style={{ marginLeft: 4 }} />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Informasi Vendor</Text>
                    
                    <View style={styles.vendorBox}>
                        <View style={styles.vendorAvatar}>
                            <Ionicons name={orderData.category === 'EO' ? "business" : "person"} size={20} color="#666" />
                        </View>
                        <View style={styles.vendorInfo}>
                            <Text style={styles.vendorName}>{orderData.vendorName || orderData.location}</Text>
                            <Text style={styles.vendorStatus}>Terverifikasi</Text>
                        </View>
                        {/* <TouchableOpacity style={styles.iconBtn}>
                            <Ionicons name="call" size={20} color="#333" />
                        </TouchableOpacity> */}
                    </View>

                    {isOrderCompleted ? (
                        <PrimaryButton 
                            title="Beri Ulasan" 
                            onPress={() => console.log('Buka Modal Rating')}
                            style={{ marginTop: 15, backgroundColor: colors.navbar.pink || '#EFA7C2' }}
                        />
                    ) : (
                        <PrimaryButton 
                            title={liveStatus === 'On The Way' ? 'Lacak Kurir' : (orderData.category === 'Konselor' ? 'Chat Sekarang' : 'Chat Vendor')} 
                            disabled={orderData.category === 'Konselor' && liveStatus === 'Menunggu Jadwal'}
                            onPress={() => console.log('Buka Chat')}
                            style={{ marginTop: 15 }}
                        />
                    )}

                    {(orderData.category === 'Konselor' && liveStatus === 'Menunggu Jadwal') && (
                        <Text style={styles.disabledHintText}>
                            *Tombol chat akan otomatis aktif saat jadwal sesi dimulai.
                        </Text>
                    )}
                </View>

            </ScrollView>

            <Modal
                transparent={true}
                visible={showCopyModal}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.successIconBox}>
                            <Ionicons name="checkmark" size={32} color="#FFFFFF" />
                        </View>
                        <Text style={styles.modalTitle}>Berhasil Disalin!</Text>
                        <Text style={styles.modalText}>
                            Nomor Pesanan <Text style={{ fontWeight: '700' }}>{orderData.id.toUpperCase()}-TR2026</Text> telah disalin ke papan klip.
                        </Text>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary || '#FFF5F7' },
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    errorText: { fontSize: 14, color: '#888', marginTop: 10, textAlign: 'center' },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 },
    
    card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
    cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 16 },

    orderIdRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    orderIdLabel: { fontSize: 11, color: '#888', marginBottom: 2 },
    orderIdValue: { fontSize: 14, fontWeight: '700', color: '#333' },
    copyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF2F8', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, gap: 4 },
    copyBtnText: { fontSize: 12, color: colors.navbar.pink || '#EFA7C2', fontWeight: '600' },

    stepperContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 10 },
    stepWrapper: { alignItems: 'center', flex: 1, position: 'relative' },
    stepCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
    stepCircleActive: { backgroundColor: '#FDF2F8', borderWidth: 2, borderColor: colors.navbar.pink || '#EFA7C2' },
    stepCircleCompleted: { backgroundColor: '#10B981' },
    innerCircle: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D1D5DB' },
    innerCircleActive: { backgroundColor: colors.navbar.pink || '#EFA7C2' },
    stepLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 8, textAlign: 'center', width: 70 },
    stepLabelActive: { color: '#333', fontWeight: '600' },
    stepLine: { position: 'absolute', top: 11, left: '60%', right: '-40%', height: 2, backgroundColor: '#F3F4F6', zIndex: 1 },
    stepLineCompleted: { backgroundColor: '#10B981' },

    realtimeAlertBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5', padding: 12, borderRadius: 12, marginTop: 20 },
    realtimeAlertText: { fontSize: 12, color: '#065F46', fontWeight: '600', marginLeft: 8, flex: 1 },

    productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    productImg: { width: 60, height: 60, borderRadius: 12, backgroundColor: '#F3F4F6' },
    productInfo: { flex: 1, marginLeft: 12 },
    productTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 4 },
    productMeta: { fontSize: 12, color: '#666', marginBottom: 2 },
    
    notesBox: { backgroundColor: '#F9FAFB', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#F3F4F6' },
    notesLabel: { fontSize: 12, color: '#888', marginBottom: 4, fontWeight: '600' },
    notesText: { fontSize: 13, color: '#444', fontStyle: 'italic' },

    paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    paymentLabel: { fontSize: 13, color: '#666' },
    priceBadgeMini: { flexDirection: 'row', alignItems: 'center' },
    priceTextMini: { fontSize: 13, fontWeight: '600', color: '#333' },
    priceBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F9FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
    priceText: { fontSize: 16, fontWeight: '800', color: '#3DA9FC' },

    vendorBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF2F8', padding: 12, borderRadius: 16 },
    vendorAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
    vendorInfo: { flex: 1, marginLeft: 12 },
    vendorName: { fontSize: 15, fontWeight: '600', color: '#333' },
    vendorStatus: { fontSize: 11, color: '#10B981', fontWeight: '600', marginTop: 2 },
    iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
    
    disabledHintText: { fontSize: 11, color: '#EF4444', textAlign: 'center', marginTop: 8, fontStyle: 'italic' },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        width: '75%',
        padding: 24,
        borderRadius: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    successIconBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#10B981', 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#333',
        marginBottom: 8,
    },
    modalText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    }
});