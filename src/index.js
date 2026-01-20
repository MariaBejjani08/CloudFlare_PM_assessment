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

		return new Response('Not Found', { status: 404 });
	},
};
