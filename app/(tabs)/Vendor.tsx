import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { CustomHeader } from '@/components/ui/CustomHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { VendorSearchHeader } from '@/components/ui/VendorSearchHeader';
import { dummyVendors, VendorModel } from '@/data/dummy-vendor';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = ['Semua', 'Bunga', 'Chocolate', 'EO', 'Konselor'];

export default function VendorCatalogScreen() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    const [searchText, setSearchText] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Jakarta Barat');

    const filteredVendors = dummyVendors.filter((vendor) => {
        const matchCategory = activeCategory === 'Semua' || vendor.category === activeCategory;
        const matchSearch = vendor.name.toLowerCase().includes(searchText.toLowerCase());
        return matchCategory && matchSearch;
    });

    const renderVendorCard = ({ item }: { item: VendorModel }) => {
        return (
            <TouchableOpacity
                style={styles.cardContainer}
                activeOpacity={0.8}
                onPress={() => router.push(`/Vendor/detail-vendor?id=${item.id}`)}
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
                        <Text style={styles.providerText}>{item.providerName}</Text>
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
                    <TouchableOpacity onPress={() => router.push('/Vendor/HistoryVendor')}>
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
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsContainer}
                >
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <TouchableOpacity
                                key={cat}
                                style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                                onPress={() => setActiveCategory(cat)}
                            >
                                <Text style={[typography.variants.body, isActive && typography.variants.body]}>{cat}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

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
    tabsContainer: {
        paddingHorizontal: 24,
        gap: 15,
    },
    tabBtn: {
        marginBottom:20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        // backgroundColor: colors.background.secondary,
        borderWidth: 3,
        borderColor: '#E5E5EA',
        marginRight: 5,
    },
    tabBtnActive: {
        backgroundColor: colors.background.pink,
        borderColor: '#E5E5EA',
    },

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