export interface IAuthUser {
	email: string
	password: string
}

export interface IAuthData {
	token: string
  role: string
}

export interface IUser {
  id: number
  firstname: string
  lastname: string
  about: string
  email: string
  role: string
  isActive: boolean
}
