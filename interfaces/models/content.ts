export interface Content {
  id: number;
  creatorUserId: number;
  createdAt: Date | string;
  updatedAt?: Date | string;
  plan: string[];
  happend: string[];
  teamId?: number;
  user: {
    id: number;
    email: string;
    name: string;
    phone: string;
    profile?: string; // profile image
    position?: string;
    lastLoginedAt: Date | string;
  };
}

export interface responseContent {
  data: Content[];
  page?: {
    hasNext: boolean;
    limit: number;
    offset: number;
    total: number;
  };
}
