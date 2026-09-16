export interface Job {
  id: string;
  title: string;
  business: string;
  dailyWage: number;
  distanceKm: number;
  transportMode: 'walk' | 'taxi' | 'bus';
  estimatedTransportCost: number;
  duration: string;
  skillsRequired: string[];
  contact: string;
  description: string;
}

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Stock Packer',
    business: 'Spaza Shop - Alex',
    dailyWage: 180,
    distanceKm: 1.2,
    transportMode: 'walk',
    estimatedTransportCost: 0,
    duration: '3 days',
    skillsRequired: ['Reliable', 'Basic Counting'],
    contact: '011 555 1234',
    description: 'Help pack and organize stock. Flexible hours.',
  },
  {
    id: 'j2',
    title: 'Painters Assistant',
    business: 'BuildIt - Sandton',
    dailyWage: 250,
    distanceKm: 12,
    transportMode: 'taxi',
    estimatedTransportCost: 60,
    duration: '1 week',
    skillsRequired: ['Physical Fitness', 'Attention to Detail'],
    contact: '082 123 4567',
    description: 'Assist painter with prep work and cleanup. Tools provided.',
  },
  {
    id: 'j3',
    title: 'Phone Screen Repair Helper',
    business: 'TechFix - Rosebank',
    dailyWage: 220,
    distanceKm: 8,
    transportMode: 'taxi',
    estimatedTransportCost: 40,
    duration: '2 days',
    skillsRequired: ['Handy', 'Basic Electronics'],
    contact: '083 987 6543',
    description:
      'Help with dismantling and cleaning phone parts. Training provided.',
  },
  {
    id: 'j4',
    title: 'Event Cleanup Crew',
    business: 'Sandton Convention Centre',
    dailyWage: 300,
    distanceKm: 15,
    transportMode: 'taxi',
    estimatedTransportCost: 80,
    duration: '1 day',
    skillsRequired: ['Hard Working'],
    contact: '011 444 7777',
    description: 'Clean up after corporate event. Evening shift.',
  },
];

export const fetchJobs = async (): Promise<Job[]> => {
  return MOCK_JOBS;
};

export const calculateNetPay = (job: Job): number => {
  return job.dailyWage - job.estimatedTransportCost;
};