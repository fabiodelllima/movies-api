import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  readMovies,
  readMovieById,
  updatePartialMovie,
} from '../logic';
import { isMovieIdValid } from '../middlewares/isMovieIdValid';
import { isMovieNameAvailable } from '../middlewares/isMovieNameAvailable';

export const moviesRoutes = Router();

moviesRoutes.get('/', readMovies);

moviesRoutes.get('/:id', isMovieIdValid, readMovieById);

moviesRoutes.post('/', isMovieNameAvailable, createMovie);

moviesRoutes.delete('/:id', isMovieIdValid, deleteMovie);

moviesRoutes.patch(
  '/:id',
  isMovieIdValid,
  isMovieNameAvailable,
  updatePartialMovie
);
