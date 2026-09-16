import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { fetchBursaries, Bursary } from '../services/bursaryService';
import { COLORS } from '../constants/colors';
import BursaryCard from '../components/BursaryCard';
import FilterChips from '../components/FilterChips';

export default function DirectoryScreen() {
  const [bursaries, setBursaries] = useState<Bursary[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchBursaries();
    setBursaries(data);
  };

  const filters = ['All', 'Government', 'Sasol', 'Allan Gray'];

  const filteredData =
    filter === 'All'
      ? bursaries
      : bursaries.filter((b) => b.provider === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bursary Directory</Text>

      <FilterChips
        options={filters}
        selected={filter}
        onSelect={setFilter}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BursaryCard bursary={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 40,
    marginBottom: 15,
  },
});