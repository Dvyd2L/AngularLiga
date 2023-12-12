export interface ILoginRequest {
    email: string;
    password: string;
    rol?: string;
  }
  
  export interface ILoginResponse {
    email: string;
    token: string;
  }