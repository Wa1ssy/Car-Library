import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import carRoutes from './routes/carRoutes.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json' with { type: 'json' };

dotenv.config();

const app = express();
app.use(express.json());
const httpServer = http.createServer(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', async (_req, res) => {
  res.status(200).type('text/html').send(`<a href="/docs">swagger</a>`);
});
carRoutes(app);

const PORT = process.env.PORT;

httpServer.listen(PORT, async () => {
  console.log(`Server is running at ${process.env.SERVER_URL}:${PORT}/`);
});

export { httpServer, app };
