import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
} from 'react-native';
import { Job } from '../services/jobService';
import { COLORS } from '../constants/colors';
import PayBreakdown from '../components/PayBreakdown';
import { isJobWorthIt } from '../utils/transportCalculator';

export default function JobDetailScreen({ route, navigation }: any) {
  const { job } = route.params as { job: Job };
  const [customTransport, setCustomTransport] = useState(
    job.estimatedTransportCost.toString()
  );

  const transportNum = parseFloat(customTransport) || 0;
  const netPay = job.dailyWage - transportNum;
  const worthIt = isJobWorthIt(netPay);

  const applyForJob = () => {
    Linking.openURL(`tel:${job.contact}`);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Text style={styles.backText}>← Back to Gigs</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.business}>{job.business}</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>⏱ {job.duration}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>📍 {job.distanceKm}km away</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Job Description</Text>
      <Text style={styles.description}>{job.description}</Text>

      <Text style={styles.sectionTitle}>Skills Required</Text>
      <View style={styles.skillsRow}>
        {job.skillsRequired.map((skill, i) => (
          <View key={i} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>💰 Take-Home Calculator</Text>

      <View style={styles.transportInputRow}>
        <Text style={styles.transportLabel}>Transport cost (R)</Text>
        <TextInput
          style={styles.transportInput}
          keyboardType="numeric"
          value={customTransport}
          onChangeText={setCustomTransport}
        />
      </View>

      <PayBreakdown
        gross={job.dailyWage}
        transport={transportNum}
        net={netPay}
        worthIt={worthIt}
      />

      <TouchableOpacity style={styles.applyBtn} onPress={applyForJob}>
        <Text style={styles.applyText}>📞 Contact Business to Apply</Text>
      </TouchableOpacity>

      <Text style={styles.contactNote}>Contact: {job.contact}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: 20 },
  backBtn: { marginTop: 40, marginBottom: 20 },
  backText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 15 },
  header: { marginBottom: 25 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary },
  business: { fontSize: 16, color: COLORS.textLight, marginTop: 5 },
  tagRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  tag: {
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
  description: { fontSize: 15, color: COLORS.textLight, lineHeight: 22 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skillText: { fontSize: 12, color: COLORS.textLight },
  transportInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transportLabel: { fontSize: 15, color: COLORS.textLight },
  transportInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 8,
    width: 100,
    textAlign: 'center',
    fontSize: 16,
  },
  applyBtn: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  applyText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  contactNote: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 10,
    marginBottom: 40,
  },
});