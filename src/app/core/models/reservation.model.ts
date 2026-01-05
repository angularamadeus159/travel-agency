export interface Reservation {
  id: string;
  reservationNumber: string;
  agencyName: string;
  agencyEmail: string;
  clientName: string;
  travelDate: Date;
  octoberQuota: number;
  currentMonthBalance: number;
  paymentDate: Date;
  balanceToDate: number;
  observations: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReservationFilters {
  agencyName?: string;
  agencyEmail?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: ReservationStatus;
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  PAID_FULL = 'PAID_FULL',
  PAID_PARTIAL = 'PAID_PARTIAL',
  OVERDUE = 'OVERDUE'
}

export interface EmailPayload {
  to: string;
  agencyName: string;
  reservations: Reservation[];
}
