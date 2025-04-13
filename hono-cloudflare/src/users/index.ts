import { Hono } from 'hono';

type User = {
	id: number;
	name: string;
};

//今回はメモリ上の配列 users を使った CRUDしてみる
let users: User[] = [];

const userApp = new Hono();

userApp.post('/', async (c) => {
	const { name } = await c.req.json();
	const newUser: User = {
		id: Date.now(),
		name,
	};
	users.push(newUser);
	return c.json({ message: 'success', user: newUser });
});

userApp.get('/', (c) => {
	return c.json(users);
});

userApp.get('/:id', (c) => {
	const userId = parseInt(c.req.param('id'));
	const user = users.find((u) => u.id === userId);
	if (!user) {
		return c.json({ error: 'User not found' }, 404);
	}
	return c.json(user);
});

userApp.patch('/:id', async (c) => {
	const userId = parseInt(c.req.param('id'));
	const { name } = await c.req.json();
	const userIndex = users.findIndex((u) => u.id === userId);

	if (userIndex === -1) {
		return c.json({ error: 'User not Found' }, 404);
	}

	users[userIndex].name = name;
	return c.json({ message: 'User update', users: users[userIndex] }, 200);
});

userApp.delete('/:id', (c) => {
	const userId = parseInt(c.req.param('id'));
	const userIndex = users.findIndex((u) => u.id === userId);
	if (userIndex === -1) {
		return c.json({ error: 'User not Found' }, 404);
	}
	users.splice(userIndex, 1);
	return c.json({ message: 'User deleted' }, 200);
});

export default userApp;
