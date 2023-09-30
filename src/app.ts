import 'dotenv/config';
import express from 'express';
import { connectDatabase, createTables } from './database';
import { moviesRoutes } from './routes/movies.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/movies', moviesRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  await connectDatabase();
  await createTables();
});
