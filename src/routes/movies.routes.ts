import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  readMovies,
  readOneMovie,
  updatePartialMovie,
} from '../logic';
import { isMovieIdValid } from '../middlewares/isMovieIdValid';
import { isMovieNameRegistered } from '../middlewares/isMovieNameRegistered';

export const moviesRoutes = Router();

moviesRoutes.post('/', isMovieNameRegistered, createMovie);

moviesRoutes.get('/', readMovies);

moviesRoutes.get('/:id', isMovieIdValid, readOneMovie);

moviesRoutes.patch(
  '/:id',
  isMovieIdValid,
  isMovieNameRegistered,
  updatePartialMovie
);

moviesRoutes.delete('/:id', isMovieIdValid, deleteMovie);
