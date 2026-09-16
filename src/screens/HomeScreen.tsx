import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants/colors';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Student 👋</Text>
        <Text style={styles.title}>FundMyFuture</Text>
        <Text style={styles.subtitle}>
          Your journey to funding starts here.
        </Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Application Overview</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Submitted</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate('Matcher')}
      >
        <Text style={styles.actionIcon}>🎯</Text>
        <View>
          <Text style={styles.actionTitle}>Find My Funding</Text>
          <Text style={styles.actionDesc}>
            Answer 5 questions to find bursaries you qualify for.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate('Directory')}
      >
        <Text style={styles.actionIcon}>📚</Text>
        <View>
          <Text style={styles.actionTitle}>Browse Bursaries</Text>
          <Text style={styles.actionDesc}>
            Search NSFAS, Sasol, Allan Gray, and more.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate('Vault')}
      >
        <Text style={styles.actionIcon}>🔒</Text>
        <View>
          <Text style={styles.actionTitle}>Document Vault</Text>
          <Text style={styles.actionDesc}>
            Store your ID, matric results, and proof of income.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate('Jobs')}
      >
        <Text style={styles.actionIcon}>💼</Text>
        <View>
          <Text style={styles.actionTitle}>Find Local Gigs</Text>
          <Text style={styles.actionDesc}>
            See jobs near you with transport cost calculated.
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Tip of the Day</Text>
        <Text style={styles.tipText}>
          Apply for NSFAS before the November deadline. It covers tuition and
          living expenses.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  header: { marginTop: 40, marginBottom: 20 },
  greeting: { fontSize: 16, color: COLORS.textLight },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary },
  subtitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },
  statsCard: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  statsTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { alignItems: 'center' },
  statNumber: { color: COLORS.white, fontSize: 28, fontWeight: 'bold' },
  statLabel: { color: COLORS.primaryLight, fontSize: 12, marginTop: 4 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  actionCard: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  actionIcon: { fontSize: 32, marginRight: 15 },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
    maxWidth: '80%',
  },
  tipBox: {
    backgroundColor: COLORS.warningBg,
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  tipTitle: { fontSize: 15, fontWeight: 'bold', color: '#5d4037' },
  tipText: {
    fontSize: 13,
    color: '#6d4c41',
    marginTop: 5,
    lineHeight: 20,
  },
});