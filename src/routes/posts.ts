import { Hono } from 'hono';
import { PostServices } from '../service/post.services';

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
	try {
		return c.json(await PostServices.get(c.env.DB));
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});

app.get('/tags', async (c) => {
	try {
		return c.json(await PostServices.getTags(c.env.DB));
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});

app.get('/tag/:tag', async (c) => {
	try {
		return c.json(await PostServices.getByTag(c.req.param('tag'), c.env.DB));
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});

app.get('/categorias', async (c) => {
	try {
		return c.json(await PostServices.getCategories(c.env.DB));
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});

app.get('/categoria/:categoria', async (c) => {
	try {
		return c.json(await PostServices.getByCategory(c.req.param('categoria'), c.env.DB));
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});

app.post('/', async (c) => {
	try {
		return c.json(await PostServices.post(await c.req.json(), c.env.DB));
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});

app.delete('/', async (c) => {
	try {
		return c.json(await PostServices.deletePost(c.env.DB));
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});

export default app;
