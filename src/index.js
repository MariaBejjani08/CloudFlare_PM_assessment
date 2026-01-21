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

		if (request.method === 'GET' && path === '/api/summary') {
			const window = url.searchParams.get('window');
			if (!window || !['1h', '24h', '7d'].includes(window)) {
				return new Response(JSON.stringify({ error: 'window must be 1h, 24h, or 7d' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const row = await env.feedback_db.prepare(
				'SELECT window, generated_at, feedback_count, summary_json FROM summaries WHERE window = ?'
			).bind(window).first();

			if (!row) {
				return new Response(JSON.stringify({ summary: null }), {
					headers: { 'Content-Type': 'application/json' },
				});
			}

			return new Response(JSON.stringify({
				window: row.window,
				generated_at: row.generated_at,
				feedback_count: row.feedback_count,
				summary: JSON.parse(row.summary_json),
			}), {
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if (request.method === 'POST' && path === '/api/summarize') {
			const window = url.searchParams.get('window');
			if (!window || !['1h', '24h', '7d'].includes(window)) {
				return new Response(JSON.stringify({ error: 'window must be 1h, 24h, or 7d' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const windowMs = parseWindow(window);
			const since = Date.now() - windowMs;

			const { results: feedbackItems } = await env.feedback_db.prepare(
				'SELECT id, source, message, created_at FROM feedback WHERE created_at >= ? ORDER BY created_at DESC'
			).bind(since).all();

			if (feedbackItems.length === 0) {
				return new Response(JSON.stringify({ error: 'No feedback found for this window' }), {
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const feedbackText = feedbackItems.map(f =>
				`- [${f.source || 'unknown'}]: ${f.message}`
			).join('\n');

			const prompt = `You are analyzing user feedback for a product. Summarize the following ${feedbackItems.length} feedback items from the last ${window}.

Provide a structured JSON response with:
- "themes": array of main themes/topics (max 5)
- "sentiment": overall sentiment ("positive", "negative", "mixed", "neutral")
- "summary": a brief 2-3 sentence summary
- "actionItems": array of suggested actions based on the feedback (max 3)

Feedback:
${feedbackText}

Respond only with valid JSON, no markdown.`;

			const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
				messages: [{ role: 'user', content: prompt }],
			});

			let summaryData;
			try {
				summaryData = JSON.parse(aiResponse.response);
			} catch {
				summaryData = {
					themes: [],
					sentiment: 'unknown',
					summary: aiResponse.response,
					actionItems: [],
				};
			}

			const generated_at = Date.now();
			const summary_json = JSON.stringify(summaryData);

			await env.feedback_db.prepare(
				`INSERT INTO summaries (window, generated_at, feedback_count, summary_json)
				 VALUES (?, ?, ?, ?)
				 ON CONFLICT(window) DO UPDATE SET
				 generated_at = excluded.generated_at,
				 feedback_count = excluded.feedback_count,
				 summary_json = excluded.summary_json`
			).bind(window, generated_at, feedbackItems.length, summary_json).run();

			return new Response(JSON.stringify({
				window,
				generated_at,
				feedback_count: feedbackItems.length,
				summary: summaryData,
			}), {
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
