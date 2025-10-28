import express from 'express';
import http from 'http';
import dotenv from 'dotenv';    
dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.get('/', (req, res) => {
    res.status(200).type("text/plain").send('Hello, World!');
});

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}:${PORT}/`)
});

export {httpServer, app};