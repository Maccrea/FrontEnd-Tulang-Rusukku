import { colors } from "@/Theme/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, Platform, StatusBar, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import CustomTabBar from "../components/CustomTabBar";
import CustomTabs from "../components/CustomTabs";
import NotificationCard from "../components/NotificationCard";

export default function NotificationScreen() {
  const [activeTab, setActiveTab] = useState("semua");
  const [notifications, setNotifications] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadNotifications = async () => {
        try {
          const saved = await AsyncStorage.getItem("notifications");
          if (saved) {
            setNotifications(JSON.parse(saved));
          } else {
            setNotifications([]);
          }
        } catch (e) {}
      };
      loadNotifications();
    }, []),
  );

  const handleClearAll = async () => {
    setNotifications([]);
    await AsyncStorage.setItem("notifications", JSON.stringify([]));
  };

  const dynamicTabs = [
    { id: "semua", label: "Semua", count: notifications.length },
    {
      id: "social",
      label: "Social & Activity",
      count: notifications.filter((n) => n.tab === "social").length,
    },
    {
      id: "gift",
      label: "Gift",
      count: notifications.filter((n) => n.tab === "gift").length,
    },
    {
      id: "order",
      label: "Order",
      count: notifications.filter((n) => n.tab === "order").length,
    },
  ];

  const filteredNotifications = notifications.filter(
    (notif) => activeTab === "semua" || notif.tab === activeTab,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomHeader
          title="Notification"
          rightText="Clear All"
          onRightPress={handleClearAll}
        />

        <CustomTabs
          tabs={dynamicTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <NotificationCard
                key={notif.id}
                type={notif.type}
                title={notif.title}
                message={notif.message}
                time={notif.time}
                isUnread={notif.isUnread}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>Tidak ada notifikasi baru</Text>
          )}
        </ScrollView>
        {/* <CustomTabBar/> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FE",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 0.5 : 0.5,
  },
  content: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: colors.neutral[500],
    fontSize: 14,
  },
});