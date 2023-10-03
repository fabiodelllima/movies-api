import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  readMovies,
  readMovieById,
  updatePartialMovie,
} from '../logic';
import { isMovieIdValid } from '../middlewares/isMovieIdValid';
import { isMovieNameRegistered } from '../middlewares/isMovieNameRegistered';

export const moviesRoutes = Router();

moviesRoutes.get('/', readMovies);

moviesRoutes.get('/:id', isMovieIdValid, readMovieById);

moviesRoutes.post('/', isMovieNameRegistered, createMovie);

moviesRoutes.delete('/:id', isMovieIdValid, deleteMovie);

moviesRoutes.patch(
  '/:id',
  isMovieIdValid,
  isMovieNameRegistered,
  updatePartialMovie
);
