export interface loginBody {
  username: string;
  password: string;
}

export interface loginResponse {
  accessToken: string
  refreshToken: string
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}
