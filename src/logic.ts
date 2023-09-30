import { Request, Response } from 'express';
import format from 'pg-format';
import { IMovie } from './interfaces';
import { client } from './database';

export const createMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newMovie: Omit<IMovie, 'id'> = {
    name: req.body.name,
    category: req.body.category,
    duration: req.body.duration,
    price: req.body.price,
  };

  const query = format(
    `INSERT INTO movies (%I) VALUES (%L) RETURNING *;`,
    Object.keys(newMovie),
    Object.values(newMovie)
  );

  const data = await client.query(query);

  return res.status(201).json(data.rows[0]);
};
