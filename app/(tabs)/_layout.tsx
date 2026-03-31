import { Tabs } from 'expo-router';
import CustomTabBar from '../../components//CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs 
      tabBar={(props) => <CustomTabBar {...props} />} 
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="Vendor" />
      <Tabs.Screen name="Like" />
      <Tabs.Screen name="Char" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}