import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface Props {
  title: string;
  message: string;
  variant?: 'info' | 'warning' | 'success';
}

export default function TipBox({
  title,
  message,
  variant = 'info',
}: Props) {
  const bg =
    variant === 'warning'
      ? COLORS.warningBg
      : variant === 'success'
      ? COLORS.successBg
      : COLORS.infoBg;
  const border =
    variant === 'warning'
      ? COLORS.warning
      : variant === 'success'
      ? COLORS.success
      : COLORS.info;

  return (
    <View
      style={[styles.box, { backgroundColor: bg, borderLeftColor: border }]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 18,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  message: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 20,
  },
});