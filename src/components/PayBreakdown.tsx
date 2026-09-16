import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface Props {
  gross: number;
  transport: number;
  net: number;
  worthIt: boolean;
}

export default function PayBreakdown({
  gross,
  transport,
  net,
  worthIt,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Gross Daily Wage</Text>
        <Text style={styles.value}>R{gross}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transport Cost</Text>
        <Text style={[styles.value, { color: COLORS.danger }]}>
          -R{transport}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.netLabel}>Net Take-Home</Text>
        <Text
          style={[
            styles.netValue,
            { color: worthIt ? COLORS.success : COLORS.danger },
          ]}
        >
          R{net}
        </Text>
      </View>
      {!worthIt && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            ⚠️ Below R100/day. Consider if it's worth your time.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: { fontSize: 15, color: COLORS.textLight },
  value: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  netLabel: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  netValue: { fontSize: 22, fontWeight: 'bold' },
  warning: {
    backgroundColor: COLORS.dangerBg,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  warningText: {
    fontSize: 12,
    color: '#c62828',
    lineHeight: 18,
  },
});