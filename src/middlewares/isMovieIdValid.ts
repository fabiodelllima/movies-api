import { NextFunction, Request, Response } from 'express';
import format from 'pg-format';
import { client } from '../database';

export const isMovieIdValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = format(
    `SELECT * FROM movies WHERE id = %L;`,
    req.params.id
  );

  const data = await client.query(query);

  if (!data.rows[0]) {
    return res.status(404).json({ message: 'Movie not found!' });
  }

  next();
};
