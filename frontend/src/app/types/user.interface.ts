export interface IAuthUser {
	email: string
	login: string
	password: string
}

export interface IAuthData {
	accessToken: string
	refreshToken: string
	role: string
  id: number
}

export interface IUser {
	id: number
	login: string
	firstName: string
	lastName: string
	about: string
  favouriteGenres: string
	email: string
	role: string
	state: string
}

export interface IUserUpdate {
  firstName: string
  favouriteGenres: string
  about: string
  lastName: string
}
