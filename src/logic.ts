import { Request, Response } from 'express';
import format from 'pg-format';
import { IMovie, TMovieUpdateData } from './interfaces';
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

export const readMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const query = `SELECT * FROM movies;`;

  if (req.query.category) {
    const queryByCategory = format(
      `SELECT * FROM movies WHERE category ILIKE %L;`,
      req.query.category
    );

    const data = await client.query(queryByCategory);

    if (data.rows.length === 0) {
      const data = await client.query(query);
      return res.status(200).json(data.rows);
    }

    return res.status(200).json(data.rows);
  }

  const data = await client.query(query);
  return res.status(200).json(data.rows);
};

export const readOneMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const query = format(
    `SELECT * FROM movies WHERE id = %L`,
    req.params.id
  );

  const data = await client.query(query);

  return res.status(200).json(data.rows[0]);
};

export const updatePartialMovie = async (
  req: Request,
  res: Response
) => {
  let objData: TMovieUpdateData = {};

  Object.entries(req.body).forEach(([key, value]) => {
    if (key === 'name' || key === 'category') {
      if (typeof value === 'string') {
        objData[key] = value;
      }
    }

    if (key === 'duration' || key === 'price') {
      if (typeof value === 'number') {
        objData[key] = value;
      }
    }
  });

  const queryConfig = format(
    `UPDATE movies SET (%I) = ROW (%L) WHERE id = %L RETURNING *;`,
    Object.keys(objData),
    Object.values(objData),
    req.params.id
  );

  const data = await client.query(queryConfig);

  return res.status(200).json(data.rows[0]);
};

export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const query = format(
    `DELETE FROM movies WHERE id = %L;`,
    req.params.id
  );

  await client.query(query);

  return res.status(204).json();
};
