type status = 'ACITVE' | 'DISABLED';
export class CreateSubscriptionDto {
  userId: string;
  planId: string;
  status?: string;
  createdAt?: Date;
  expiredAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
