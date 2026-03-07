import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import CustomInput from '@/components/CustomInput';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';
import { router, useRouter } from "expo-router";
import { Route } from 'expo-router/build/Route';

export default function RegisterScreen() {
    const router = useRouter();
    const [nama, setNama] = useState('');
    const [suku, setSuku] = useState('');
    const [tempatLahir, setTempatLahir] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [monthBirth, setMonthBirth] = useState('');
    const [yearBirth, setYearBirth] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
              <ScrollView contentContainerStyle={styles.scrollContent}>

              </ScrollView>
        </SafeAreaView>
    );
}