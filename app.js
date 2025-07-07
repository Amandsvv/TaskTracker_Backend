import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(cors({
  origin : "http://localhost:3000",
  credentials :true
}));

app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
