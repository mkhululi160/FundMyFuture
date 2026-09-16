import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Bursary } from '../services/bursaryService';
import { COLORS } from '../constants/colors';

interface Props {
  bursary: Bursary;
}

export default function BursaryCard({ bursary }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{bursary.name}</Text>
        <Text style={styles.provider}>{bursary.provider}</Text>
      </View>

      <Text style={styles.desc}>{bursary.description}</Text>

      <Text style={styles.meta}>
        📚 {bursary.fieldOfStudy.join(', ')}
      </Text>
      <Text style={styles.meta}>
        📊 Min Average: {bursary.minAverage}%
      </Text>
      <Text style={styles.meta}>
        💰 Max Income: R{bursary.householdIncomeMax.toLocaleString()}
      </Text>
      <Text style={styles.deadline}>
        📅 Closes: {bursary.closingDate}
      </Text>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(bursary.applicationUrl)}
      >
        <Text style={styles.applyText}>Visit Application Site →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1,
  },
  provider: {
    fontSize: 11,
    color: COLORS.textMuted,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  desc: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 10,
    lineHeight: 18,
  },
  meta: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  deadline: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: 'bold',
    marginTop: 6,
  },
  applyBtn: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  applyText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});