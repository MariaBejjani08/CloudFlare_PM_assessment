export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const path = url.pathname;

		if (request.method === 'GET' && path === '/') {
			const html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Feedback Dashboard</title>
	<style>
		/* ========================================
		   CSS Reset & Base Styles
		   Cloudflare-inspired clean aesthetic
		   ======================================== */
		*, *::before, *::after {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}

		:root {
			/* Color palette - minimal with single accent */
			--color-bg: #f9fafb;
			--color-surface: #ffffff;
			--color-border: #e5e7eb;
			--color-border-light: #f3f4f6;
			--color-text-primary: #111827;
			--color-text-secondary: #6b7280;
			--color-text-muted: #9ca3af;
			--color-accent: #f6821f; /* Cloudflare orange */
			--color-accent-hover: #e5740f;
			--color-accent-light: #fff7ed;

			/* Sentiment colors */
			--color-positive: #10b981;
			--color-positive-bg: #ecfdf5;
			--color-negative: #ef4444;
			--color-negative-bg: #fef2f2;
			--color-mixed: #f59e0b;
			--color-mixed-bg: #fffbeb;
			--color-neutral: #6b7280;
			--color-neutral-bg: #f3f4f6;

			/* Priority colors */
			--color-high: #dc2626;
			--color-high-bg: #fef2f2;
			--color-medium: #d97706;
			--color-medium-bg: #fffbeb;
			--color-action: #2563eb;
			--color-action-bg: #eff6ff;

			/* Spacing */
			--space-xs: 0.25rem;
			--space-sm: 0.5rem;
			--space-md: 1rem;
			--space-lg: 1.5rem;
			--space-xl: 2rem;
			--space-2xl: 3rem;

			/* Typography */
			--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			--font-mono: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;

			/* Borders & Shadows */
			--radius-sm: 4px;
			--radius-md: 8px;
			--radius-lg: 12px;
			--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
			--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
			--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
		}

		body {
			font-family: var(--font-sans);
			background-color: var(--color-bg);
			color: var(--color-text-primary);
			line-height: 1.5;
			min-height: 100vh;
		}

		/* ========================================
		   Header / Navigation
		   ======================================== */
		.header {
			background: var(--color-surface);
			border-bottom: 1px solid var(--color-border);
			padding: var(--space-md) var(--space-xl);
			position: sticky;
			top: 0;
			z-index: 100;
		}

		.header-inner {
			max-width: 1280px;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			gap: var(--space-md);
		}

		.header-left {
			display: flex;
			align-items: center;
			gap: var(--space-lg);
		}

		.logo {
			font-size: 1.25rem;
			font-weight: 600;
			color: var(--color-text-primary);
		}

		.ai-badge {
			font-size: 0.75rem;
			color: var(--color-text-muted);
			background: var(--color-border-light);
			padding: var(--space-xs) var(--space-sm);
			border-radius: var(--radius-sm);
		}

		.header-right {
			display: flex;
			align-items: center;
			gap: var(--space-md);
		}

		/* Time window pills */
		.time-selector.loading {
			opacity: 0.6;
			pointer-events: none;
		}
		.time-selector {
			display: flex;
			background: var(--color-border-light);
			border-radius: var(--radius-md);
			padding: 3px;
		}

		.time-pill {
			background: transparent;
			border: none;
			padding: var(--space-sm) var(--space-md);
			font-size: 0.875rem;
			font-weight: 500;
			color: var(--color-text-secondary);
			cursor: pointer;
			border-radius: 6px;
			transition: all 0.15s ease;
		}

		.time-pill:hover {
			color: var(--color-text-primary);
		}

		.time-pill.active {
			background: var(--color-surface);
			color: var(--color-accent);
			box-shadow: var(--shadow-sm);
		}


		/* ========================================
		   Main Content
		   ======================================== */
		.main {
			max-width: 1280px;
			margin: 0 auto;
			padding: var(--space-xl);
		}

		/* Overview Section */
		.overview {
			margin-bottom: var(--space-xl);
		}

		.overview h1 {
			font-size: 1.75rem;
			font-weight: 600;
			margin-bottom: var(--space-sm);
		}

		.overview-meta {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-md);
			color: var(--color-text-secondary);
			font-size: 0.875rem;
		}

		.overview-meta span {
			display: flex;
			align-items: center;
			gap: var(--space-xs);
		}

		.overview-meta .divider {
			color: var(--color-border);
		}

		/* Card styles */
		.card {
			background: var(--color-surface);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-lg);
			box-shadow: var(--shadow-sm);
			overflow: hidden;
		}

		.card-header {
			padding: var(--space-md) var(--space-lg);
			border-bottom: 1px solid var(--color-border-light);
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.card-title {
			font-size: 1rem;
			font-weight: 600;
			color: var(--color-text-primary);
		}

		.card-body {
			padding: var(--space-lg);
		}

		/* Critical To-Dos */
		.todos-section {
			margin-bottom: var(--space-xl);
		}

		.todo-item {
			display: flex;
			align-items: flex-start;
			gap: var(--space-md);
			padding: var(--space-md) 0;
			border-bottom: 1px solid var(--color-border-light);
		}

		.todo-item:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}

		.todo-item:first-child {
			padding-top: 0;
		}

		.priority-badge {
			flex-shrink: 0;
			font-size: 0.75rem;
			font-weight: 500;
			padding: var(--space-xs) var(--space-sm);
			border-radius: var(--radius-sm);
			white-space: nowrap;
		}

		.priority-high {
			background: var(--color-high-bg);
			color: var(--color-high);
		}

		.priority-medium {
			background: var(--color-medium-bg);
			color: var(--color-medium);
		}

		.priority-action {
			background: var(--color-action-bg);
			color: var(--color-action);
		}

		.todo-text {
			color: var(--color-text-primary);
			font-size: 0.9375rem;
			line-height: 1.5;
		}

		/* Insights Section - Two Column */
		.insights-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-lg);
			margin-bottom: var(--space-xl);
		}

		@media (max-width: 768px) {
			.insights-grid {
				grid-template-columns: 1fr;
			}
		}

		.insight-list {
			list-style: none;
		}

		.insight-list li {
			position: relative;
			padding: var(--space-sm) 0 var(--space-sm) var(--space-lg);
			color: var(--color-text-primary);
			font-size: 0.9375rem;
		}

		.insight-list li::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 6px;
			height: 6px;
			border-radius: 50%;
		}

		.insight-list.positive li::before {
			background: var(--color-positive);
		}

		.insight-list.attention li::before {
			background: var(--color-negative);
		}

		/* Themes Section */
		.themes-section {
			margin-bottom: var(--space-xl);
		}

		.theme-card {
			border-bottom: 1px solid var(--color-border-light);
			padding: var(--space-lg) 0;
		}

		.theme-card:first-child {
			padding-top: 0;
		}

		.theme-card:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}

		.theme-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: var(--space-md);
		}

		.theme-name {
			font-size: 1rem;
			font-weight: 600;
			color: var(--color-text-primary);
		}

		.sentiment-badge {
			font-size: 0.75rem;
			font-weight: 500;
			padding: var(--space-xs) var(--space-sm);
			border-radius: var(--radius-sm);
			text-transform: capitalize;
		}

		.sentiment-positive {
			background: var(--color-positive-bg);
			color: var(--color-positive);
		}

		.sentiment-negative {
			background: var(--color-negative-bg);
			color: var(--color-negative);
		}

		.sentiment-mixed {
			background: var(--color-mixed-bg);
			color: var(--color-mixed);
		}

		.sentiment-neutral, .sentiment-unknown {
			background: var(--color-neutral-bg);
			color: var(--color-neutral);
		}

		.theme-bullets {
			list-style: none;
		}

		.theme-bullets li {
			position: relative;
			padding: var(--space-xs) 0 var(--space-xs) var(--space-lg);
			color: var(--color-text-secondary);
			font-size: 0.875rem;
		}

		.theme-bullets li::before {
			content: '\\2022';
			position: absolute;
			left: var(--space-sm);
			color: var(--color-text-muted);
		}

		/* Loading & Empty States */
		.loading-state, .empty-state {
			text-align: center;
			padding: var(--space-2xl);
			color: var(--color-text-secondary);
		}

		.loading-spinner {
			width: 32px;
			height: 32px;
			border: 3px solid var(--color-border);
			border-top-color: var(--color-accent);
			border-radius: 50%;
			animation: spin 0.8s linear infinite;
			margin: 0 auto var(--space-md);
		}

		.empty-state-icon {
			font-size: 2.5rem;
			margin-bottom: var(--space-md);
			opacity: 0.5;
		}

		.empty-state h3 {
			font-size: 1.125rem;
			font-weight: 600;
			color: var(--color-text-primary);
			margin-bottom: var(--space-sm);
		}

		.empty-state p {
			font-size: 0.875rem;
			max-width: 320px;
			margin: 0 auto;
		}

		/* Error state */
		.error-state {
			background: var(--color-negative-bg);
			border: 1px solid var(--color-negative);
			border-radius: var(--radius-md);
			padding: var(--space-md);
			color: var(--color-negative);
			margin-bottom: var(--space-lg);
		}

		/* Utility classes */
		.hidden {
			display: none !important;
		}
	</style>
</head>
<body>
	<!-- Header with controls -->
	<header class="header">
		<div class="header-inner">
			<div class="header-left">
				<span class="logo">Feedback Dashboard</span>
				<span class="ai-badge">AI-generated summaries</span>
			</div>
			<div class="header-right">
				<div class="time-selector" id="timeSelector">
					<button class="time-pill" data-window="1h">Past Hour</button>
					<button class="time-pill active" data-window="24h">Past 24 Hours</button>
					<button class="time-pill" data-window="7d">Past Week</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main content -->
	<main class="main">
		<!-- Loading state -->
		<div id="loadingState" class="loading-state">
			<div class="loading-spinner"></div>
			<p>Loading feedback summary...</p>
		</div>

		<!-- Error state -->
		<div id="errorState" class="error-state hidden"></div>

		<!-- Dashboard content (hidden until loaded) -->
		<div id="dashboardContent" class="hidden">
			<!-- Overview Section -->
			<section class="overview">
				<h1>Product Feedback Overview</h1>
				<div class="overview-meta">
					<span id="currentDate"></span>
					<span class="divider">|</span>
					<span id="timeWindowLabel"></span>
					<span class="divider">|</span>
					<span id="feedbackCount"></span>
					<span class="divider">|</span>
					<span id="lastGenerated"></span>
				</div>
			</section>

			<!-- Critical To-Dos -->
			<section class="todos-section">
				<div class="card">
					<div class="card-header">
						<span class="card-title">Critical To-Dos</span>
					</div>
					<div class="card-body">
						<div id="todosList"></div>
						<div id="todosEmpty" class="empty-state hidden">
							<p>No action items identified.</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Key Insights (two columns) -->
			<section class="insights-grid">
				<div class="card">
					<div class="card-header">
						<span class="card-title">What's Going Well</span>
					</div>
					<div class="card-body">
						<ul id="goingWellList" class="insight-list positive"></ul>
						<div id="goingWellEmpty" class="empty-state hidden">
							<p>No positive highlights available.</p>
						</div>
					</div>
				</div>
				<div class="card">
					<div class="card-header">
						<span class="card-title">What Needs Attention</span>
					</div>
					<div class="card-body">
						<ul id="needsAttentionList" class="insight-list attention"></ul>
						<div id="needsAttentionEmpty" class="empty-state hidden">
							<p>No issues identified.</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Feedback by Theme -->
			<section class="themes-section">
				<div class="card">
					<div class="card-header">
						<span class="card-title">Feedback by Theme</span>
					</div>
					<div class="card-body">
						<div id="themesList"></div>
						<div id="themesEmpty" class="empty-state hidden">
							<p>No themes identified yet.</p>
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- Empty state (no summary generated yet) -->
		<div id="noSummaryState" class="empty-state hidden">
			<div class="empty-state-icon">📊</div>
			<h3>No Summary Generated Yet</h3>
			<p>Click the Refresh button to generate an AI-powered summary of your product feedback.</p>
		</div>
	</main>

	<script>
		/* ========================================
		   Dashboard JavaScript
		   Vanilla JS - no frameworks
		   ======================================== */

		// State
		let currentWindow = '24h';
		let isLoading = false;

		// DOM Elements
		const loadingState = document.getElementById('loadingState');
		const errorState = document.getElementById('errorState');
		const dashboardContent = document.getElementById('dashboardContent');
		const noSummaryState = document.getElementById('noSummaryState');
		const timeSelector = document.getElementById('timeSelector');
		const timePills = document.querySelectorAll('.time-pill');

		// Time window labels for display
		const windowLabels = {
			'1h': 'Past Hour',
			'24h': 'Past 24 Hours',
			'7d': 'Past Week'
		};

		/* ----------------------------------------
		   Utility Functions
		   ---------------------------------------- */

		/**
		 * Format a timestamp to a readable date/time string
		 */
		function formatDate(timestamp) {
			if (!timestamp) return 'N/A';
			const date = new Date(timestamp);
			return date.toLocaleDateString('en-US', {
				weekday: 'short',
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		}

		/**
		 * Get today's date formatted nicely
		 */
		function getTodayDate() {
			return new Date().toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		}

		/**
		 * Infer priority from action item text
		 * Looks for urgency keywords to determine priority level
		 */
		function inferPriority(text) {
			const lowerText = text.toLowerCase();

			// High priority keywords
			const highKeywords = ['immediately', 'urgent', 'critical', 'broken', 'can\\'t', 'cannot',
				'timeout', 'crash', 'error', 'fail', 'block', 'severe', 'asap', 'now'];
			for (const keyword of highKeywords) {
				if (lowerText.includes(keyword)) {
					return { label: 'High urgency', class: 'priority-high' };
				}
			}

			// Medium priority keywords
			const mediumKeywords = ['should', 'soon', 'important', 'need', 'improve', 'fix',
				'issue', 'problem', 'concern'];
			for (const keyword of mediumKeywords) {
				if (lowerText.includes(keyword)) {
					return { label: 'Medium priority', class: 'priority-medium' };
				}
			}

			// Default to action needed
			return { label: 'Action needed', class: 'priority-action' };
		}

		/**
		 * Show/hide UI states
		 */
		function showState(stateName) {
			loadingState.classList.add('hidden');
			errorState.classList.add('hidden');
			dashboardContent.classList.add('hidden');
			noSummaryState.classList.add('hidden');

			switch (stateName) {
				case 'loading':
					loadingState.classList.remove('hidden');
					break;
				case 'error':
					errorState.classList.remove('hidden');
					break;
				case 'dashboard':
					dashboardContent.classList.remove('hidden');
					break;
				case 'empty':
					noSummaryState.classList.remove('hidden');
					break;
			}
		}

		/**
		 * Show error message
		 */
		function showError(message) {
			errorState.textContent = message;
			showState('error');
		}

		/* ----------------------------------------
		   API Functions
		   ---------------------------------------- */

		/**
		 * Fetch summary from API
		 */
		async function fetchSummary(window) {
			const response = await fetch('/api/summary?window=' + encodeURIComponent(window));
			if (!response.ok) {
				throw new Error('Failed to fetch summary');
			}
			return response.json();
		}

		/**
		 * Trigger summary regeneration
		 */
		async function regenerateSummary(window) {
			const response = await fetch('/api/summarize?window=' + encodeURIComponent(window), {
				method: 'POST'
			});
			if (!response.ok) {
				const data = await response.json().catch(() => ({}));
				throw new Error(data.error || 'Failed to generate summary');
			}
			return response.json();
		}

		/* ----------------------------------------
		   Render Functions
		   ---------------------------------------- */

		/**
		 * Render the complete dashboard with summary data
		 */
		function renderDashboard(data) {
			const summary = data.summary;

			// Update overview metadata
			document.getElementById('currentDate').textContent = getTodayDate();
			document.getElementById('timeWindowLabel').textContent = windowLabels[data.window] || data.window;
			document.getElementById('feedbackCount').textContent = (data.feedback_count || 0) + ' feedback items';
			document.getElementById('lastGenerated').textContent = 'Last generated: ' + formatDate(data.generated_at);

			// Render Critical To-Dos
			renderTodos(summary.actionItems || []);

			// Render What's Going Well
			renderInsightList('goingWellList', 'goingWellEmpty', summary.whatsGoingWell || []);

			// Render What Needs Attention
			renderInsightList('needsAttentionList', 'needsAttentionEmpty', summary.needsAttention || []);

			// Render Themes
			renderThemes(summary.themes || []);

			showState('dashboard');
		}

		/**
		 * Render action items as to-dos with priority badges
		 */
		function renderTodos(items) {
			const container = document.getElementById('todosList');
			const emptyState = document.getElementById('todosEmpty');

			if (!items || items.length === 0) {
				container.innerHTML = '';
				emptyState.classList.remove('hidden');
				return;
			}

			emptyState.classList.add('hidden');
			container.innerHTML = items.map(item => {
				const priority = inferPriority(item);
				return '<div class="todo-item">' +
					'<span class="priority-badge ' + priority.class + '">' + priority.label + '</span>' +
					'<span class="todo-text">' + escapeHtml(item) + '</span>' +
				'</div>';
			}).join('');
		}

		/**
		 * Render a list of insights (going well / needs attention)
		 */
		function renderInsightList(listId, emptyId, items) {
			const list = document.getElementById(listId);
			const emptyState = document.getElementById(emptyId);

			if (!items || items.length === 0) {
				list.innerHTML = '';
				emptyState.classList.remove('hidden');
				return;
			}

			emptyState.classList.add('hidden');
			list.innerHTML = items.map(item =>
				'<li>' + escapeHtml(item) + '</li>'
			).join('');
		}

		/**
		 * Render feedback themes with sentiment badges
		 */
		function renderThemes(themes) {
			const container = document.getElementById('themesList');
			const emptyState = document.getElementById('themesEmpty');

			if (!themes || themes.length === 0) {
				container.innerHTML = '';
				emptyState.classList.remove('hidden');
				return;
			}

			emptyState.classList.add('hidden');
			container.innerHTML = themes.map(theme => {
				const sentimentClass = 'sentiment-' + (theme.sentiment || 'neutral');
				const bullets = theme.bullets || [];

				return '<div class="theme-card">' +
					'<div class="theme-header">' +
						'<span class="theme-name">' + escapeHtml(theme.name || 'Unknown Theme') + '</span>' +
						'<span class="sentiment-badge ' + sentimentClass + '">' +
							escapeHtml(theme.sentiment || 'neutral') +
						'</span>' +
					'</div>' +
					(bullets.length > 0
						? '<ul class="theme-bullets">' +
							bullets.map(b => '<li>' + escapeHtml(b) + '</li>').join('') +
						  '</ul>'
						: ''
					) +
				'</div>';
			}).join('');
		}

		/**
		 * Escape HTML to prevent XSS
		 */
		function escapeHtml(text) {
			if (!text) return '';
			const div = document.createElement('div');
			div.textContent = text;
			return div.innerHTML;
		}

		/* ----------------------------------------
		   Event Handlers
		   ---------------------------------------- */

		/**
		 * Handle time window change - regenerates summary for selected window
		 */
		async function handleWindowChange(window) {
			if (isLoading) return;

			currentWindow = window;

			// Update pill states
			timePills.forEach(pill => {
				pill.classList.toggle('active', pill.dataset.window === window);
			});

			isLoading = true;
			timeSelector.classList.add('loading');
			showState('loading');

			try {
				// Regenerate summary for this window
				const data = await regenerateSummary(window);
				renderDashboard(data);
			} catch (err) {
				showError('Failed to generate summary: ' + err.message);
			} finally {
				isLoading = false;
				timeSelector.classList.remove('loading');
			}
		}

		/**
		 * Load and display the dashboard - generates fresh summary
		 */
		async function loadDashboard() {
			if (isLoading) return;

			isLoading = true;
			timeSelector.classList.add('loading');
			showState('loading');

			try {
				const data = await regenerateSummary(currentWindow);
				renderDashboard(data);
			} catch (err) {
				showError('Failed to generate summary: ' + err.message);
			} finally {
				isLoading = false;
				timeSelector.classList.remove('loading');
			}
		}

		/* ----------------------------------------
		   Initialization
		   ---------------------------------------- */

		// Set up event listeners
		timePills.forEach(pill => {
			pill.addEventListener('click', () => handleWindowChange(pill.dataset.window));
		});

		// Initial load
		loadDashboard();
	</script>
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

			const prompt = `You are a product manager analyzing user feedback. Summarize the following ${feedbackItems.length} feedback items from the last ${window}.

Provide a structured JSON response with these exact fields:

1. "summary": A brief 2-3 sentence executive summary of the feedback.

2. "sentiment": Overall sentiment as one of: "positive", "negative", "mixed", "neutral"

3. "whatsGoingWell": Array of 2-4 short bullet points highlighting positive feedback and things users appreciate.

4. "needsAttention": Array of 2-4 short bullet points highlighting issues, complaints, or areas needing improvement.

5. "actionItems": Array of 2-4 prioritized action items. Each item should be a short actionable sentence. Include urgency keywords like "immediately", "soon", "should", "consider" to indicate priority.

6. "themes": Array of 3-5 theme objects, each with:
   - "name": Theme name (e.g., "Performance", "Onboarding", "Documentation")
   - "sentiment": Theme-specific sentiment ("positive", "mixed", "negative")
   - "bullets": Array of 2-3 short bullet points describing user feedback for this theme

Example structure:
{
  "summary": "...",
  "sentiment": "mixed",
  "whatsGoingWell": ["Users love the speed", "Documentation is helpful"],
  "needsAttention": ["Login errors reported", "Mobile experience needs work"],
  "actionItems": ["Immediately fix login timeout issues", "Should improve mobile responsiveness"],
  "themes": [
    {"name": "Performance", "sentiment": "positive", "bullets": ["Fast load times praised", "API response times excellent"]},
    {"name": "Authentication", "sentiment": "negative", "bullets": ["Frequent timeout errors", "Password reset broken"]}
  ]
}

Feedback to analyze:
${feedbackText}

IMPORTANT: Respond with ONLY the raw JSON object. No markdown, no code blocks, no wrapping. Start directly with { and end with }. Keep responses concise.`;

			const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
				messages: [{ role: 'user', content: prompt }],
				max_tokens: 2048,
			});

			let summaryData;
			try {
				let responseText = aiResponse.response || '';
				// Strip markdown code blocks if present
				responseText = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

				let parsed = JSON.parse(responseText);

				// Handle nested JSON where AI returns {"summary": "{ actual json }"}
				if (typeof parsed.summary === 'string' && parsed.summary.trim().startsWith('{')) {
					try {
						const inner = JSON.parse(parsed.summary);
						// Only use inner if it has the expected structure
						if (inner.whatsGoingWell || inner.themes || inner.actionItems) {
							parsed = inner;
						}
					} catch {
						// Keep outer parsed if inner parsing fails
					}
				}

				// Validate we have expected fields
				summaryData = {
					summary: parsed.summary || 'Summary not available.',
					sentiment: parsed.sentiment || 'unknown',
					whatsGoingWell: Array.isArray(parsed.whatsGoingWell) ? parsed.whatsGoingWell : [],
					needsAttention: Array.isArray(parsed.needsAttention) ? parsed.needsAttention : [],
					actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : [],
					themes: Array.isArray(parsed.themes) ? parsed.themes : [],
				};
			} catch {
				// Fallback structure when AI doesn't return valid JSON
				summaryData = {
					summary: aiResponse.response || 'Unable to generate summary.',
					sentiment: 'unknown',
					whatsGoingWell: [],
					needsAttention: [],
					actionItems: [],
					themes: [],
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
