import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { getWeatherData } from './api.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app: Application = express();
app.set('view engine', 'ejs');

app.use(express.static('./views'));

app.get('/', (_: Request, res: Response) => {
  res.render('index', { weather: null });
});

app.get('/weather', async (req: Request, res: Response) => {
  const city = req.query.city;

  try {
    const weatherData = await getWeatherData(city);

    res.render('index', { weather: weatherData });
  } catch (error) {
    res.status(500).send('Error fetching weather data.');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
