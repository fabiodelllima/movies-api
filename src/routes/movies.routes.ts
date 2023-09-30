import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  readMovies,
  readOneMovie,
} from '../logic';
import { isMovieIdValid } from '../middlewares/isMovieIdValid';

export const moviesRoutes = Router();

moviesRoutes.get('/', readMovies);
moviesRoutes.get('/:id', isMovieIdValid, readOneMovie);
moviesRoutes.post('/', createMovie);
moviesRoutes.delete('/:id', isMovieIdValid, deleteMovie);
