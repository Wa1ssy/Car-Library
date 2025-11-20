import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import gameRoutes from './routes/carRoutes.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json' with { type: "json" };
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const httpServer = http.createServer(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', async (req, res) => {
    res.status(200).type('text/html').send(`<a href="/docs">swagger</a>`);
});
gameRoutes(app);
userRoutes(app);

const PORT = process.env.PORT;

httpServer.listen(PORT, async () => {
    console.log(`Server is running at http://${process.env.HOST}:${PORT}/`);
});

export { httpServer, app };