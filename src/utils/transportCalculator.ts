import { Job } from '../services/jobService';
import { MIN_NET_PAY_THRESHOLD } from '../constants/transportRates';

export const calculateNetPay = (job: Job, customTransport?: number): number => {
  const transport = customTransport ?? job.estimatedTransportCost;
  return job.dailyWage - transport;
};

export const isJobWorthIt = (netPay: number): boolean => {
  return netPay > MIN_NET_PAY_THRESHOLD;
};