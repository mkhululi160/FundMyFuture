import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { fetchBursaries, Bursary } from '../services/bursaryService';
import { matchBursaries } from '../utils/eligibilityEngine';
import { FIELDS_OF_STUDY } from '../constants/fieldsOfStudy';
import { COLORS } from '../constants/colors';
import ProgressBar from '../components/ProgressBar';
import PrimaryButton from '../components/PrimaryButton';

export default function MatcherScreen() {
  const [step, setStep] = useState(1);
  const [average, setAverage] = useState('');
  const [income, setIncome] = useState('');
  const [field, setField] = useState('');
  const [results, setResults] = useState<Bursary[]>([]);

  const runMatch = async () => {
    const avgNum = parseFloat(average);
    const incNum = parseFloat(income);
    const allBursaries = await fetchBursaries();

    const matched = matchBursaries(
      { average: avgNum, householdIncome: incNum, field },
      allBursaries
    );

    setResults(matched);
    setStep(4);
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <View>
          <Text style={styles.question}>
            What is your current academic average?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 75"
            keyboardType="numeric"
            value={average}
            onChangeText={setAverage}
          />
          <PrimaryButton
            title="Next →"
            onPress={() => setStep(2)}
            disabled={!average}
          />
        </View>
      );
    }

    if (step === 2) {
      return (
        <View>
          <Text style={styles.question}>
            What is your total household income per year? (ZAR)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 250000"
            keyboardType="numeric"
            value={income}
            onChangeText={setIncome}
          />
          <PrimaryButton
            title="Next →"
            onPress={() => setStep(3)}
            disabled={!income}
          />
        </View>
      );
    }

    if (step === 3) {
      return (
        <View>
          <Text style={styles.question}>What do you want to study?</Text>
          <View style={styles.optionsGrid}>
            {FIELDS_OF_STUDY.map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.optionBtn,
                  field === f && styles.optionSelected,
                ]}
                onPress={() => setField(f)}
              >
                <Text
                  style={[
                    styles.optionText,
                    field === f && styles.optionTextSelected,
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <PrimaryButton
            title="See My Matches 🎯"
            onPress={runMatch}
            disabled={!field}
          />
        </View>
      );
    }

    if (step === 4) {
      return (
        <ScrollView>
          <Text style={styles.resultsTitle}>
            You qualify for {results.length} bursaries!
          </Text>

          {results.map((b) => (
            <View key={b.id} style={styles.resultCard}>
              <Text style={styles.resultName}>{b.name}</Text>
              <Text style={styles.resultProvider}>{b.provider}</Text>
              <Text style={styles.resultDesc}>{b.description}</Text>
              <View style={styles.resultFooter}>
                <Text style={styles.resultDate}>
                  Closes: {b.closingDate}
                </Text>
              </View>
            </View>
          ))}

          {results.length === 0 && (
            <Text style={styles.noResults}>
              No matches found. Try adjusting your average or income.
            </Text>
          )}

          <TouchableOpacity
            style={styles.restartBtn}
            onPress={() => {
              setStep(1);
              setAverage('');
              setIncome('');
              setField('');
              setResults([]);
            }}
          >
            <Text style={styles.restartText}>Start Over</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={step} totalSteps={4} />
      {renderStep()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: 20 },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  optionBtn: {
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: { color: COLORS.text },
  optionTextSelected: { color: COLORS.white },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: COLORS.background,
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
  },
  resultName: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  resultProvider: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  resultDesc: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 12,
    lineHeight: 18,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultDate: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 16,
    marginTop: 20,
  },
  restartBtn: { marginTop: 20, alignItems: 'center', marginBottom: 40 },
  restartText: { color: COLORS.primary, fontWeight: 'bold' },
});