import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import sheetsRouter from './routes/sheetsRoutes.js'


dotenv.config();
const {CORS_ORIGIN} = process.env;

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/sheets', sheetsRouter);


app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}.`);
});
