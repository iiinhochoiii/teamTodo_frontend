export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  profile?: string; // profile image
  position?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  lastLoginedAt: Date | string;
  team: {
    createdAt: Date;
    creatorUserId: number;
    description?: string;
    id: number;
    maskcot?: string;
    name: string;
    updatedAt?: Date;
    members: {
      id: number;
      isActive: boolean;
      role: string;
      team_id: number;
      user_id: number;
    }[];
  }[];
}

export interface UserParams {
  password?: string;
  name?: string;
  phone?: string;
  profile?: string;
  position?: string;
}
