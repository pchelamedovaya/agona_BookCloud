export interface IAuthUser {
	email: string
  login: string
	password: string
}

export interface IAuthData {
  accessToken: string
  refreshToken: string
  role: string
}

export interface IUser {
  id: number
  login: string
  firstName: string
  lastName: string
  about: string
  email: string
  role: string
  state: string
}
