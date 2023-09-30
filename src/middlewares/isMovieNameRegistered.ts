import { NextFunction, Request, Response } from 'express';
import format from 'pg-format';
import { client } from '../database';

export const isMovieNameRegistered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = format(
    `SELECT * FROM movies WHERE name = %L;`,
    req.body.name
  );

  const data = await client.query(query);

  if (data.rows[0]) {
    return res.status(403).json({
      message: 'This movie name is already registered.',
    });
  }

  next();
};
