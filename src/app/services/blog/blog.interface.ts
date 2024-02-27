import { SafeHtml } from '@angular/platform-browser';

/**
 * Blog detail interface
 */
export interface blog {
  id: number;
  title: string;
  message: string;
  symbol: string;
  tradeSignalId: number;
  errorLoading: boolean;
  partialContent: SafeHtml;
  createDate: string;
}
