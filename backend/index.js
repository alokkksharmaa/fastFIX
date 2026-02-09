import express from 'express';
import homeRoutes from './routes/home.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', (req, res) => {
  res.send('Hello World!');
})
app.use('/api', homeRoutes);


app.use('*', (req, res) => {
  res.status(404).send('Page not found');
})
export default app;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});