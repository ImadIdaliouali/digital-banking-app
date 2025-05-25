export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  username: string;
  email: string;
  roles: string[];
}

export interface User {
  id?: number;
  username: string;
  email: string;
  roles: string[];
}
