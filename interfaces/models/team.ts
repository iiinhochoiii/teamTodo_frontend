export interface Team {
  id: number;
  isActive: boolean;
  role: string;
  team_id: number;
  user_id: number;
  team: TeamEntity;
}

export interface TeamEntity {
  createdAt: Date;
  creatorUserId: number;
  description?: string;
  id: number;
  maskcot?: string;
  name: string;
  updatedAt?: Date;
}

export interface User {
  email: string;
  id: number;
  lastLoginedAt: string | Date;
  name: string;
  phone: string;
  profile?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface Members {
  id: number;
  isActive: boolean;
  role: string;
  team_id: number;
  user_id: number;
  user: User;
}

export interface TeamDetail {
  createdAt: Date;
  creatorUserId: number;
  description?: string;
  id: number;
  maskcot?: string;
  name: string;
  updatedAt?: Date;
  members: Members[];
}
