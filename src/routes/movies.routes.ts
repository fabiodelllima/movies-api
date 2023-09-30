import { Router } from 'express';
import { createMovie } from '../logic';

export const moviesRoutes = Router();

moviesRoutes.post('/', createMovie);
