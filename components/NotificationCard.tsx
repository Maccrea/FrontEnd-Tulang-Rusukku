import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '@/Theme/color';
import { typography } from '@/Theme/typography';

interface NotificationCardProps {
  type: 'match' | 'like' | 'system';
  title: string;
  message: string;
  time: string;
  isUnread?: boolean;
  avatarUrl?: any;
}

export default function NotificationCard({ type, title, message, time, isUnread, avatarUrl }: NotificationCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.cardContainer, isUnread && styles.unreadBackground]}>
      
      {avatarUrl ? (
        <Image source={avatarUrl} style={styles.avatar} />
      ) : (
        <View style={styles.iconPlaceholder}>
          <Text style={styles.iconText}>✨</Text>
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={[typography.variants.body, styles.title, isUnread && styles.boldText]}>
          {title}
        </Text>
        <Text style={[typography.variants.caption, styles.message]} numberOfLines={2}>
          {message}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.timeText}>{time}</Text>
        {isUnread && <View style={styles.unreadDot} />}
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
  },
  unreadBackground: {
    backgroundColor: '#FFF0F7',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.navbar.pink,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: colors.neutral[900],
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  message: {
    color: colors.neutral[600],
    lineHeight: 18,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 12,
    color: colors.neutral[400],
    marginBottom: 8,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.navbar.pink,
  },
});