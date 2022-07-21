export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  prifile?: string; // profile image
  createdAt: Date | string;
  updatedAt?: Date | string;
  lastLoginedAt: Date;
}
