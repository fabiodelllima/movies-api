import { Router } from 'express';
import { createMovie, readMovies, readOneMovie } from '../logic';

export const moviesRoutes = Router();

moviesRoutes.get('/', readMovies);
moviesRoutes.get('/:id', readOneMovie);
moviesRoutes.post('/', createMovie);
