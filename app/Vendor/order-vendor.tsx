import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { CustomHeader } from '@/components/ui/CustomHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { dummyOrderHistory, OrderHistoryModel } from '@/data/dummy-order';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = [
    { id: 'Semua', label: 'Semua', count: 13 },
    { id: 'Coklat', label: 'Coklat', count: 10 },
    { id: 'Bunga', label: 'Bunga', count: 20 },
    { id: 'EO', label: 'EO' },
    { id: 'Konselor', label: 'Konselor' },
];

const SUB_FILTERS: Record<string, string[]> = {
    'Semua': ['Semua', 'Menunggu Konfirmasi', 'Diproses', 'On The Way', 'Selesai'],
    'Coklat': ['Semua', 'Menunggu Konfirmasi', 'Diproses', 'On The Way', 'Selesai'],
    'Bunga': ['Semua', 'Menunggu Konfirmasi', 'Diproses', 'On The Way', 'Selesai'],
    'EO': ['Semua', 'Menunggu Konfirmasi', 'Diproses', 'Selesai'],
    'Konselor': ['Semua', 'Menunggu Jadwal', 'Siap Dimulai', 'Sesi Berakhir'],
};

export default function HistoryVendor() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Semua');
    const [activeSubFilter, setActiveSubFilter] = useState('Semua');

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setActiveSubFilter('Semua'); 
    };

    const filteredOrders = dummyOrderHistory.filter((order) => {
        const matchTab = activeTab === 'Semua' || order.category === activeTab;
        const matchSubFilter = activeSubFilter === 'Semua' || order.status.includes(activeSubFilter);
        return matchTab && matchSubFilter;
    });

    const getStatusColor = (status: string) => {
        if (status.includes('Selesai') || status.includes('Berakhir')) return '#10B981';
        if (status.includes('Diproses') || status.includes('On The Way') || status.includes('Dimulai')) return '#3B82F6'; 
        return '#D97706'; 
    };

    const getActionButtonText = (item: OrderHistoryModel) => {
        if (item.category === 'Konselor' && item.status.includes('Menunggu')) return 'Chat Sekarang';
        if (item.status === 'On The Way') return 'Lacak';
        return 'Chat Vendor';
    };

    const renderOrderCard = ({ item }: { item: OrderHistoryModel }) => {
        const displayStatus = item.status;
        const statusColor = getStatusColor(displayStatus);
        const isCompleted = displayStatus === 'Selesai' || displayStatus === 'Sesi Berakhir';

        return (
            <TouchableOpacity 
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => router.push(`/Vendor/detail-history-order?id=${item.id}` as any)}            >
                <View style={styles.cardHeader}>
                    <View style={styles.bundleBadge}>
                        <Text style={styles.bundleText}>{item.bundleId}</Text>
                    </View>
                    <Text style={[styles.statusText, { color: statusColor }]}>{displayStatus}</Text>
                </View>

                <View style={styles.cardContent}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    
                    <View style={styles.cardInfo}>
                        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                        
                        <View style={styles.itemMetaRow}>
                            {(item.category === 'Coklat' || item.category === 'Bunga') && (
                                <Text style={styles.itemMeta}>{item.itemCount} Item • </Text>
                            )}
                            <Text style={styles.itemMeta}>{item.dateStr}</Text>
                        </View>

                        {item.timeStr && <Text style={styles.itemMeta}>{item.timeStr}</Text>}
                        
                        <View style={styles.vendorRow}>
                            <Ionicons 
                                name={item.category === 'EO' ? "location" : "person"} 
                                size={12} 
                                color="#888" 
                            />
                            <Text style={styles.vendorNameText}>
                                {item.category === 'EO' ? item.location : item.vendorName}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.priceCol}>
                        <Text style={styles.priceNumber}>{item.priceDiamonds}</Text>
                        <Ionicons name="diamond" size={16} color="#3DA9FC" style={{ marginLeft: 4 }} />
                    </View>
                </View>

                {!isCompleted && (
                    <View style={styles.actionContainer}>
                        <PrimaryButton 
                            title={getActionButtonText(item)} 
                            onPress={() => router.push(`/vendor/order/${item.id}` as any)} 
                        />
                    </View>
                )}
            </TouchableOpacity> 
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title="Riwayat Pemesanan" />

            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mainTabsContainer}>
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <TouchableOpacity 
                                key={tab.id} 
                                style={styles.mainTabBtn} 
                                onPress={() => handleTabChange(tab.id)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.tabLabelRow}>
                                    <Text style={[typography.variants.body, isActive && styles.mainTabTextActive]}>
                                        {tab.label}
                                    </Text>
                                    {tab.count && (
                                        <View style={styles.badgeCount}>
                                            <Text style={styles.badgeCountText}>{tab.count}</Text>
                                        </View>
                                    )}
                                </View>
                                {isActive && <View style={styles.activeTabIndicator} />}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <View>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.pillsContainer}
                >
                    {SUB_FILTERS[activeTab].map((filter) => {
                        const isActive = activeSubFilter === filter;
                        return (
                            <TouchableOpacity 
                                key={filter} 
                                style={[styles.pillBtn, isActive && styles.pillBtnActive]}
                                onPress={() => setActiveSubFilter(filter)}
                                activeOpacity={0.7}
                            >
                                <Text style={[typography.variants.body, isActive && styles.pillTextActive]}>
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderCard}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Belum ada riwayat pesanan.</Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary || '#FFF5F7' },

    mainTabsContainer: { flexDirection: 'row', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA', marginBottom: 15, paddingRight: 30 },
    mainTabBtn: { paddingVertical: 12, paddingHorizontal: 8, marginRight: 15, position: 'relative' },
    tabLabelRow: { flexDirection: 'row', alignItems: 'center' },
    mainTabText: { fontSize: 14, color: '#888', fontWeight: '500' },
    mainTabTextActive: { color: '#333', fontWeight: '700' },
    badgeCount: { backgroundColor: '#F3D2E3', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 6 },
    badgeCountText: { fontSize: 10, color: '#A855F7', fontWeight: '700' },
    activeTabIndicator: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, backgroundColor: '#333', borderRadius: 2 },

    pillsContainer: { paddingHorizontal: 20, gap: 5, marginBottom: 20 },
    pillBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#D1D5DB', marginRight: 10 },
    pillBtnActive: { borderColor: '#333', borderWidth: 1.5 },
    pillText: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
    pillTextActive: { color: '#333', fontWeight: '700' },

    listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
    emptyText: { textAlign: 'center', color: '#888', marginTop: 50 },

    card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    bundleBadge: { backgroundColor: '#FDF2F8', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    bundleText: { fontSize: 11, color: '#333', fontWeight: '600' },
    statusText: { fontSize: 12, fontWeight: '700' },
    
    cardContent: { flexDirection: 'row' },
    cardImage: { width: 60, height: 60, borderRadius: 12, backgroundColor: '#F3F4F6' },
    cardInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
    itemTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 4 },
    itemMetaRow: { flexDirection: 'row', alignItems: 'center' },
    itemMeta: { fontSize: 12, color: '#888' },
    vendorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    vendorNameText: { fontSize: 12, color: '#888', marginLeft: 4, fontWeight: '500' },
    
    priceCol: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end', minWidth: 50 },
    priceNumber: { fontSize: 16, fontWeight: '800', color: '#333' },
    
    actionContainer: { marginTop: 16 },
});