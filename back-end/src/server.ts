import express from 'express'
import cors from 'cors'
import connectDB from './database/database.ts'
import InitRoutes from './routes/routes.ts';

const port = 8080;
const app = express();
app.use(cors());
InitRoutes(app);

connectDB();

app.listen(port, () => console.log("Api rodando na porta 8080"))