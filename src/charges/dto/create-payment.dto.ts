export class CreatePaymentDto {
  id?: string;
  status?: string;
  amount?: number;
  subscriptionId?: string;
  url?: string;
  userId?: string;
  currency?: string;
  note?: string;
  code?: string;
  invoiceId?: string;
}
