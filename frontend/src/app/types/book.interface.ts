export interface IBook {
	id: number
	title: string
	author: string
	description: string
	cover: string
	genre: string
	reading_link: string
}

export interface IBooksResponse {
  data: IBook[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
