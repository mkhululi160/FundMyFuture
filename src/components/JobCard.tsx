import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../services/jobService';
import { calculateNetPay, isJobWorthIt } from '../utils/transportCalculator';
import { COLORS } from '../constants/colors';

interface Props {
  job: Job;
  onPress: () => void;
}

export default function JobCard({ job, onPress }: Props) {
  const net = calculateNetPay(job);
  const worthIt = isJobWorthIt(net);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.business}>{job.business}</Text>
        </View>
        <View
          style={[
            styles.badge,
            job.transportMode === 'walk' && styles.walkBadge,
          ]}
        >
          <Text style={styles.badgeText}>
            {job.transportMode === 'walk' ? '🚶' : '🚕'} {job.distanceKm}km
          </Text>
        </View>
      </View>

      <View style={styles.payRow}>
        <View style={styles.payBox}>
          <Text style={styles.payLabel}>Gross</Text>
          <Text style={styles.payValue}>R{job.dailyWage}</Text>
        </View>
        <View style={styles.payBox}>
          <Text style={styles.payLabel}>Transport</Text>
          <Text style={[styles.payValue, { color: COLORS.danger }]}>
            -R{job.estimatedTransportCost}
          </Text>
        </View>
        <View style={styles.payBox}>
          <Text style={styles.payLabel}>Net Pay</Text>
          <Text
            style={[
              styles.payValue,
              {
                color: worthIt ? COLORS.success : COLORS.danger,
                fontWeight: 'bold',
              },
            ]}
          >
            R{net}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.duration}>⏱ {job.duration}</Text>
        <Text style={styles.view}>View Details →</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: { fontSize: 17, fontWeight: 'bold', color: COLORS.primary },
  business: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  badge: {
    backgroundColor: '#fff3e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  walkBadge: { backgroundColor: COLORS.successBg },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  payRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  payBox: { alignItems: 'center' },
  payLabel: { fontSize: 11, color: COLORS.textMuted, marginBottom: 4 },
  payValue: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  duration: { fontSize: 13, color: COLORS.textLight },
  view: { fontSize: 13, color: COLORS.primary, fontWeight: 'bold' },
});