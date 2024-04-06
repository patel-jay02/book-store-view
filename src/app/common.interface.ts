export interface LoginRequest {
  username: string;
  password: string;
};

export interface insertUpdateBookRequest {
  bookName: string,
  author: string,
  description: string,
  price: number,
  totalReader: number,
  bookType: string,
  isbn: string,
  published: string
};