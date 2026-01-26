export interface Reservation {
  reservationNumber: string;
  clientName: string;
  travelDate: string | null;
  observation: string | null;
  paymentDate: string | null;
  lastPaymentDate: string | null;
  quotaMonth: string | null;
  quotaBalance: string | null;
  agencyEmail: string | null;
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

export interface ResponseDTO<T = any> {
  success: boolean;
  message: string;
  data: T;
}
