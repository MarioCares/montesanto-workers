import { Hono } from 'hono';
import posts from './routes/posts';

const app = new Hono();

app.route('/publicacion', posts);

export default app;
