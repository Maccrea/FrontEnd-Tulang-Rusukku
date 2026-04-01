import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { CategoryTabs } from '@/components/ui/CategoryTab';
import { CustomHeader } from '@/components/ui/CustomHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SegmentedControl } from '@/components/ui/TabBar';
import { VendorSearchHeader } from '@/components/ui/VendorSearchHeader';
import { dummyVendors, VendorModel } from '@/data/dummy-vendor';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = ['Semua', 'Bunga', 'Chocolate', 'EO', 'Konselor'];

export default function VendorCatalogScreen() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    const [activeKonselorType, setActiveKonselorType] = useState<'Gratis' | 'Profesional'>('Gratis');
    
    const [searchText, setSearchText] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Jakarta Barat');

    const filteredVendors = dummyVendors.filter((vendor) => {
        const matchCategory = activeCategory === 'Semua' || vendor.category === activeCategory;
        const matchSearch = vendor.name.toLowerCase().includes(searchText.toLowerCase());
        
        let matchKonselorType = true;
        if (activeCategory === 'Konselor' && vendor.type === 'service') {
            matchKonselorType = vendor.badgeType === activeKonselorType;
        }

        return matchCategory && matchSearch && matchKonselorType;
    });

    const handleCategorySelect = (cat: string) => {
        setActiveCategory(cat);
        // Reset ke Gratis setiap kali buka tab Konselor
        if (cat === 'Konselor') setActiveKonselorType('Gratis');
    };

    const renderVendorCard = ({ item }: { item: VendorModel }) => {
        return (
            <TouchableOpacity
                style={styles.cardContainer}
                activeOpacity={0.8}
                onPress={() => router.push(`/Vendor/detail-vendor?id=${item.id}` as any)}
            >
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />

                    {item.type === 'service' && item.badgeType && (
                        <View style={[styles.badge, item.badgeType === 'Gratis' ? styles.badgeFree : styles.badgePro]}>
                            <Text style={styles.badgeText}>
                                {item.badgeType === 'Gratis' ? '💚 Gratis' : '👑 Profesional'}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>

                    {item.type === 'service' && item.providerName && (
                        <Text style={styles.providerText}>
                            {item.providerName}{' '}
                            {('affiliation' in item && item.affiliation) ? <Text style={{ color: '#888', fontSize: 11 }}>• {item.affiliation}</Text> : null}
                        </Text>
                    )}

                    <View style={styles.priceContainer}>
                        <Text style={[typography.variants.body, styles.priceText]}>
                            {item.price === 0 ? 'Gratis' : `Rp ${item.price.toLocaleString('id-ID')}`}
                        </Text>
                        
                        {item.type === 'service' && item.durationSesi && (
                            <Text style={styles.durationText}>
                                1 Sesi ({item.durationSesi})
                            </Text>
                        )}
                    </View>

                    <PrimaryButton
                        title={item.actionText}
                        onPress={() => console.log('Action ditekann:', item.id)}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader 
                title='Vendor' 
                rightContent={
                    <TouchableOpacity onPress={() => router.push('/Vendor/order-vendor')}>
                        <Ionicons name="receipt" size={24} color="#333" />
                    </TouchableOpacity>
                }
            />

            <VendorSearchHeader
                searchText={searchText}
                onSearchChange={setSearchText}
                location={selectedLocation}               
                onLocationChange={setSelectedLocation}
            />
            <View>
                <CategoryTabs 
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onSelectCategory={handleCategorySelect}
                />
            </View>

            {activeCategory === 'Konselor' && (
                <SegmentedControl
                    options={[
                        { label: '💚 Gratis', value: 'Gratis' },
                        { label: '👑 Profesional', value: 'Profesional' }
                    ]}
                    activeValue={activeKonselorType}
                    onSelect={(val) => setActiveKonselorType(val as 'Gratis' | 'Profesional')}
                    containerStyle={{ marginHorizontal: 24, marginBottom: 20 }}
                />
            )}

            <FlatList
                data={filteredVendors}
                keyExtractor={(item) => item.id}
                renderItem={renderVendorCard}
                numColumns={2}
                columnWrapperStyle={styles.rowWrapper}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Yah, vendor tidak ditemukan.</Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary || '#FFF5F7',
    },
    
    // 👇 CATATAN: styles.tabsContainer, tabBtn, dan tabBtnActive SUDAH DIHAPUS DARI SINI
    
    listContainer: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    rowWrapper: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 50,
    },

    cardContainer: {
        width: '48%',
        backgroundColor: 'transparent',
    },
    imageWrapper: {
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 10,
    },
    cardImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    badgeFree: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    badgePro: {
        backgroundColor: 'rgba(255, 223, 186, 0.9)',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#333',
    },
    cardContent: {
        paddingHorizontal: 4,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    providerText: {
        fontSize: 11,
        color: '#888',
        marginBottom: 4,
    },
    priceText: {
        fontSize: 13,
        color: '#444',
        marginBottom: 5,
    },
    priceContainer: {
        marginBottom: 10,
        marginTop: 2,
    },
    durationText: {
        fontSize: 11,
        color: '#888',
        marginTop: 2, 
    },
});