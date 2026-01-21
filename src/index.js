export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const path = url.pathname;

		if (request.method === 'GET' && path === '/') {
			const html = `<!DOCTYPE html>
<html>
<head>
	<title>Feedback Dashboard</title>
</head>
<body>
	<h1>Feedback Dashboard</h1>
	<p>This dashboard will display automatically generated summaries of user feedback.</p>
</body>
</html>`;
			return new Response(html, {
				headers: { 'Content-Type': 'text/html' },
			});
		}

		if (request.method === 'GET' && path === '/api/health') {
			return new Response(JSON.stringify({ status: 'ok' }), {
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if (request.method === 'POST' && path === '/api/feedback') {
			try {
				const body = await request.json();
				const { source, message } = body;

				if (!message) {
					return new Response(JSON.stringify({ error: 'message is required' }), {
						status: 400,
						headers: { 'Content-Type': 'application/json' },
					});
				}

				const created_at = Date.now();
				await env.feedback_db.prepare(
					'INSERT INTO feedback (source, message, created_at) VALUES (?, ?, ?)'
				).bind(source || null, message, created_at).run();

				return new Response(JSON.stringify({ success: true, created_at }), {
					status: 201,
					headers: { 'Content-Type': 'application/json' },
				});
			} catch (err) {
				return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}
		}

		if (request.method === 'GET' && path === '/api/feedback') {
			const window = url.searchParams.get('window') || '24h';
			const windowMs = parseWindow(window);
			const since = Date.now() - windowMs;

			const { results } = await env.feedback_db.prepare(
				'SELECT id, source, message, created_at FROM feedback WHERE created_at >= ? ORDER BY created_at DESC'
			).bind(since).all();

			return new Response(JSON.stringify(results), {
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response('Not Found', { status: 404 });
	},
};

function parseWindow(window) {
	const match = window.match(/^(\d+)(h|d)$/);
	if (!match) return 24 * 60 * 60 * 1000; // default 24h

	const value = parseInt(match[1], 10);
	const unit = match[2];

	if (unit === 'h') return value * 60 * 60 * 1000;
	if (unit === 'd') return value * 24 * 60 * 60 * 1000;
	return 24 * 60 * 60 * 1000;
}
