import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { fetchJobs, Job, calculateNetPay } from '../services/jobService';
import { COLORS } from '../constants/colors';
import JobCard from '../components/JobCard';

export default function JobsScreen({ navigation }: any) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await fetchJobs();
    const sorted = data.sort(
      (a, b) => calculateNetPay(b) - calculateNetPay(a)
    );
    setJobs(sorted);
  };

  const filters = ['All', 'Walking Distance', 'Taxi Route'];

  const filteredJobs =
    filter === 'All'
      ? jobs
      : filter === 'Walking Distance'
      ? jobs.filter((j) => j.transportMode === 'walk')
      : jobs.filter((j) => j.transportMode === 'taxi');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Local Gigs</Text>
      <Text style={styles.subtitle}>
        See what you actually take home after transport.
      </Text>

      <View style={styles.filterRow}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterSelected]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextSelected,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onPress={() => navigation.navigate('JobDetail', { job })}
        />
      ))}

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Transport Tip</Text>
        <Text style={styles.tipText}>
          A job paying R300 may only be worth R200 if you spend R100 on taxis.
          Always check the Net Pay!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 20,
    marginTop: 5,
  },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  filterBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.border,
  },
  filterSelected: { backgroundColor: COLORS.primary },
  filterText: { color: COLORS.text },
  filterTextSelected: { color: COLORS.white },
  tipBox: {
    backgroundColor: COLORS.infoBg,
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  tipTitle: { fontSize: 15, fontWeight: 'bold', color: '#1565c0' },
  tipText: {
    fontSize: 13,
    color: '#1976d2',
    marginTop: 5,
    lineHeight: 20,
  },
});