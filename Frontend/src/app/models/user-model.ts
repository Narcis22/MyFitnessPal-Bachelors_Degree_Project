export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    username: string | null;
    email: string;
    sex?: string | null;
    height?: number | null;
    weight?: number | null;
    age?: number | null;
  }
  