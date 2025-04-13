import { Hono } from 'hono';
import { unstable_dev } from 'wrangler';
import userApp from '../src/users';
import { describe, test, expect, beforeAll, afterAll } from 'vitest';

//Cloudflare Workers でのテスト
describe('userテスト', () => {
	let app: Hono;
	let server: any;

	afterAll(async () => {
		server.stop();
	});

	test('user生成', async () => {
		const payload = JSON.stringify({ name: 'Alice' });
		const res = await server.fetch('/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: payload,
		});
		const data = await res.json();
		expect(res.status).toBe(200);
		expect(data.message).toBe('success');
		expect(data.user.name).toBe('Alice');
	});

	test('get all users', async () => {
		const res = await server.fetch('/users');
		const data = await res.json();
		expect(res.status).toBe(200);
		expect(Array.isArray(data)).toBe(true);
	});
});
