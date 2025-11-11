export interface User {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  birthDate: string; // Fecha de nacimiento en formato YYYY-MM-DD
  createdAt?: Date;
  updatedAt?: Date;
}
