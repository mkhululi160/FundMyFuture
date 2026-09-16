import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface Props {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: Props) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <View>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.label}>
        Step {currentStep} of {totalSteps}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginTop: 40,
    marginBottom: 10,
  },
  fill: {
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  label: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 30,
  },
});