export interface IAuthenticateResponse {
  data: {
    token: string;
    expiresAt: string;
    createdAt: string;
  };
}

export interface IAuthenticateBody {
  email: string;
  password: string;
  totpCode?: string;
  permissions?: 'write' | 'read';
}
