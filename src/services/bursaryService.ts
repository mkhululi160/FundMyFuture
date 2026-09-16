import { db } from '../config/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export interface Bursary {
  id: string;
  name: string;
  provider: string;
  fieldOfStudy: string[];
  minAverage: number;
  householdIncomeMax: number;
  closingDate: string;
  applicationUrl: string;
  description: string;
}

export const MOCK_BURSARIES: Bursary[] = [
  {
    id: '1',
    name: 'NSFAS',
    provider: 'Government',
    fieldOfStudy: ['Any'],
    minAverage: 0,
    householdIncomeMax: 350000,
    closingDate: '2026-11-30',
    applicationUrl: 'https://www.nsfas.org.za',
    description:
      'National Student Financial Aid Scheme. Covers tuition, accommodation, and living allowance.',
  },
  {
    id: '2',
    name: 'Sasol Bursary',
    provider: 'Sasol',
    fieldOfStudy: ['Engineering', 'Science', 'Commerce'],
    minAverage: 70,
    householdIncomeMax: 600000,
    closingDate: '2026-08-15',
    applicationUrl: 'https://www.sasolbursaries.com',
    description:
      'Full bursary for STEM and Commerce students. Includes vacation work.',
  },
  {
    id: '3',
    name: 'Allan Gray Orbis Fellowship',
    provider: 'Allan Gray',
    fieldOfStudy: ['Commerce', 'Engineering', 'Law'],
    minAverage: 65,
    householdIncomeMax: 1000000,
    closingDate: '2026-04-30',
    applicationUrl: 'https://www.allangrayorbis.org',
    description:
      'Entrepreneurial fellowship for high-potential students.',
  },
  {
    id: '4',
    name: 'Funza Lushaka',
    provider: 'Government',
    fieldOfStudy: ['Education'],
    minAverage: 60,
    householdIncomeMax: 500000,
    closingDate: '2026-01-15',
    applicationUrl: 'https://www.funzalushaka.doe.gov.za',
    description: 'Bursary for students wanting to become teachers.',
  },
];

export const fetchBursaries = async (): Promise<Bursary[]> => {
  return MOCK_BURSARIES;
};

export const saveApplication = async (
  userId: string,
  bursaryId: string,
  status: string
) => {
  try {
    await addDoc(collection(db, 'applications'), {
      userId,
      bursaryId,
      status,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};