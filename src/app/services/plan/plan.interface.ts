/**
 * Plan interfface
 */
export interface plan {
  planId: string;
  planName: string;
  planPrice: number;
}

/**
 * Payplan interface
 */
export interface PayPlan {
  codeName: string;
  codeValue: string;
  groupName: string;
  id: number;
  sort: number;
  planId?: string;
  planName?: string;
  planPrice?: number;
}
