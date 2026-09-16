import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS } from '../constants/colors';
import DocumentCard from '../components/DocumentCard';
import TipBox from '../components/TipBox';

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  uri: string;
  uploadedAt: string;
}

export default function VaultScreen() {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: '1',
      name: 'Matric_Results.pdf',
      type: 'PDF',
      uri: 'mock://file1',
      uploadedAt: '2026-09-01',
    },
    {
      id: '2',
      name: 'ID_Copy.pdf',
      type: 'PDF',
      uri: 'mock://file2',
      uploadedAt: '2026-09-01',
    },
  ]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        const file = result.assets[0];
        const newDoc: DocumentItem = {
          id: Date.now().toString(),
          name: file.name,
          type: file.mimeType || 'Unknown',
          uri: file.uri,
          uploadedAt: new Date().toISOString().split('T')[0],
        };
        setDocuments([...documents, newDoc]);
        Alert.alert('Success', `${file.name} has been stored securely.`);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not pick document.');
    }
  };

  const deleteDocument = (id: string) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to remove this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setDocuments(documents.filter((d) => d.id !== id)),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Document Vault</Text>
      <Text style={styles.subtitle}>
        🔒 Your documents are stored securely. Keep them ready for
        applications.
      </Text>

      <TouchableOpacity style={styles.uploadBtn} onPress={pickDocument}>
        <Text style={styles.uploadText}>+ Upload New Document</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        Stored Documents ({documents.length})
      </Text>

      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          name={doc.name}
          uploadedAt={doc.uploadedAt}
          onDelete={() => deleteDocument(doc.id)}
        />
      ))}

      <TipBox
        title="🔐 Privacy First"
        message="Your documents are encrypted and never shared without your permission. You control who sees your data."
        variant="success"
      />
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
  uploadBtn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  uploadText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
});