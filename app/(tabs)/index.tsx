import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import OnBoard from "./OnBoard";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkUserData();
  }, []);

  const checkUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user_register');
      const profileData = await AsyncStorage.getItem('@profile_data');
      
      if (userData && profileData) {
        router.push('/(tabs)/Profile');
      }
    } catch (error) {
      console.log('Error checking user data:', error);
    }
  };

  return <OnBoard />;
}