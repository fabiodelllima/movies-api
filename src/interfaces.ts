export interface IMovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

export type TMovieUpdateData = Partial<Omit<IMovie, 'id'>>;
