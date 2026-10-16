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
}

export interface UserParams {
  password?: string;
  name?: string;
  phone?: string;
  profile?: string;
  position?: string;
}
