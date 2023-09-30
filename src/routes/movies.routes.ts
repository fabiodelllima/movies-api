import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  readMovies,
  readOneMovie,
} from '../logic';
import { isMovieIdValid } from '../middlewares/isMovieIdValid';
import { isMovieNameRegistered } from '../middlewares/isMovieNameRegistered';

export const moviesRoutes = Router();

moviesRoutes.get('/', readMovies);
moviesRoutes.get('/:id', isMovieIdValid, readOneMovie);
moviesRoutes.post('/', isMovieNameRegistered, createMovie);
moviesRoutes.delete('/:id', isMovieIdValid, deleteMovie);
