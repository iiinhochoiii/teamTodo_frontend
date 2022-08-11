export interface Team {
  id: number;
  isActive: boolean;
  role: string;
  team_id: number;
  user_id: number;
  team: TeamEntity;
}

interface TeamEntity {
  createdAt: Date;
  creatorUserId: number;
  description?: string;
  id: number;
  maskcot?: string;
  name: string;
  updatedAt?: Date;
}
