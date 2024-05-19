import { IUser } from './user.interface'

export interface IComments {
  comments: IComment[]
}

export interface IComment {
  commentContent: string
  user: IUser
}
