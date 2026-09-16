import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';

export interface VaultDocument {
  id?: string;
  name: string;
  type: string;
  uri: string;
  uploadedAt: string;
  userId: string;
}

export const saveDocument = async (
  userId: string,
  name: string,
  type: string,
  uri: string
): Promise<{ success: boolean; id?: string; error?: any }> => {
  try {
    const docRef = await addDoc(collection(db, 'documents'), {
      userId,
      name,
      type,
      uri,
      uploadedAt: new Date().toISOString().split('T')[0],
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving document:', error);
    return { success: false, error };
  }
};

export const fetchDocuments = async (
  userId: string
): Promise<VaultDocument[]> => {
  try {
    const q = query(
      collection(db, 'documents'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    const docs: VaultDocument[] = [];
    snapshot.forEach((d) => {
      docs.push({ id: d.id, ...d.data() } as VaultDocument);
    });
    return docs;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

export const deleteDocument = async (docId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'documents', docId));
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};