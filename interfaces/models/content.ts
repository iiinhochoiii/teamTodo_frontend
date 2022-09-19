export interface Content {
  id: number;
  creatorUserId: number;
  createdAt: Date | string;
  updatedAt?: Date | string;
  plan: string[];
  happend: string[];
  teamId?: number;
}
