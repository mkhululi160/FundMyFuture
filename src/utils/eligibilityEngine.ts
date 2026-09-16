import { Bursary } from '../services/bursaryService';

interface UserProfile {
  average: number;
  householdIncome: number;
  field: string;
}

export const matchBursaries = (
  user: UserProfile,
  allBursaries: Bursary[]
): Bursary[] => {
  return allBursaries.filter((b) => {
    const fieldMatch =
      b.fieldOfStudy.includes('Any') || b.fieldOfStudy.includes(user.field);
    const avgMatch = user.average >= b.minAverage;
    const incomeMatch = user.householdIncome <= b.householdIncomeMax;
    return fieldMatch && avgMatch && incomeMatch;
  });
};